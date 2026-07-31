import styles from "./StatCard.module.css";

type StatCardProps = {
  label: string;
  value: string;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.label}>{label}</p>
      <strong className={styles.value}>{value}</strong>
    </article>
  );
}

export default StatCard;
