"use client";

export default function PaymentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <h1>Payment Error</h1>
      <p>We couldn’t load this payment: {error.message}</p>
      <button onClick={() => reset()}>Retry</button>
    </main>
  );
}
