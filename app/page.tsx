// app/page.tsx
import Link from "next/link";
import { getPayments } from "@/lib/payments";

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string; status?: string };
}) {
  const { q, status } = await searchParams;
  const payments = getPayments()
    .filter((p) => (q ? p.merchantOrderId.includes(q) : true))
    .filter((p) => (status ? p.status === status : true));

  return (
    <main>
      <h1>Payments Console</h1>
      <form>
        <input name="q" placeholder="Search by Order ID" defaultValue={q} />
        <select name="status" defaultValue={status}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="canceled">Canceled</option>
        </select>
        <button type="submit">Filter</button>
      </form>

      <Link href="/new">+ New Payment</Link>

      {payments.length === 0 ? (
        <div className="empty">
          <p>No payments found.</p>
          <a href="/new">Create your first payment</a>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>System ID</th>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>
                  <Link href={`/payments/${p.id}`}>{p.id}</Link>
                </td>
                <td>{p.merchantOrderId}</td>
                <td>
                  {(p.amount / 100).toFixed(2)} {p.currency}
                </td>
                <td>{p.status}</td>
                <td>{p.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
