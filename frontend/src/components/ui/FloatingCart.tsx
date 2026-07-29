import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./FloatingCart.module.css";
import { useCart } from "../../hooks/useCart";
import { CartBottomSheet } from "./CartBottomSheet/CartBottomSheet";

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);

export function FloatingCart() {
    const location = useLocation();
    const { items, getTotalItems, getTotalPrice } = useCart();
    const [isOpen, setIsOpen] = useState(
        location.state?.reopenCart && items.length > 0,
    );

    if (location.state?.reopenCart && items.length > 0) {
        window.history.replaceState({}, "");
    }

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    if (items.length === 0) {
        return (
            <div className={styles.shell}>
                <button type="button" className={styles.summary} onClick={() => setIsOpen(true)}>
                    <span className={styles.badge}>{totalItems}</span>
                    <span className={styles.label}>Carrinho vazio</span>
                    <span className={styles.total}>{formatCurrency(0)}</span>
                </button>
                <CartBottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
        );
    }

    return (
        <div className={styles.shell}>
            <button type="button" className={styles.summary} onClick={() => setIsOpen(true)}>
                <span className={styles.badge}>{totalItems}</span>
                <span className={styles.label}>Ver carrinho</span>
                <span className={styles.total}>{formatCurrency(totalPrice)}</span>
            </button>

            <CartBottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
}

export default FloatingCart;
