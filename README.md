# Marcha no Tráfego — Página de lista secreta

Landing page de suspense (fundo preto) para o lançamento da mentoria **Marcha no Tráfego**.
Coleta **nome, e-mail e WhatsApp**, salva no banco e redireciona o lead para o seu WhatsApp.
Os leads ficam num painel em **`/admin`** (protegido por senha), com busca, contagem e download em CSV.

Feito com Next.js 16 (App Router), pronto para a Vercel.

## Publicar na Vercel

1. Em vercel.com → **Add New → Project** → importe este repositório.
2. **Banco de dados:** no projeto, vá em **Storage → Create Database → Upstash for Redis** (plano grátis) e conecte ao projeto.
   Isso cria sozinho as variáveis `KV_REST_API_URL` e `KV_REST_API_TOKEN`.
3. Em **Settings → Environment Variables**, adicione:

| Variável | Exemplo | Para quê |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5511999999999` | Seu WhatsApp (55 + DDD + número, só dígitos) |
| `ADMIN_PASSWORD` | uma senha forte | Senha do painel `/admin` |
| `NEXT_PUBLIC_WHATSAPP_MESSAGE` | `Oi! Sou {nome} e quero entrar na lista secreta 🔒` | (Opcional) Mensagem pronta. `{nome}` vira o primeiro nome |
| `NEXT_PUBLIC_LAUNCH_DATE` | `2026-11-20T20:00:00-03:00` | (Opcional) Liga a contagem regressiva |

4. Faça **Redeploy** depois de mudar variáveis (as `NEXT_PUBLIC_*` entram no build).

## Usar

- Página: `https://seu-dominio/` — use links com UTM nos stories, ex.: `?utm_source=instagram&utm_campaign=stories-dia3`. A origem aparece no admin.
- Admin: `https://seu-dominio/admin`

## Rodar local

```bash
cp .env.example .env.local   # preencha os valores
npm install
npm run dev
```

Sem as variáveis do Redis, em desenvolvimento os leads ficam só na memória (o admin avisa).
