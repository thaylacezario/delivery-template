import { useEffect, useRef } from "react";
import type { Category } from "../../types/Category";
import styles from "./CategoryNavigation.module.css";

type CategoryNavigationProps = {
    categories: Category[];
    activeCategorySlug: string;
    onCategorySelect: (slug: string) => void;
};

export function CategoryNavigation({
    categories,
    activeCategorySlug,
    onCategorySelect,
}: CategoryNavigationProps) {
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const activeButton = buttonRefs.current[activeCategorySlug];
        const listElement = listRef.current;

        if (!activeButton || !listElement) {
            return;
        }

        const targetLeft =
            activeButton.offsetLeft - (listElement.clientWidth - activeButton.clientWidth) / 2;

        listElement.scrollTo({
            left: Math.max(0, targetLeft),
            behavior: "smooth",
        });
    }, [activeCategorySlug]);

    return (
        <nav className={styles.container} aria-label="Categorias do cardápio">
            <div className={styles.list} role="list" ref={listRef}>
                {categories.map((category) => {
                    const isActive = activeCategorySlug === category.slug;

                    return (
                        <button
                            key={category.slug}
                            ref={(element) => {
                                buttonRefs.current[category.slug] = element;
                            }}
                            type="button"
                            className={`${styles.item} ${isActive ? styles.active : ""}`.trim()}
                            aria-pressed={isActive}
                            aria-label={`Ir para ${category.name}`}
                            onClick={() => onCategorySelect(category.slug)}
                        >
                            {category.name}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

export default CategoryNavigation;
