import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useCheckout } from "../../hooks/useCheckout";
import { storeSettings } from "../../data/storeSettings";
import type { FulfillmentType, Customer, Address, OrderDraft } from "../../types/checkout";
import styles from "./CheckoutPage.module.css";

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);

function formatPhone(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatZipCode(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function parseCurrencyInput(value: string): number {
    const normalized = value.replace(/[^\d,.-]/g, "").replace(".", "").replace(",", ".");
    const parsedValue = parseFloat(normalized);
    return Number.isNaN(parsedValue) ? 0 : parsedValue;
}

export function CheckoutPage() {
    const navigate = useNavigate();
    const { items, getTotalItems, getTotalPrice, clearCart, removeFromCart } = useCart();
    const { draft, updateDraft, clearDraft } = useCheckout();

    const availablePayments = useMemo(
        () => storeSettings.paymentMethods.filter((p) => p.enabled),
        [],
    );

    const firstPaymentId = availablePayments.length > 0 ? availablePayments[0].id : "";

    const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>(draft.fulfillmentType);
    const [name, setName] = useState(draft.name);
    const [phone, setPhone] = useState(draft.phone);
    const [zipCode, setZipCode] = useState(draft.zipCode);
    const [street, setStreet] = useState(draft.street);
    const [number, setNumber] = useState(draft.number);
    const [complement, setComplement] = useState(draft.complement);
    const [neighborhood, setNeighborhood] = useState(draft.neighborhood);
    const [city, setCity] = useState(draft.city);
    const [state, setState] = useState(draft.state);
    const [reference, setReference] = useState(draft.reference);
    const [selectedPaymentId, setSelectedPaymentId] = useState<string>(draft.selectedPaymentId || firstPaymentId);
    const [needsChange, setNeedsChange] = useState<boolean | null>(draft.needsChange);
    const [changeFor, setChangeFor] = useState(draft.changeFor);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);

    const totalItemsCount = getTotalItems();
    const subtotal = getTotalPrice();
    const deliveryFee = fulfillmentType === "delivery" ? storeSettings.deliveryFee : 0;
    const total = subtotal + deliveryFee;

    const selectedPayment = useMemo(
        () => availablePayments.find((p) => p.id === selectedPaymentId) ?? null,
        [availablePayments, selectedPaymentId],
    );

    useEffect(() => {
        if (!selectedPaymentId && firstPaymentId) {
            setSelectedPaymentId(firstPaymentId);
        }
    }, [firstPaymentId, selectedPaymentId]);

    useEffect(() => {
        updateDraft({
            fulfillmentType,
            name,
            phone,
            zipCode,
            street,
            number,
            complement,
            neighborhood,
            city,
            state,
            reference,
            selectedPaymentId,
            needsChange,
            changeFor,
        });
    }, [
        fulfillmentType,
        name,
        phone,
        zipCode,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        reference,
        selectedPaymentId,
        needsChange,
        changeFor,
        updateDraft,
    ]);

    const handlePhoneChange = useCallback((value: string) => {
        setPhone(formatPhone(value));
    }, []);

    const handleZipCodeChange = useCallback((value: string) => {
        setZipCode(formatZipCode(value));
    }, []);

    const handlePaymentChange = useCallback((paymentId: string) => {
        setSelectedPaymentId(paymentId);
        setNeedsChange(null);
        setChangeFor("");
    }, []);

    const handleEditItem = useCallback((cartItemId: string, productId: number) => {
        navigate(`/product/${productId}?cartItemId=${cartItemId}&from=checkout`);
    }, [navigate]);

    const handleAddMoreItems = useCallback(() => {
        navigate("/");
    }, [navigate]);

    const handleRemoveItem = useCallback((itemId: string) => {
        const willBeEmpty = items.length === 1;
        removeFromCart(itemId);

        if (willBeEmpty) {
            navigate("/");
        }
    }, [items.length, navigate, removeFromCart]);

    const validate = useCallback((): boolean => {
        const newErrors: Record<string, string> = {};

        if (!name.trim()) {
            newErrors.name = "Informe seu nome";
        }

        const phoneDigits = phone.replace(/\D/g, "");
        if (phoneDigits.length < 10) {
            newErrors.phone = "Informe um telefone válido";
        }

        if (fulfillmentType === "delivery") {
            if (zipCode.replace(/\D/g, "").length < 8) {
                newErrors.zipCode = "Informe um CEP válido";
            }
            if (!street.trim()) newErrors.street = "Informe a rua";
            if (!number.trim()) newErrors.number = "Informe o número";
            if (!neighborhood.trim()) newErrors.neighborhood = "Informe o bairro";
            if (!city.trim()) newErrors.city = "Informe a cidade";
            if (!state.trim()) newErrors.state = "Informe o estado";
        }

        if (!selectedPayment) {
            newErrors.payment = "Escolha uma forma de pagamento";
        }

        if (selectedPayment?.type === "cash") {
            if (needsChange === null) {
                newErrors.needsChange = "Informe se precisa de troco";
            } else if (needsChange === true) {
                const changeValue = parseCurrencyInput(changeFor);
                if (!changeFor.trim() || isNaN(changeValue) || changeValue < total) {
                    newErrors.changeFor = "O valor deve ser maior ou igual ao total";
                }
            }
        }

        setErrors(newErrors);

        if (newErrors.name) {
            nameRef.current?.focus();
        }

        return Object.keys(newErrors).length === 0;
    }, [name, phone, fulfillmentType, zipCode, street, number, neighborhood, city, state, selectedPayment, needsChange, changeFor, total]);

    const handleSubmit = useCallback(() => {
        if (!validate() || isSubmitting) return;

        setIsSubmitting(true);

        const phoneDigits = phone.replace(/\D/g, "");

        const customer: Customer = {
            name: name.trim(),
            phone: phoneDigits,
        };

        let deliveryAddress: Address | undefined;
        if (fulfillmentType === "delivery") {
            deliveryAddress = {
                zipCode: zipCode.trim(),
                street: street.trim(),
                number: number.trim(),
                complement: complement.trim() || undefined,
                neighborhood: neighborhood.trim(),
                city: city.trim(),
                state: state.trim().toUpperCase(),
                reference: reference.trim() || undefined,
            };
        }

        const orderDraft: OrderDraft = {
            createdAt: new Date().toISOString(),
            customer,
            fulfillmentType,
            deliveryAddress,
            paymentMethod: selectedPayment!,
            changeFor: selectedPayment?.type === "cash" && needsChange === true
                ? parseCurrencyInput(changeFor)
                : undefined,
            items: items.map((item) => ({
                productId: item.product.id,
                productName: item.product.name,
                quantity: item.quantity,
                additionals: item.selectedAdditionals.map((selected) => ({
                    id: selected.additional.id,
                    name: selected.additional.name,
                    quantity: selected.quantity,
                    unitPrice: selected.additional.price,
                    totalPrice: selected.additional.price * selected.quantity,
                })),
                observation: item.observation || undefined,
                unitPrice: item.unitPrice,
                totalPrice: item.totalPrice,
            })),
            subtotal,
            deliveryFee,
            total,
        };

        console.log("OrderDraft:", JSON.stringify(orderDraft, null, 2));
        clearDraft();
        clearCart();
        navigate("/order-confirmation", { state: { orderDraft } });
    }, [validate, isSubmitting, phone, name, fulfillmentType, zipCode, street, number, complement, neighborhood, city, state, reference, selectedPayment, needsChange, changeFor, items, subtotal, deliveryFee, total, clearDraft, clearCart, navigate]);

    if (totalItemsCount === 0) {
        return (
            <div className={styles.emptyCart}>
                <div>
                    <p className={styles.emptyCartTitle}>Seu carrinho está vazio</p>
                    <p className={styles.emptyCartText}>Adicione itens antes de finalizar o pedido.</p>
                    <button
                        type="button"
                        className={styles.emptyCartButton}
                        onClick={() => navigate("/")}
                    >
                        Voltar ao cardápio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => navigate("/")}
                    aria-label="Voltar"
                >
                    ←
                </button>
                <h1 className={styles.headerTitle}>Finalizar pedido</h1>
            </header>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Como você quer receber?</h2>
                <div className={styles.fulfillmentGrid}>
                    {storeSettings.acceptsDelivery && (
                        <button
                            type="button"
                            className={`${styles.fulfillmentCard} ${fulfillmentType === "delivery" ? styles.fulfillmentCardSelected : ""}`}
                            onClick={() => setFulfillmentType("delivery")}
                            aria-pressed={fulfillmentType === "delivery"}
                        >
                            <span className={styles.fulfillmentIcon}>🚚</span>
                            Entrega
                        </button>
                    )}
                    {storeSettings.acceptsPickup && (
                        <button
                            type="button"
                            className={`${styles.fulfillmentCard} ${fulfillmentType === "pickup" ? styles.fulfillmentCardSelected : ""}`}
                            onClick={() => setFulfillmentType("pickup")}
                            aria-pressed={fulfillmentType === "pickup"}
                        >
                            <span className={styles.fulfillmentIcon}>🏪</span>
                            Retirada no local
                        </button>
                    )}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Seus dados</h2>
                <div className={styles.field}>
                    <label htmlFor="checkout-name" className={styles.label}>Nome</label>
                    <input
                        id="checkout-name"
                        ref={nameRef}
                        type="text"
                        className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome"
                    />
                    {errors.name && <p className={styles.errorText}>{errors.name}</p>}
                </div>
                <div className={styles.field}>
                    <label htmlFor="checkout-phone" className={styles.label}>Telefone</label>
                    <input
                        id="checkout-phone"
                        type="tel"
                        className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="(47) 99999-9999"
                    />
                    {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
                </div>
            </section>

            {fulfillmentType === "delivery" ? (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Onde devemos entregar?</h2>
                    <div className={`${styles.field} ${styles.addressGridFull}`}>
                        <label htmlFor="checkout-zip" className={styles.label}>CEP</label>
                        <input
                            id="checkout-zip"
                            type="text"
                            className={`${styles.input} ${errors.zipCode ? styles.inputError : ""}`}
                            value={zipCode}
                            onChange={(e) => handleZipCodeChange(e.target.value)}
                            placeholder="01000-000"
                        />
                        {errors.zipCode && <p className={styles.errorText}>{errors.zipCode}</p>}
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="checkout-street" className={styles.label}>Rua</label>
                        <input
                            id="checkout-street"
                            type="text"
                            className={`${styles.input} ${errors.street ? styles.inputError : ""}`}
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            placeholder="Nome da rua"
                        />
                        {errors.street && <p className={styles.errorText}>{errors.street}</p>}
                    </div>
                    <div className={styles.addressGrid}>
                        <div className={styles.field}>
                            <label htmlFor="checkout-number" className={styles.label}>Número</label>
                            <input
                                id="checkout-number"
                                type="text"
                                className={`${styles.input} ${errors.number ? styles.inputError : ""}`}
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                placeholder="Nº"
                            />
                            {errors.number && <p className={styles.errorText}>{errors.number}</p>}
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="checkout-complement" className={styles.label}>Complemento</label>
                            <input
                                id="checkout-complement"
                                type="text"
                                className={styles.input}
                                value={complement}
                                onChange={(e) => setComplement(e.target.value)}
                                placeholder="Apto, bloco..."
                            />
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="checkout-neighborhood" className={styles.label}>Bairro</label>
                        <input
                            id="checkout-neighborhood"
                            type="text"
                            className={`${styles.input} ${errors.neighborhood ? styles.inputError : ""}`}
                            value={neighborhood}
                            onChange={(e) => setNeighborhood(e.target.value)}
                            placeholder="Seu bairro"
                        />
                        {errors.neighborhood && <p className={styles.errorText}>{errors.neighborhood}</p>}
                    </div>
                    <div className={styles.addressGrid}>
                        <div className={styles.field}>
                            <label htmlFor="checkout-city" className={styles.label}>Cidade</label>
                            <input
                                id="checkout-city"
                                type="text"
                                className={`${styles.input} ${errors.city ? styles.inputError : ""}`}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Cidade"
                            />
                            {errors.city && <p className={styles.errorText}>{errors.city}</p>}
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="checkout-state" className={styles.label}>Estado</label>
                            <input
                                id="checkout-state"
                                type="text"
                                className={`${styles.input} ${errors.state ? styles.inputError : ""}`}
                                value={state}
                                onChange={(e) => setState(e.target.value.toUpperCase().slice(0, 2))}
                                placeholder="UF"
                                maxLength={2}
                            />
                            {errors.state && <p className={styles.errorText}>{errors.state}</p>}
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="checkout-reference" className={styles.label}>Ponto de referência</label>
                        <input
                            id="checkout-reference"
                            type="text"
                            className={styles.input}
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                            placeholder="Ex.: próximo ao mercado"
                        />
                    </div>
                </section>
            ) : (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Retirada no local</h2>
                    <div className={styles.pickupInfo}>
                        <p className={styles.pickupInfoText}>Retire seu pedido neste endereço.</p>
                        <p className={styles.pickupAddress}>
                            {storeSettings.address.street}, {storeSettings.address.number}
                            {storeSettings.address.complement ? ` - ${storeSettings.address.complement}` : ""}
                            <br />
                            {storeSettings.address.neighborhood} - {storeSettings.address.city}, {storeSettings.address.state}
                        </p>
                    </div>
                </section>
            )}

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Como você quer pagar?</h2>
                <div className={styles.paymentList}>
                    {availablePayments.map((payment) => (
                        <button
                            key={payment.id}
                            type="button"
                            className={`${styles.paymentCard} ${selectedPaymentId === payment.id ? styles.paymentCardSelected : ""}`}
                            onClick={() => handlePaymentChange(payment.id)}
                            aria-pressed={selectedPaymentId === payment.id}
                        >
                            <span className={`${styles.paymentRadio} ${selectedPaymentId === payment.id ? styles.paymentRadioSelected : ""}`}>
                                {selectedPaymentId === payment.id && <span className={styles.paymentRadioDot} />}
                            </span>
                            <span className={styles.paymentName}>{payment.name}</span>
                        </button>
                    ))}
                </div>

                {selectedPayment?.type === "pix" && (
                    <p className={styles.paymentMessage}>
                        Os dados para pagamento serão enviados com a confirmação do pedido.
                    </p>
                )}

                {selectedPayment?.type === "card" && (
                    <p className={styles.paymentMessage}>
                        Pagamento na {fulfillmentType === "delivery" ? "entrega" : "retirada"}.
                    </p>
                )}

                {selectedPayment?.type === "cash" && (
                    <div>
                        <div className={styles.field}>
                            <p className={styles.label}>Precisa de troco?</p>
                            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                                <button
                                    type="button"
                                    className={`${styles.paymentCard} ${needsChange === false ? styles.paymentCardSelected : ""}`}
                                    onClick={() => { setNeedsChange(false); setChangeFor(""); }}
                                    style={{ flex: 1, justifyContent: "center" }}
                                    aria-pressed={needsChange === false}
                                >
                                    <span className={styles.paymentName}>Não preciso de troco</span>
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.paymentCard} ${needsChange === true ? styles.paymentCardSelected : ""}`}
                                    onClick={() => setNeedsChange(true)}
                                    style={{ flex: 1, justifyContent: "center" }}
                                    aria-pressed={needsChange === true}
                                >
                                    <span className={styles.paymentName}>Sim</span>
                                </button>
                            </div>
                            {errors.needsChange && <p className={styles.errorText}>{errors.needsChange}</p>}
                        </div>

                        {needsChange === true && (
                            <div className={styles.changeField}>
                                <label htmlFor="checkout-change" className={styles.label}>Troco para quanto?</label>
                                <input
                                    id="checkout-change"
                                    type="text"
                                    className={`${styles.input} ${errors.changeFor ? styles.inputError : ""}`}
                                    value={changeFor}
                                    onChange={(e) => setChangeFor(e.target.value)}
                                    placeholder="R$ 100,00"
                                />
                                {errors.changeFor && <p className={styles.errorText}>{errors.changeFor}</p>}
                            </div>
                        )}
                    </div>
                )}
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Confira seu pedido</h2>
                <div className={styles.orderSummary}>
                    {items.map((item) => (
                        <div key={item.id} className={styles.orderItem}>
                            <div className={styles.orderItemLeft}>
                                <span>
                                    <span className={styles.orderItemQty}>{item.quantity}x</span>
                                    <span className={styles.orderItemName}>{item.product.name}</span>
                                </span>
                                {item.selectedAdditionals.length > 0 && (
                                    <p className={styles.orderItemDetails}>
                                        {item.selectedAdditionals
                                            .map((s) => `${s.additional.name}${s.quantity > 1 ? ` x${s.quantity}` : ""}`)
                                            .join(", ")}
                                    </p>
                                )}
                                {item.observation && (
                                    <p className={styles.orderItemDetails}>📝 {item.observation}</p>
                                )}
                                <div className={styles.itemActions}>
                                    <button
                                        type="button"
                                        className={styles.editLink}
                                        onClick={() => handleEditItem(item.cartItemId, item.product.id)}
                                    >
                                        <span className={styles.actionIcon} aria-hidden="true">✏️</span>
                                        <span>Editar</span>
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.removeLink}
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        <span className={styles.actionIcon} aria-hidden="true">🗑️</span>
                                        <span>Remover</span>
                                    </button>
                                </div>
                            </div>
                            <span className={styles.orderItemPrice}>{formatCurrency(item.totalPrice)}</span>
                        </div>
                    ))}
                    <button
                        type="button"
                        className={styles.addMoreButton}
                        onClick={handleAddMoreItems}
                    >
                        + Adicionar mais itens
                    </button>
                    <div className={styles.orderTotals}>
                        <div className={styles.totalRow}>
                            <span className={styles.totalLabel}>Subtotal</span>
                            <span className={styles.totalValue}>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className={styles.totalRow}>
                            <span className={styles.totalLabel}>Taxa de entrega</span>
                            <span className={styles.totalValue}>
                                {fulfillmentType === "delivery" ? formatCurrency(deliveryFee) : "Grátis"}
                            </span>
                        </div>
                        <div className={styles.totalFinalRow}>
                            <span className={styles.totalFinalLabel}>Total</span>
                            <span className={styles.totalFinalValue}>{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>
            </section>

            <footer className={styles.footerBar}>
                <div className={styles.footerTotal}>
                    <span className={styles.footerTotalLabel}>Total</span>
                    <span className={styles.footerTotalValue}>{formatCurrency(total)}</span>
                </div>
                <button
                    type="button"
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Confirmando..." : "Confirmar pedido"}
                </button>
            </footer>
        </div>
    );
}

export default CheckoutPage;