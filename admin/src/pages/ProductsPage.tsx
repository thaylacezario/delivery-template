import { useMemo, useState } from "react";
import { ProductFilters } from "../components/ProductFilters";
import { ProductList } from "../components/ProductList";
import { getMockProducts } from "../services/productsService";
import type { ProductFilterStatus } from "../types/products";
import styles from "./ProductsPage.module.css";

export function ProductsPage() {
  const [products, setProducts] = useState(() => getMockProducts());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<ProductFilterStatus>("all");
  const [recentlyUpdatedId, setRecentlyUpdatedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))].sort((a, b) =>
      a.localeCompare(b),
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch || product.name.toLowerCase().includes(normalizedSearch);
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "active" && product.active) ||
        (selectedStatus === "inactive" && !product.active);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, selectedCategory, selectedStatus]);

  const handleToggleActive = (productId: string) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? { ...product, active: !product.active } : product,
      ),
    );

    setRecentlyUpdatedId(productId);
    window.setTimeout(() => setRecentlyUpdatedId(null), 900);
  };

  const handleEdit = (productId: string) => {
    const selectedProduct = products.find((product) => product.id === productId);
    if (selectedProduct) {
      console.log("Editar produto:", selectedProduct);
    }
  };

  return (
    <section className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Produtos</h2>
          <p className={styles.subtitle}>Gerencie os itens exibidos no seu cardapio.</p>
        </div>
        <button type="button" className={styles.primaryButton}>
          Novo produto
        </button>
      </header>

      <ProductFilters
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        totalFound={filteredProducts.length}
      />

      <ProductList
        products={filteredProducts}
        hasProducts={products.length > 0}
        hasActiveFilters={Boolean(searchTerm.trim()) || selectedCategory !== "all" || selectedStatus !== "all"}
        recentlyUpdatedId={recentlyUpdatedId}
        onEdit={handleEdit}
        onToggleActive={handleToggleActive}
      />
    </section>
  );
}

export default ProductsPage;
