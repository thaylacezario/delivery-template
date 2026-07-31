import styles from "./RecentOrdersTable.module.css";

type RecentOrder = {
  orderNumber: string;
  customer: string;
  amount: string;
  status: string;
  time: string;
};

type RecentOrdersTableProps = {
  orders: RecentOrder[];
};

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Horario</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderNumber}>
              <td>#{order.orderNumber}</td>
              <td>{order.customer}</td>
              <td>{order.amount}</td>
              <td>
                <span className={styles.status}>{order.status}</span>
              </td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentOrdersTable;
