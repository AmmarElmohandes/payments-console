// app/pay/[publicId]/page.tsx
import { getPaymentByPublicId } from "@/lib/payments";
import { markPaymentAction } from "@/lib/actions";
import { redirect } from "next/navigation";

export default function PayPage({ params }: { params: { publicId: string } }) {
  const payment = getPaymentByPublicId(params.publicId);
  if (!payment) return <p>Invalid link</p>;

  async function markPaid() {
    "use server";
    await markPaymentAction(payment?.publicId, "paid");
    redirect(`/payments/${payment?.id}`);
  }

  async function markCanceled() {
    "use server";
    await markPaymentAction(payment?.publicId, "canceled");
    redirect(`/payments/${payment?.id}`);
  }

  return (
    <main>
      <h1>Pay Order {payment.merchantOrderId}</h1>
      <p>Amount: {(payment.amount / 100).toFixed(2)} {payment.currency}</p>
      <p>Status: {payment.status}</p>

      {payment.status === "pending" ? (
        <>
          <form action={markPaid}><button type="submit">Mark as Paid</button></form>
          <form action={markCanceled}><button type="submit">Cancel</button></form>
        </>
      ) : (
        <p>Payment already {payment.status}</p>
      )}
    </main>
  );
}
