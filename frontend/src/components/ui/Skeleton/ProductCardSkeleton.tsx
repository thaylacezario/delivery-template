import styles from "./Skeleton.module.css";

export function ProductCardSkeleton() {
    return (
        <div className={styles.card} aria-hidden="true">
            <div className={`${styles.skeleton} ${styles.cardImage}`} />
            <div className={styles.cardContent}>
                <div className={`${styles.skeleton} ${styles.cardTitle}`} />
                <div className={`${styles.skeleton} ${styles.cardDescription}`} />
                <div className={`${styles.skeleton} ${styles.cardDescriptionShort}`} />
                <div className={styles.cardFooter}>
                    <div className={`${styles.skeleton} ${styles.cardPrice}`} />
                    <div className={`${styles.skeleton} ${styles.cardButton}`} />
                </div>
            </div>
        </div>
    );
}

export default ProductCardSkeleton;