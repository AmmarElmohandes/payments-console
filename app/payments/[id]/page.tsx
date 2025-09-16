// app/payments/[id]/page.tsx
import { getPayment } from "@/lib/payments";
import Link from "next/link";

export default function PaymentDetails({ params }: { params: { id: string } }) {
  const payment = getPayment(params.id);
  if (!payment) return <p>Payment not found</p>;

  return (
    <main>
      <h1>Payment Details</h1>
      <p><b>ID:</b> {payment.id}</p>
      <p><b>Order ID:</b> {payment.merchantOrderId}</p>
      <p><b>Amount:</b> {(payment.amount / 100).toFixed(2)} {payment.currency}</p>
      <p><b>Status:</b> {payment.status}</p>
      <p><b>Created:</b> {payment.createdAt}</p>
      <p><b>Updated:</b> {payment.updatedAt}</p>

      <p>
        Payment Link: <Link href={`/pay/${payment.publicId}`}>{`/pay/${payment.publicId}`}</Link>
      </p>
    </main>
  );
}
