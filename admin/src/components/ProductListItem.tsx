import type { AdminProduct } from "../types/products";
import styles from "./ProductListItem.module.css";

type ProductListItemProps = {
  product: AdminProduct;
  isRecentlyUpdated: boolean;
  onEdit: (productId: string) => void;
  onToggleActive: (productId: string) => void;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export function ProductListItem({
  product,
  isRecentlyUpdated,
  onEdit,
  onToggleActive,
}: ProductListItemProps) {
  return (
    <article
      className={`${styles.item} ${!product.active ? styles.itemInactive : ""} ${
        isRecentlyUpdated ? styles.itemUpdated : ""
      }`}
      aria-label={`Produto ${product.name}`}
    >
      <img className={styles.image} src={product.imageUrl} alt={product.name} />

      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
      </div>

      <div className={styles.meta}>
        <span className={styles.category}>{product.category}</span>
        <span className={styles.price}>{formatCurrency(product.price)}</span>
      </div>

      <div className={styles.statusCell}>
        <span className={`${styles.status} ${product.active ? styles.statusActive : styles.statusInactive}`}>
          {product.active ? "Ativo" : "Inativo"}
        </span>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.ghostButton} onClick={() => onEdit(product.id)}>
          Editar
        </button>
        <button type="button" className={styles.secondaryButton} onClick={() => onToggleActive(product.id)}>
          {product.active ? "Desativar" : "Ativar"}
        </button>
      </div>
    </article>
  );
}

export default ProductListItem;
