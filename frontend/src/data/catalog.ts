import type { Category } from "../types/Category";
import type { Product } from "../types/Product";

export type ProductSection = {
    category: Category;
    products: Product[];
};

export function getActiveCategories(categories: Category[]) {
    return categories
        .filter((category) => category.active)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getActiveProducts(products: Product[]) {
    return products
        .filter((product) => product.active ?? true)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getProductSections(categories: Category[], products: Product[], searchTerm = "") {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const activeCategories = getActiveCategories(categories);

    return activeCategories.map((category) => ({
        category,
        products: getActiveProducts(products).filter((product) => {
            const matchesCategory = product.categoryId === category.id;
            const matchesSearch =
                !normalizedSearch ||
                product.name.toLowerCase().includes(normalizedSearch) ||
                product.description.toLowerCase().includes(normalizedSearch);

            return matchesCategory && matchesSearch;
        }),
    }));
}
