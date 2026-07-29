import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/Product";
import { useCart } from "../../hooks/useCart";

interface ProductCardProps {
    product: Product;
    onAdd?: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onAdd?.(product);
        addToCart(product);
    };

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <article className="product-card" onClick={handleCardClick} role="button" tabIndex={0} onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleCardClick();
            }
        }}>
            <style>{`
                .product-card {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    max-width: 280px;
                    border-radius: 24px;
                    overflow: hidden;
                    background: #ffffff;
                    border: 1px solid rgba(226, 232, 240, 0.9);
                    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
                    transition: transform 0.28s ease, box-shadow 0.28s ease;
                    position: relative;
                }

                .product-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.14);
                }

                .product-card__image {
                    width: 100%;
                    aspect-ratio: 4 / 3;
                    object-fit: cover;
                    background: linear-gradient(135deg, #fff7ed, #fef2f2);
                    display: block;
                }

                .product-card__content {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    gap: 0.7rem;
                    padding: 1rem 1rem 1.1rem;
                }

                .product-card__title {
                    margin: 0;
                    color: #111827;
                    font-size: 1.05rem;
                    font-weight: 800;
                    line-height: 1.25;
                }

                .product-card__description {
                    margin: 0;
                    color: #64748b;
                    font-size: 0.93rem;
                    line-height: 1.45;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    min-height: 2.8rem;
                }

                .product-card__footer {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-top: auto;
                }

                .product-card__price {
                    color: #ea580c;
                    font-size: 1.2rem;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                }

                .product-card__button {
                    width: 100%;
                    border: 1px solid #f97316;
                    border-radius: 999px;
                    background: #ffffff;
                    color: #f97316;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 0.92rem;
                    padding: 0.7rem 0.95rem;
                    transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
                    box-shadow: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.35rem;
                }

                .product-card__button:hover {
                    transform: translateY(-1px);
                    background: #fff7ed;
                    border-color: #ea580c;
                }

                .product-card__button:active {
                    transform: scale(0.98);
                }

                @media (max-width: 640px) {
                    .product-card {
                        max-width: 100%;
                    }

                    .product-card__content {
                        padding: 0.95rem;
                    }
                }
            `}</style>

            <img
                className="product-card__image"
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
            />

            <div className="product-card__content">
                <h3 className="product-card__title">{product.name}</h3>
                <p className="product-card__description">{product.description}</p>

                <div className="product-card__footer">
                    <span className="product-card__price">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>
                    <button
                        type="button"
                        className="product-card__button"
                        onClick={handleAdd}
                    >
                        <span aria-hidden="true">＋</span>
                        <span>Adicionar</span>
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;
