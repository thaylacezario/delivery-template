import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { StatCard } from "../components/StatCard";
import { TopHeader } from "../components/TopHeader";
import { RecentOrdersTable } from "../components/RecentOrdersTable";
import { ProductsPage } from "./ProductsPage";
import type { DashboardStat, RecentOrder, SidebarMenuItem } from "../types/dashboard";
import styles from "./DashboardPage.module.css";

const sidebarItems: SidebarMenuItem[] = [
  { id: "overview", label: "Visao geral" },
  { id: "products", label: "Produtos" },
  { id: "categories", label: "Categorias" },
  { id: "orders", label: "Pedidos" },
  { id: "hours", label: "Horarios" },
  { id: "appearance", label: "Aparencia" },
  { id: "settings", label: "Configuracoes" },
];

const stats: DashboardStat[] = [
  { id: "orders-today", label: "Pedidos hoje", value: "28" },
  { id: "revenue-today", label: "Faturamento hoje", value: "R$ 1.984,90" },
  { id: "active-products", label: "Produtos ativos", value: "54" },
  { id: "pending-orders", label: "Pedidos pendentes", value: "6" },
];

const recentOrders: RecentOrder[] = [
  { orderNumber: "1042", customer: "Marina Souza", amount: "R$ 72,50", status: "Em preparo", time: "19:10" },
  { orderNumber: "1041", customer: "Carlos Lima", amount: "R$ 38,90", status: "Aguardando", time: "19:04" },
  { orderNumber: "1040", customer: "Ana Pires", amount: "R$ 112,20", status: "Saiu para entrega", time: "18:58" },
  { orderNumber: "1039", customer: "Joao Costa", amount: "R$ 54,00", status: "Finalizado", time: "18:45" },
];

export function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState("overview");

  const activeSection = sidebarItems.find((item) => item.id === activeSectionId) ?? sidebarItems[0];

  const renderSectionContent = () => {
    if (activeSectionId === "products") {
      return <ProductsPage />;
    }

    if (activeSectionId !== "overview") {
      return (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Em breve</h2>
          </div>
          <p className={styles.comingSoonText}>Esta secao sera disponibilizada nas proximas etapas do painel.</p>
        </section>
      );
    }

    return (
      <>
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <StatCard key={stat.id} label={stat.label} value={stat.value} />
          ))}
        </div>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Pedidos recentes</h2>
          </div>
          <RecentOrdersTable orders={recentOrders} />
        </section>
      </>
    );
  };

  return (
    <main className={styles.page}>
      <Sidebar
        items={sidebarItems}
        activeItemId={activeSectionId}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectItem={setActiveSectionId}
      />

      <div className={styles.mainContent}>
        <TopHeader
          title={activeSection.label}
          storeName="Lanchonete Modelo"
          onToggleSidebar={() => setIsSidebarOpen((current) => !current)}
        />

        <section className={styles.contentArea}>
          {renderSectionContent()}
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
