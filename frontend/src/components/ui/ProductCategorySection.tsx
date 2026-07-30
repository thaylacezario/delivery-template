import { forwardRef } from "react";
import type { Category } from "../../types/Category";
import type { Product } from "../../types/Product";
import { ProductGrid } from "./ProductGrid";
import styles from "./ProductCategorySection.module.css";

type ProductCategorySectionProps = {
    category: Category;
    products: Product[];
};

export const ProductCategorySection = forwardRef<HTMLElement, ProductCategorySectionProps>(
    ({ category, products }, ref) => {
        return (
            <section
                id={`category-${category.slug}`}
                className={styles.section}
                ref={ref}
                data-category-slug={category.slug}
            >
                <div className={styles.header}>
                    <h2 className={styles.title}>{category.name}</h2>
                </div>
                {products.length > 0 ? (
                    <ProductGrid products={products} />
                ) : (
                    <p className={styles.emptyState}>Nada aqui por enquanto.</p>
                )}
            </section>
        );
    },
);

ProductCategorySection.displayName = "ProductCategorySection";

export default ProductCategorySection;
