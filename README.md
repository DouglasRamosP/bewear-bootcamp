# Bewear Bootcamp – Dev Guide

Guia rápido para rodar o projeto localmente com **Next.js**, **Drizzle ORM (Postgres)** e **Stripe**.

## Requisitos

* Node 18+
* Postgres (ex.: Neon ou local)
* Stripe (conta em modo **Test**)
* Stripe CLI instalado (`stripe --version`)

## 1) Ambiente (.env)

Crie um arquivo `.env` na raiz:

```env
# Banco de dados (ex.: Neon)
DATABASE_URL=postgresql://USER:PASS@HOST:PORT/DB?sslmode=require

# Stripe (chaves de teste)
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# URL pública do app (dev)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Preencha depois de rodar o `stripe listen`
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

> Sempre reinicie o servidor (`npm run dev`) após alterar o `.env`.

## 2) Instalar dependências

```bash
npm install
```

## 3) Drizzle (schema → banco)

Empurrar o schema para o banco:

```bash
npx drizzle-kit push
```

Outros comandos úteis (opcional):

```bash
# Gerar migrações a partir do schema
npx drizzle-kit generate

# Aplicar migrações geradas
npx drizzle-kit migrate

# Abrir o Drizzle Studio
npx drizzle-kit studio
```

Sugestão de scripts no `package.json`:

```json
{
  "scripts": {
    "db:push": "drizzle-kit push",
    "db:gen": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio",
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p 3000"
  }
}
```

## 4) Rodar o app

```bash
npm run dev
# http://localhost:3000
```

## 5) Stripe (CLI + Webhooks)

### 5.1 Login (uma vez)

```bash
stripe login
# autorize no navegador
```

> Se o login travar, você pode passar a Secret Key direto:
>
> ```bash
> stripe listen --api-key sk_test_xxx --forward-to http://localhost:3000/stripe/webhook
> ```

### 5.2 Ouvir webhooks

Em um **terminal separado** (deixe rodando):

```bash
stripe listen --forward-to http://localhost:3000/stripe/webhook
```

O CLI mostrará um **Signing secret** (`whsec_...`).
Coloque no `.env` em `STRIPE_WEBHOOK_SECRET` e **reinicie** o `npm run dev`.

### 5.3 Endpoint do webhook (Next.js – App Router)

Crie o arquivo em `src/app/stripe/webhook/route.ts`:

```ts
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text(); // corpo cru, essencial para validar a assinatura
  const sig = (await headers()).get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    // TODO: finalize o pedido aqui (ex.: usar session.client_reference_id como orderId)
  }

  return new Response("ok", { status: 200 });
}
```

> Se preferir usar `/api/webhooks/stripe`, ajuste:
>
> * CLI: `stripe listen --forward-to http://localhost:3000/api/webhooks/stripe`
> * Arquivo: `src/app/api/webhooks/stripe/route.ts`

### 5.4 Testar um evento

```bash
stripe trigger checkout.session.completed
```

## 6) Fluxo de desenvolvimento (3 terminais)

1. **Banco** (quando alterar schema):

   ```bash
   npm run db:push
   ```
2. **App**:

   ```bash
   npm run dev
   ```
3. **Stripe**:

   ```bash
   stripe listen --forward-to http://localhost:3000/stripe/webhook
   # e para testar:
   stripe trigger checkout.session.completed
   ```

## 7) Solução de problemas

* **`Module not found: Can't resolve 'stripe'`**
  Instale o SDK server-side:

  ```bash
  npm i stripe
  ```

* **Login do Stripe CLI travando**
  Use a secret diretamente:

  ```bash
  stripe listen --api-key sk_test_xxx --forward-to http://localhost:3000/stripe/webhook
  ```

* **Erro ao inserir pedido (user\_id inválido)**
  Garanta que `order.user_id` recebe o **UUID do usuário no banco** (não o ID string do provedor de auth). Busque o usuário na sua tabela `user` e use `user.id` (UUID) no insert.

* **Warn `LF will be replaced by CRLF` (Windows)**
  Apenas aviso de final de linha. Pode ignorar.

## 8) Git – .gitignore

Inclua (se ainda não tiver):

```
node_modules/
.next/
.env
.env.local
```

---
