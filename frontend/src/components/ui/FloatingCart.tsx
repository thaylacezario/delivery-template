import { useState } from "react";
import styles from "./FloatingCart.module.css";
import { useCart } from "../../hooks/useCart";

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);

export function FloatingCart() {
    const { items, getTotalItems, getTotalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    if (items.length === 0) {
        return (
            <div className={styles.shell}>
                <button type="button" className={styles.summary} onClick={() => setIsOpen((value) => !value)}>
                    <span className={styles.badge}>{totalItems}</span>
                    <span className={styles.label}>Carrinho vazio</span>
                    <span className={styles.total}>{formatCurrency(0)}</span>
                </button>
            </div>
        );
    }

    return (
        <div className={styles.shell}>
            <button type="button" className={styles.summary} onClick={() => setIsOpen((value) => !value)}>
                <span className={styles.badge}>{totalItems}</span>
                <span className={styles.label}>Itens no carrinho</span>
                <span className={styles.total}>{formatCurrency(totalPrice)}</span>
            </button>

            {isOpen && (
                <div className={styles.panel}>
                    <div className={styles.items}>
                        {items.map((item) => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemInfo}>
                                    <strong>{item.product.name}</strong>
                                    <span>{formatCurrency(item.totalPrice)}</span>
                                </div>

                                <div className={styles.actions}>
                                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                        −
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                        +
                                    </button>
                                    <button type="button" className={styles.remove} onClick={() => removeFromCart(item.id)}>
                                        Remover
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button type="button" className={styles.checkout} onClick={clearCart}>
                        Finalizar Pedido
                    </button>
                </div>
            )}
        </div>
    );
}

export default FloatingCart;
