## 🏗️ Design Overview

## State Management
Payments are kept in-memory (with optional JSON file persistence).\
Status changes are applied synchronously through Server Actions.\
Loading, empty, and error states are handled via loading.tsx and error.tsx.

## Data Fetch
All pages fetch data server-side via async functions in lib/payments.ts.\
No client-side fetching — components render fully on the server.

## Revalidation
After any write (create, mark paid, cancel), the app calls
revalidatePath("/") and revalidatePath("/payments/[id]")
to keep lists and details in sync without manual refresh.