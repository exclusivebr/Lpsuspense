# Arquivo 00X — Página de lista confidencial

Landing page de suspense para o lançamento da mentoria (o nome não aparece na página).
Coleta **nome, e-mail e WhatsApp**, salva no banco e redireciona o lead para o seu WhatsApp.
Os leads ficam num painel em **`/admin`** (protegido por senha), com busca, contagem e download em CSV.

Feito com Next.js 16 (App Router), pronto para a Vercel.

## Publicar na Vercel

1. Em vercel.com → **Add New → Project** → importe este repositório.
2. **Banco de dados:** no projeto, vá em **Storage → Create → Blob** (acesso **Private**) e conecte ao projeto.
   Isso cria sozinho a variável `BLOB_READ_WRITE_TOKEN`. Cada lead vira um arquivo JSON privado.
   (Alternativa: Upstash for Redis, que cria `KV_REST_API_URL` e `KV_REST_API_TOKEN`.)
3. Em **Settings → Environment Variables**, adicione:

| Variável | Exemplo | Para quê |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_LINK` | `https://chat.whatsapp.com/...` | Grupo do WhatsApp para onde o lead vai (padrão já definido no código) |
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

Sem banco configurado, em desenvolvimento os leads ficam só na memória (o admin avisa).

---

# Missão PMESP — infoproduto de simulados (rota `/pmesp`)

Produto pago para o concurso de **Soldado PM de 2ª Classe da PMESP** (edital DP-4/321/26, prova prevista para 28/02/2027).

## O que tem

| Página | O que faz |
| --- | --- |
| `/pmesp` | Página de vendas: edital, datas, histórico de 5 anos, distribuição da prova, oferta e FAQ |
| `/pmesp/obrigado?ref=…` | Depois do pagamento: o aluno cria a senha (link de primeiro acesso, uso único) |
| `/pmesp/entrar` | Login do aluno (e-mail + senha) |
| `/pmesp/area` | Painel: contagem regressiva, próximo passo, estatísticas |
| `/pmesp/area/simulados` | 3 simulados completos (60 q), 5 treinos por matéria e 1 turbo sorteado (30 q) |
| `/pmesp/area/resultado/:id` | Correção na hora, nota por matéria e comentário de cada questão |
| `/pmesp/area/desempenho` | **Resultado final**: junta todas as tentativas, projeta a nota (0–60), compara com o mínimo e a faixa de corte, lista pontos fracos, imprime em PDF |
| `/pmesp/area/edital` | Edital completo: datas, requisitos, etapas, TAF, composição da prova, histórico |
| `/pmesp/area/estudar` | O que estudar, por prioridade (o que mais caiu de 2022 a 2026) |
| `/pmesp/area/plano` | Plano semanal gerado automaticamente de hoje até a prova |
| `/pmesp/area/redacao` | Estrutura, checklist, temas e editor com contador de linhas |
| `/pmesp/admin` | Vendas, receita, alunos, liberação manual de acesso (usa a mesma senha do `/admin`) |

## Configurar para vender

1. Banco: o mesmo da landing (Vercel Blob privado ou Upstash Redis).
2. Variáveis: `MERCADOPAGO_ACCESS_TOKEN`, `PMESP_PRICE`, `PMESP_SESSION_SECRET` (veja `.env.example`).
   O webhook do Mercado Pago é configurado sozinho em cada pagamento (`/api/pmesp/webhook`).
3. Vendendo pela Hotmart/Kiwify? Use `PMESP_CHECKOUT_URL` e libere cada venda em `/pmesp/admin` (gera o link de primeiro acesso para mandar ao aluno).
4. Sem nenhum pagamento configurado, em desenvolvimento a compra é aprovada na hora (modo demonstração) para testar o fluxo.

## Atualizar o conteúdo

- **Edital, datas, requisitos, histórico, o que estudar:** `lib/pmesp/edital.ts`. ⚠️ Confira tudo no edital oficial antes de vender e sempre que sair retificação.
- **Questões:** `lib/pmesp/questoes/*.ts`. Para criar mais simulados completos, **acrescente questões no fim de cada arquivo** (20 de Português, 15 de Matemática, 15 de Conhecimentos Gerais, 5 de Informática e 5 de Adm. Pública por simulado): o 4º simulado aparece sozinho. Não reordene as questões existentes, pois os resultados já salvos dependem da ordem.
- As questões são inéditas, escritas no padrão Vunesp. A posição da resposta certa é balanceada automaticamente entre A e E.
