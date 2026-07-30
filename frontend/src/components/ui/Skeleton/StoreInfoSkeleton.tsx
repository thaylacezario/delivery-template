import styles from "./Skeleton.module.css";

export function StoreInfoSkeleton() {
    return (
        <div style={{ padding: "0 16px 12px", maxWidth: "1200px", margin: "0 auto" }} aria-hidden="true">
            <div className={`${styles.skeleton} ${styles.storeInfo}`} />
        </div>
    );
}

export default StoreInfoSkeleton;