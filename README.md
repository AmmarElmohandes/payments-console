## 🚀 Setup
## Clone and install

git clone https://github.com/yourname/fake-payments-console.git

cd payments-console

npm install


## Project structure
app/&nbsp;&nbsp;&nbsp;# Next.js App Router\
  page.tsx  &nbsp;&nbsp; # Home (list + search + filter)\
  new/page.tsx &nbsp; # New Payment form\
  payments/[id]/page.tsx &nbsp;  # Payment details\
  pay/[publicId]/page.tsx &nbsp; # Customer-facing link\
  loading.tsx  &nbsp;        # Global loading state\
  error.tsx     &nbsp;       # Global error state\
lib/\
  payments.ts    &nbsp;      # In-memory or JSON file storage\
payments.json    &nbsp;      # Optional JSON data store



## Development server
npm run dev


## ▶️Run

Home /

Table of payments (System ID, Merchant Order ID, Amount, Status, Created)

Search by merchantOrderId

Filter by status (pending | paid | canceled)

Loading, empty, and error states

New Payment /new

Form with amount, currency (EGP), and merchantOrderId

Creates a payment (status = pending)

Redirects to payment details

Payment Details /payments/[id]

Shows all fields, timestamps, and copyable Payment Link

Displays activity (status updates)

Payment Link /pay/[publicId]

Customer chooses Paid or Cancel

Updates status and redirects back

## ✅ Finished Parts

 Next.js App Router + TypeScript

 Server Actions for create/mark paid/cancel

 revalidatePath on mutations

 In-memory or JSON-file data storage

 Home: list, search, filter, empty state

 Loading state (loading.tsx)

 Error state (error.tsx)

 Basic CSS (no UI kit)

 ## ✂️ Cut Parts (not implemented)

Idempotency keys

HMAC signatures / secure tokens

Webhooks

Authentication / multi-merchant support

Styling beyond basic HTML + CSS