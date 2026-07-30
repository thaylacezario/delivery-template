import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CartBottomSheet.module.css";
import { useCart } from "../../../hooks/useCart";

interface CartBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);

export function CartBottomSheet({ isOpen, onClose }: CartBottomSheetProps) {
    const navigate = useNavigate();
    const { items, getTotalItems, getTotalPrice, updateQuantity } =
        useCart();

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        },
        [isOpen, onClose],
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                className={`${styles.sheet} ${isOpen ? styles.sheetOpen : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Carrinho de compras"
            >
                <div className={styles.handle}>
                    <div className={styles.handleBar} />
                </div>

                <div className={styles.header}>
                    <div>
                        <h2 className={styles.headerTitle}>Seu carrinho</h2>
                        <span className={styles.headerCount}>
                            {totalItems} {totalItems === 1 ? "item" : "itens"}
                        </span>
                    </div>
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Fechar carrinho"
                    >
                        ✕
                    </button>
                </div>

                <div className={styles.items}>
                    {items.length === 0 ? (
                        <div className={styles.emptyCart}>
                            <div className={styles.emptyIcon}>🛒</div>
                            <p className={styles.emptyTitle}>Seu carrinho está vazio</p>
                            <p className={styles.emptyText}>
                                Adicione itens deliciosos para começar! 🍔
                            </p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className={styles.item}>
                                <div
                                    className={styles.itemClickable}
                                    onClick={() => {
                                        onClose();
                                        navigate(
                                            `/product/${item.product.id}?cartItemId=${item.cartItemId}`,
                                        );
                                    }}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`Editar ${item.product.name}`}
                                    onKeyDown={(event) => {
                                        if (
                                            event.key === "Enter" ||
                                            event.key === " "
                                        ) {
                                            event.preventDefault();
                                            onClose();
                                            navigate(
                                                `/product/${item.product.id}?cartItemId=${item.cartItemId}`,
                                            );
                                        }
                                    }}
                                >
                                    {item.product.image && (
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className={styles.itemImage}
                                        />
                                    )}

                                    <div className={styles.itemContent}>
                                        <p className={styles.itemName}>
                                            {item.product.name}
                                        </p>

                                        {item.selectedAdditionals.length >
                                            0 && (
                                            <p
                                                className={
                                                    styles.itemAdditionals
                                                }
                                            >
                                                {item.selectedAdditionals
                                                    .map(
                                                        (selected) =>
                                                            `${selected.additional.name}${
                                                                selected.quantity >
                                                                1
                                                                    ? ` x${selected.quantity}`
                                                                    : ""
                                                            }`,
                                                    )
                                                    .join(", ")}
                                            </p>
                                        )}

                                        {item.observation && (
                                            <p
                                                className={
                                                    styles.itemObservation
                                                }
                                            >
                                                📝 {item.observation}
                                            </p>
                                        )}

                                        <div className={styles.itemBottom}>
                                            <span
                                                className={styles.itemPrice}
                                            >
                                                {formatCurrency(
                                                    item.totalPrice,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.quantityControl}>
                                    <button
                                        type="button"
                                        className={styles.quantityButton}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            updateQuantity(
                                                item.id,
                                                item.quantity - 1,
                                            );
                                        }}
                                        aria-label="Diminuir quantidade"
                                    >
                                        −
                                    </button>
                                    <span className={styles.quantityValue}>
                                        {item.quantity}
                                    </span>
                                    <button
                                        type="button"
                                        className={styles.quantityButton}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            updateQuantity(
                                                item.id,
                                                item.quantity + 1,
                                            );
                                        }}
                                        aria-label="Aumentar quantidade"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.subtotal}>
                            <span className={styles.subtotalLabel}>
                                Subtotal
                            </span>
                            <span className={styles.subtotalValue}>
                                {formatCurrency(totalPrice)}
                            </span>
                        </div>
                        <button
                            type="button"
                            className={styles.checkoutButton}
                            onClick={() => {
                                onClose();
                                navigate("/checkout");
                            }}
                        >
                            Finalizar pedido
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartBottomSheet;