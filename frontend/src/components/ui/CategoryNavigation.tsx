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
    return (
        <nav className={styles.container} aria-label="Categorias do cardápio">
            <div className={styles.list} role="list">
                {categories.map((category) => {
                    const isActive = activeCategorySlug === category.slug;

                    return (
                        <button
                            key={category.slug}
                            type="button"
                            className={`${styles.item} ${isActive ? styles.active : ""}`.trim()}
                            aria-pressed={isActive}
                            aria-label={`Ir para a categoria ${category.name}`}
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
