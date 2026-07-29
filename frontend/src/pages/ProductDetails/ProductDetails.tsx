import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { products } from "../../data/products";
import styles from "./ProductDetails.module.css";

export function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = useMemo(() => {
        return products.find((item) => item.id === Number(id));
    }, [id]);

    const [quantity, setQuantity] = useState(1);
    const [observations, setObservations] = useState("");
    const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>({});

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

        if (!product.ingredients?.length) {
            return product.description;
        }

        return `${product.description} ${product.ingredients.join(", ")}.`;
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

    if (!product) {
        return (
            <main className={styles.notFound}>
                <h1>Produto não encontrado</h1>
                <button type="button" className={styles.backButton} onClick={() => navigate("/")}>
                    Voltar para a home
                </button>
            </main>
        );
    }

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

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedAddons, observations);
    };

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);

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
                        <h2>Adicionais</h2>
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
                    <h2>Observações</h2>
                </div>
                <textarea
                    className={styles.textarea}
                    rows={3}
                    value={observations}
                    onChange={(event) => setObservations(event.target.value)}
                    placeholder="Ex.: sem cebola, molho separado ou carne bem passada."
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

                <button type="button" className={styles.addButton} onClick={handleAddToCart}>
                    Adicionar
                </button>
            </footer>
        </main>
    );
}

export default ProductDetails;
