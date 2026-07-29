import { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "../../components/layout/Header";
import { CategoryNavigation } from "../../components/ui/CategoryNavigation";
import { ProductCategorySection } from "../../components/ui/ProductCategorySection";
import { SearchBar } from "../../components/ui/SearchBar";
import { StoreInfo } from "../../components/ui/StoreInfo/StoreInfo";
import { categories } from "../../data/categories";
import { getProductSections } from "../../data/catalog";
import { products } from "../../data/products";
import { storeSettings } from "../../data/storeSettings";
import styles from "./HomePage.module.css";

export function HomePage() {
    const [search, setSearch] = useState("");
    const [activeCategorySlug, setActiveCategorySlug] = useState("todos");
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    const navigationCategories = useMemo(
        () => [{ id: 0, name: "Todos", slug: "todos", order: 0, active: true }, ...categories.filter((category) => category.active).sort((a, b) => a.order - b.order)],
        [],
    );

    const visibleSections = useMemo(() => {
        return getProductSections(categories, products, search);
    }, [search]);

    useEffect(() => {
        if (visibleSections.length === 0) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visibleEntry) {
                    const nextSlug = visibleEntry.target.getAttribute("data-category-slug") ?? "todos";
                    setActiveCategorySlug(nextSlug);
                }
            },
            {
                rootMargin: "-35% 0px -50% 0px",
                threshold: [0.2, 0.4, 0.7],
            },
        );

        Object.values(sectionRefs.current).forEach((element) => {
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [visibleSections]);

    const handleCategorySelect = (slug: string) => {
        setActiveCategorySlug(slug);

        if (slug === "todos") {
            document.getElementById("category-sections-start")?.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }

        const section = sectionRefs.current[slug];
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            <Header
                companyName="Delivery Template"
                logo="https://placehold.co/80x80/png"
            />

            <div className={styles.storeInfoWrapper}>
                <StoreInfo store={storeSettings} />
            </div>

            <main className={styles.mainContent}>
                <section
                    style={{
                        background: "linear-gradient(135deg, #fff7ed, #ffe4e6)",
                        borderRadius: "24px",
                        padding: "32px",
                        marginBottom: "24px",
                        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                    }}
                >
                    <h1 style={{ margin: "0 0 8px", color: "#0f172a" }}>
                        Sabores que chegam até você
                    </h1>
                    <p style={{ margin: 0, color: "#475569", fontSize: "1rem" }}>
                        Escolha seus favoritos e monte seu pedido com rapidez.
                    </p>
                </section>

                <div style={{ marginBottom: "24px" }}>
                    <CategoryNavigation
                        categories={navigationCategories}
                        activeCategorySlug={activeCategorySlug}
                        onCategorySelect={handleCategorySelect}
                    />
                </div>

                <div style={{ marginBottom: "24px" }}>
                    <SearchBar value={search} onSearchChange={setSearch} />
                </div>

                <div id="category-sections-start" />

                {visibleSections.length > 0 ? (
                    visibleSections.map((section) => (
                        <ProductCategorySection
                            key={section.category.id}
                            ref={(node) => {
                                sectionRefs.current[section.category.slug] = node;
                            }}
                            category={section.category}
                            products={section.products}
                        />
                    ))
                ) : (
                    <p className={styles.emptyState}>Nenhum produto encontrado.</p>
                )}
            </main>
        </>
    );
}