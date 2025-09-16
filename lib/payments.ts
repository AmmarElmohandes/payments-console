// lib/payments.ts
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type PaymentStatus = "pending" | "paid" | "canceled";

export type Payment = {
  id: string; // pay_xxx
  publicId: string;
  amount: number;
  currency: "EGP";
  status: PaymentStatus;
  merchantOrderId: string;
  createdAt: string;
  updatedAt: string;
};

const file = path.join(process.cwd(), "payments.json");

function load(): Payment[] {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function save(payments: Payment[]) {
  fs.writeFileSync(file, JSON.stringify(payments, null, 2));
}

export function getPayments(): Payment[] {
  return load();
}

export function getPayment(id: string) {
  return load().find(p => p.id === id);
}

export function getPaymentByPublicId(publicId: string|undefined) {
  return load().find(p => p.publicId === publicId);
}

export function createPayment(amount: number, merchantOrderId: string): Payment {
  const payments = load();
  const now = new Date().toISOString();
  const payment: Payment = {
    id: `pay_${randomUUID()}`,
    publicId: randomUUID(),
    amount,
    currency: "EGP",
    status: "pending",
    merchantOrderId,
    createdAt: now,
    updatedAt: now,
  };
  payments.push(payment);
  save(payments);
  return payment;
}

export function updatePaymentStatus(id: string, status: PaymentStatus) {
  const payments = load();
  const p = payments.find(x => x.id === id);
  if (p) {
    p.status = status;
    p.updatedAt = new Date().toISOString();
    save(payments);
  }
  return p;
}
