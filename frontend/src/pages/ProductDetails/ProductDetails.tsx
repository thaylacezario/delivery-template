import { useMemo, useState, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { products } from "../../data/products";
import { Toast } from "../../components/ui/Toast/Toast";
import styles from "./ProductDetails.module.css";

export function ProductDetails() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { addToCart, updateCartItem, items } = useCart();

    const cartItemId = searchParams.get("cartItemId");
    const fromCheckout = searchParams.get("from") === "checkout";
    const isEditing = Boolean(cartItemId);

    const editingItem = useMemo(() => {
        if (!cartItemId) {
            return null;
        }
        return items.find((item) => item.cartItemId === cartItemId) ?? null;
    }, [cartItemId, items]);

    const product = useMemo(() => {
        if (editingItem) {
            return editingItem.product;
        }
        return products.find((item) => item.id === Number(id));
    }, [id, editingItem]);

    const initialQuantity = editingItem ? editingItem.quantity : 1;
    const initialObservations = editingItem ? editingItem.observation : "";

    const initialAddonQuantities = useMemo(() => {
        if (!editingItem || !editingItem.product.additionals) {
            return {};
        }
        const result: Record<string, number> = {};
        for (const addon of editingItem.product.additionals) {
            const selected = editingItem.selectedAdditionals.find(
                (s) => s.additional.id === addon.id,
            );
            result[addon.id] = selected ? selected.quantity : 0;
        }
        return result;
    }, [editingItem]);

    const [quantity, setQuantity] = useState(initialQuantity);
    const [observations, setObservations] = useState(initialObservations);
    const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>(initialAddonQuantities);
    const [isAdding, setIsAdding] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const selectedAddons = useMemo(() => {
        if (!product?.additionals) {
            return [];
        }

        return product.additionals
            .filter((addon) => addon.active !== false)
            .map((addon) => ({
                additional: addon,
                quantity: addonQuantities[addon.id] ?? 0,
            }))
            .filter((selected) => selected.quantity > 0);
    }, [addonQuantities, product]);

    const textOverview = useMemo(() => {
        if (!product) {
            return "";
        }

        return product.description;
    }, [product]);

    const additionalsTotal = useMemo(
        () =>
            selectedAddons.reduce(
                (sum, selected) => sum + selected.additional.price * selected.quantity,
                0,
            ),
        [selectedAddons],
    );

    const totalPrice = useMemo(() => {
        if (!product) {
            return 0;
        }

        return (product.price + additionalsTotal) * quantity;
    }, [additionalsTotal, product, quantity]);

    const updateAddonQuantity = (addonId: string, delta: number, maxQuantity = 3) => {
        setAddonQuantities((current) => {
            const currentAmount = current[addonId] ?? 0;
            const nextAmount = Math.max(0, Math.min(maxQuantity, currentAmount + delta));
            return {
                ...current,
                [addonId]: nextAmount,
            };
        });
    };

    const handleAddToCart = useCallback(() => {
        if (!product || isAdding) {
            return;
        }

        const additionalsTotalCalc = selectedAddons.reduce(
            (sum, selected) => sum + selected.additional.price * selected.quantity,
            0,
        );
        const itemUnitPrice = product.price + additionalsTotalCalc;
        const itemTotal = itemUnitPrice * quantity;

        if (isEditing && cartItemId) {
            updateCartItem(cartItemId, {
                product,
                quantity,
                selectedAdditionals: selectedAddons,
                observation: observations,
                unitPrice: itemUnitPrice,
                totalPrice: itemTotal,
            });
        } else {
            addToCart(product, quantity, selectedAddons, observations);
        }

        setIsAdding(true);
        setShowToast(true);

        setTimeout(() => {
            if (fromCheckout) {
                navigate("/checkout");
            } else {
                navigate("/", { state: { reopenCart: true } });
            }
        }, 600);
    }, [
        product,
        quantity,
        selectedAddons,
        observations,
        addToCart,
        updateCartItem,
        navigate,
        isAdding,
        isEditing,
        cartItemId,
        fromCheckout,
    ]);

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);

    if (!product) {
        return (
            <main className={styles.notFound}>
                <h1>Produto não encontrado</h1>
                <button type="button" className={styles.backButton} onClick={() => navigate("/")}>
                    Voltar para o cardápio
                </button>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <button type="button" className={styles.backButton} onClick={() => navigate("/")}>
                ← Voltar
            </button>

            <img className={styles.image} src={product.image} alt={product.name} />

            <div className={styles.productInfo}>
                <span className={styles.category}>{product.category}</span>
                <h1 className={styles.title}>{product.name}</h1>
                <p className={styles.description}>{textOverview}</p>
            </div>

            {product.additionals && product.additionals.length > 0 && (
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Escolha seus adicionais</h2>
                    </div>
                    <div className={styles.addonsList}>
                        {product.additionals.map((addon) => {
                            const currentAmount = addonQuantities[addon.id] ?? 0;
                            const maxQuantity = addon.maxQuantity ?? 3;
                            const isActive = addon.active !== false;

                            return (
                                <article
                                    key={addon.id}
                                    className={styles.addonItem}
                                    aria-disabled={!isActive}
                                >
                                    <div className={styles.addonTextBlock}>
                                        <p className={styles.addonName}>{addon.name}</p>
                                        <span className={styles.addonPrice}>{formatCurrency(addon.price)}</span>
                                    </div>

                                    <div className={styles.addonQuantityControl}>
                                        <button
                                            type="button"
                                            className={styles.quantityButton}
                                            disabled={!isActive || currentAmount <= 0}
                                            onClick={() => updateAddonQuantity(addon.id, -1, maxQuantity)}
                                        >
                                            −
                                        </button>
                                        <span className={styles.quantityValue}>{currentAmount}</span>
                                        <button
                                            type="button"
                                            className={styles.quantityButton}
                                            disabled={!isActive || currentAmount >= maxQuantity}
                                            onClick={() => updateAddonQuantity(addon.id, 1, maxQuantity)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            )}

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                        <h2>Alguma observação?</h2>
                </div>
                <textarea
                    className={styles.textarea}
                    rows={3}
                    value={observations}
                    onChange={(event) => setObservations(event.target.value)}
                    placeholder="Ex.: sem cebola, ponto da carne, retirar tomate..."
                />
            </section>

            <footer className={styles.footerBar}>
                <div className={styles.footerContent}>
                    <div className={styles.totalBlock}>
                        <span className={styles.summaryLabel}>Total</span>
                        <strong className={styles.summaryPrice}>{formatCurrency(totalPrice)}</strong>
                    </div>

                    <div className={styles.footerQuantityControl}>
                        <button
                            type="button"
                            className={styles.quantityButton}
                            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                            aria-label="Diminuir quantidade do produto"
                        >
                            −
                        </button>
                        <span className={styles.quantityValue}>{quantity}</span>
                        <button
                            type="button"
                            className={styles.quantityButton}
                            onClick={() => setQuantity((value) => value + 1)}
                            aria-label="Aumentar quantidade do produto"
                        >
                            +
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    className={`${styles.addButton} ${isAdding ? styles.addButtonAdded : ""}`}
                    onClick={handleAddToCart}
                    disabled={isAdding}
                >
                    {isAdding
                        ? "✓ Adicionado"
                        : isEditing
                          ? "Atualizar pedido"
                          : "Adicionar ao carrinho"}
                </button>
            </footer>

            <Toast
                message="Adicionado ao carrinho"
                visible={showToast}
                onHide={() => setShowToast(false)}
            />
        </main>
    );
}

export default ProductDetails;