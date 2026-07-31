import styles from "./TopHeader.module.css";

type TopHeaderProps = {
  title: string;
  storeName: string;
  onToggleSidebar: () => void;
};

export function TopHeader({ title, storeName, onToggleSidebar }: TopHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.leftBlock}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={onToggleSidebar}
          aria-label="Abrir menu lateral"
        >
          ☰
        </button>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.rightBlock}>
        <span className={styles.storeName}>{storeName}</span>
        <button type="button" className={styles.logoutButton}>Sair</button>
      </div>
    </header>
  );
}

export default TopHeader;
