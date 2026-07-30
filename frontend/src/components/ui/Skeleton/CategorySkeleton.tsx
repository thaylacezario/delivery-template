import styles from "./Skeleton.module.css";

export function CategorySkeleton() {
    return (
        <div style={{ display: "flex", gap: "8px", padding: "0 16px" }} aria-hidden="true">
            <div className={`${styles.skeleton} ${styles.category}`} />
            <div className={`${styles.skeleton} ${styles.category}`} />
            <div className={`${styles.skeleton} ${styles.category}`} />
            <div className={`${styles.skeleton} ${styles.category}`} />
        </div>
    );
}

export default CategorySkeleton;