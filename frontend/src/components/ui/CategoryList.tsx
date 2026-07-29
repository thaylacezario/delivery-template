import { useEffect, useRef } from "react";
import styles from "./CategoryList.module.css";

type CategoryListProps = {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    className?: string;
};

export function CategoryList({
    categories,
    selectedCategory,
    onCategoryChange,
    className,
}: CategoryListProps) {
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    useEffect(() => {
        const activeButton = buttonRefs.current[selectedCategory];
        activeButton?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }, [selectedCategory]);

    return (
        <div className={`${styles.container} ${className ?? ""}`.trim()}>
            <div className={styles.list} role="list" aria-label="Categorias">
                {categories.map((category) => {
                    const isSelected = selectedCategory === category;

                    return (
                        <button
                            key={category}
                            ref={(element) => {
                                buttonRefs.current[category] = element;
                            }}
                            type="button"
                            className={`${styles.item} ${isSelected ? styles.selected : ""}`.trim()}
                            aria-pressed={isSelected}
                            onClick={() => onCategoryChange(category)}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default CategoryList;
