import { useNavigate } from "react-router-dom";
import styles from "./OrderConfirmation.module.css";

export function OrderConfirmation() {
    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            <div className={styles.icon}>✅</div>
            <h1 className={styles.title}>Pedido confirmado!</h1>
            <p className={styles.text}>
                Recebemos os dados do seu pedido.
            </p>
            <button
                type="button"
                className={styles.button}
                onClick={() => navigate("/")}
            >
                Voltar ao cardápio
            </button>
        </div>
    );
}

export default OrderConfirmation;