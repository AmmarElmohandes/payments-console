// lib/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { createPayment, updatePaymentStatus, getPaymentByPublicId } from "./payments";

export async function createPaymentAction(amount: number, merchantOrderId: string) {
  const payment = createPayment(amount, merchantOrderId);
  revalidatePath("/");
  return payment.id;
}

export async function markPaymentAction(publicId: string|undefined, status: "paid" | "canceled") {
  const payment = getPaymentByPublicId(publicId);
  if (!payment) return null;
  updatePaymentStatus(payment.id, status);
  revalidatePath("/");
  revalidatePath(`/payments/${payment.id}`);
  return payment.id;
}
