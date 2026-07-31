import type { AdminProduct } from "../types/products";
import { ProductListItem } from "./ProductListItem";
import styles from "./ProductList.module.css";

type ProductListProps = {
  products: AdminProduct[];
  hasProducts: boolean;
  hasActiveFilters: boolean;
  recentlyUpdatedId: string | null;
  onEdit: (productId: string) => void;
  onToggleActive: (productId: string) => void;
};

export function ProductList({
  products,
  hasProducts,
  hasActiveFilters,
  recentlyUpdatedId,
  onEdit,
  onToggleActive,
}: ProductListProps) {
  if (!hasProducts) {
    return (
      <section className={styles.emptyState}>
        <h3>Nenhum produto cadastrado</h3>
        <p>Cadastre seu primeiro item para comecar a montar o cardapio.</p>
      </section>
    );
  }

  if (products.length === 0 && hasActiveFilters) {
    return (
      <section className={styles.emptyState}>
        <h3>Nenhum produto encontrado</h3>
        <p>Tente ajustar os filtros para localizar os itens do cardapio.</p>
      </section>
    );
  }

  return (
    <section className={styles.list} aria-label="Lista de produtos">
      {products.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
          isRecentlyUpdated={recentlyUpdatedId === product.id}
          onEdit={onEdit}
          onToggleActive={onToggleActive}
        />
      ))}
    </section>
  );
}

export default ProductList;
