import { useEffect, useState } from "react";
import styles from "./Toast.module.css";

interface ToastProps {
    message: string;
    visible: boolean;
    duration?: number;
    onHide?: () => void;
}

export function Toast({ message, visible, duration = 2000, onHide }: ToastProps) {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (visible) {
            setShouldRender(true);
            const timer = setTimeout(() => {
                setShouldRender(false);
                onHide?.();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [visible, duration, onHide]);

    if (!shouldRender && !visible) {
        return null;
    }

    return (
        <div
            className={`${styles.toast} ${visible ? styles.toastVisible : ""}`}
            role="status"
            aria-live="polite"
        >
            <span className={styles.icon}>✓</span>
            {message}
        </div>
    );
}

export default Toast;