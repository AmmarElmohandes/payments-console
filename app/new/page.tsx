// app/new/page.tsx
import { createPaymentAction } from "@/lib/actions";
import { redirect } from "next/navigation";

export default function NewPayment() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const amount = Number(formData.get("amount")) * 100;
    const merchantOrderId = String(formData.get("merchantOrderId"));
    const id = await createPaymentAction(amount, merchantOrderId);
    redirect(`/payments/${id}`);
  }

  return (
    <main>
      <h1>New Payment</h1>
      <form action={handleSubmit}>
        <label>
          Amount (EGP)
          <input type="number" name="amount" step="0.01" required />
        </label>
        <label>
          Merchant Order ID
          <input type="text" name="merchantOrderId" required />
        </label>
        <button type="submit">Create</button>
      </form>
    </main>
  );
}
