import styles from "./Sidebar.module.css";

type SidebarItem = {
  id: string;
  label: string;
};

type SidebarProps = {
  items: SidebarItem[];
  activeItemId: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (itemId: string) => void;
};

export function Sidebar({ items, activeItemId, isOpen, onClose, onSelectItem }: SidebarProps) {
  return (
    <>
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.brand}>Painel administrativo</div>
        <nav className={styles.nav} aria-label="Navegação principal do painel">
          {items.map((item) => {
            const isActive = item.id === activeItemId;

            return (
              <button
                key={item.id}
                type="button"
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                onClick={() => {
                  onSelectItem(item.id);
                  onClose();
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {isOpen && (
        <button
          type="button"
          className={styles.overlay}
          onClick={onClose}
          aria-label="Fechar menu lateral"
        />
      )}
    </>
  );
}

export default Sidebar;
