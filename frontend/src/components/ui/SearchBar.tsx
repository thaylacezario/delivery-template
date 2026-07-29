import { useId } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
    value: string;
    onSearchChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function SearchBar({
    value,
    onSearchChange,
    placeholder = "Busque por pratos ou categorias",
    className,
}: SearchBarProps) {
    const inputId = useId();

    return (
        <label htmlFor={inputId} className={`${styles.wrapper} ${className ?? ""}`.trim()}>
            <span className={styles.icon} aria-hidden="true">
                🔎
            </span>
            <input
                id={inputId}
                type="text"
                value={value}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={placeholder}
                className={styles.input}
            />
        </label>
    );
}

export default SearchBar;
