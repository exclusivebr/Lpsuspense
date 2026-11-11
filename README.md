# Missão PMESP

Infoproduto para o concurso de **Soldado PM de 2ª Classe da PMESP** (edital DP-4/321/26): simulados no padrão Vunesp, guia do edital, plano de estudos e resultado final com projeção de nota.

| Página | O que faz |
| --- | --- |
| `/` | Página de vendas |
| `/obrigado?ref=…` | Após o pagamento: o aluno cria a senha (link de uso único) |
| `/entrar` | Login do aluno |
| `/area` | Área do aluno: simulados, resultado, resultado final, edital, o que estudar, plano, redação |
| `/admin` | Vendas, receita, alunos e liberação manual de acesso (senha `ADMIN_PASSWORD`) |

## Configurar para vender
1. Banco: Vercel Blob privado conectado ao projeto (cria `BLOB_READ_WRITE_TOKEN`).
2. Variáveis (veja `.env.example`): `MERCADOPAGO_ACCESS_TOKEN`, `PMESP_PRICE`, `ADMIN_PASSWORD`, `PMESP_SESSION_SECRET`.
3. **Apague `PMESP_DEMO`** antes de vender (com ela, sem checkout configurado, o acesso é liberado sem pagar).
4. Vendendo pela Hotmart/Kiwify: use `PMESP_CHECKOUT_URL` e libere cada venda em `/admin`.

## Conteúdo
- Edital, datas, requisitos e o que estudar: `lib/edital.ts` (confira no edital oficial antes de vender).
- Questões: `lib/questoes/*.ts`. Acrescente sempre no fim de cada arquivo; a cada 20/15/15/5/5 novas questões surge mais um simulado completo.
