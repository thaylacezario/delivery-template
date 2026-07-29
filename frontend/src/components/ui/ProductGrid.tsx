import type { Product } from "../../types/Product";
import { products as defaultProducts } from "../../data/products";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
    products?: Product[];
}

export function ProductGrid({ products = defaultProducts }: ProductGridProps) {
    return (
        <section className="product-grid" aria-label="Lista de produtos">
            <style>{`
                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 1.25rem;
                    width: 100%;
                }

                @media (max-width: 640px) {
                    .product-grid {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }
                }
            `}</style>

            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </section>
    );
}

export default ProductGrid;
