import type { ProductFilterStatus } from "../types/products";
import styles from "./ProductFilters.module.css";

type ProductFiltersProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedStatus: ProductFilterStatus;
  onStatusChange: (value: ProductFilterStatus) => void;
  totalFound: number;
};

export function ProductFilters({
  searchTerm,
  onSearchTermChange,
  categories,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  totalFound,
}: ProductFiltersProps) {
  return (
    <section className={styles.toolbar} aria-label="Filtros de produtos">
      <div className={styles.controls}>
        <label className={styles.field}>
          <span className={styles.label}>Buscar</span>
          <input
            type="search"
            className={styles.input}
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
            placeholder="Buscar por nome"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Categoria</span>
          <select
            className={styles.select}
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <option value="all">Todas</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Status</span>
          <select
            className={styles.select}
            value={selectedStatus}
            onChange={(event) => onStatusChange(event.target.value as ProductFilterStatus)}
          >
            <option value="all">Todos</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
        </label>
      </div>

      <p className={styles.resultCount}>{totalFound} produto(s) encontrado(s)</p>
    </section>
  );
}

export default ProductFilters;
