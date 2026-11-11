/**
 * Dados do concurso de Soldado PM de 2ª Classe (Aluno-Soldado) da PMESP.
 *
 * ⚠️ Antes de vender, confira cada número no edital oficial (Diário Oficial / vunesp.com.br /
 * concursos.policiamilitar.sp.gov.br). Tudo que aparece na área do aluno sai deste arquivo:
 * se a banca publicar retificação, é só ajustar aqui e fazer novo deploy.
 */

export const ATUALIZADO_EM = "11/11/2026";

export const EDITAL_ATUAL = {
  numero: "DP-4/321/26",
  cargo: "Soldado PM de 2ª Classe (Aluno-Soldado PM)",
  banca: "Fundação VUNESP",
  publicacao: "05/11/2026 (Diário Oficial do Estado de SP)",
  vagas: "2.000 vagas (ambos os sexos)",
  salario: "R$ 5.482,51 (inicial durante o curso de formação)",
  taxa: "R$ 110,00",
  escolaridade: "Ensino médio completo",
  /** Datas em ISO para a contagem regressiva. */
  inscricaoInicio: "2026-11-09T10:00:00-03:00",
  inscricaoFim: "2026-12-22T23:59:00-03:00",
  pagamentoTaxaAte: "2026-12-23T23:59:00-03:00",
  dataProva: "2027-02-28T13:00:00-03:00",
  provaTurno: "Tarde (horário exato no Edital de Convocação)",
  cidadesProva: "51 cidades: 37 no Estado de SP e 14 capitais de outros estados",
  ondeInscrever: "www.vunesp.com.br (somente pela internet)",
  linkOficial: "https://concursos.policiamilitar.sp.gov.br/",
};

export const CRONOGRAMA: { data: string; evento: string; status?: "confirmado" | "previsto" }[] = [
  { data: "05/11/2026", evento: "Publicação do edital DP-4/321/26", status: "confirmado" },
  { data: "09/11/2026 (10h)", evento: "Abertura das inscrições no site da Vunesp", status: "confirmado" },
  { data: "22/12/2026 (23h59)", evento: "Encerramento das inscrições", status: "confirmado" },
  { data: "23/12/2026", evento: "Último dia para pagar a taxa de R$ 110,00", status: "confirmado" },
  { data: "Fevereiro/2027", evento: "Edital de convocação com local e horário (consulte a área do candidato)", status: "previsto" },
  { data: "28/02/2027 (tarde)", evento: "Prova objetiva + redação (mesmo dia)", status: "previsto" },
  { data: "1–2 dias após a prova", evento: "Gabarito preliminar da prova objetiva", status: "previsto" },
  { data: "Após o resultado", evento: "TAF, exames de saúde, psicológico, investigação social e documentos", status: "previsto" },
];

export const REQUISITOS = [
  "Ser brasileiro(a)",
  "Ter entre 17 e 30 anos (confira no edital a data-base e as exceções para quem já é militar)",
  "Ensino médio completo até a data da matrícula no curso",
  "Altura mínima: 1,60 m (homens) e 1,55 m (mulheres)",
  "Estar em dia com as obrigações eleitorais e militares (homens)",
  "Não ter antecedentes criminais e ter conduta compatível com a função policial",
  "Ter aptidão física, de saúde e psicológica comprovada nas etapas do concurso",
];

export const ETAPAS = [
  {
    nome: "1. Prova objetiva",
    detalhe:
      "60 questões de múltipla escolha (5 alternativas), valendo 0 a 60 pontos. É preciso fazer no mínimo 30 pontos e ficar dentro da nota de classificação para ter a redação corrigida.",
    eliminatoria: true,
  },
  {
    nome: "2. Prova dissertativa (redação)",
    detalhe:
      "Texto dissertativo-argumentativo em prosa, até 30 linhas, avaliado de 0 a 40 pontos (mínimo de 20). Aplicada no mesmo dia da objetiva: o tempo total é de 5 horas.",
    eliminatoria: true,
  },
  {
    nome: "3. Teste de Aptidão Física (TAF)",
    detalhe: "Barra fixa, abdominal tipo remador, corrida de 50 metros e corrida de resistência. Índices diferentes por sexo e idade.",
    eliminatoria: true,
  },
  { nome: "4. Exames de saúde", detalhe: "Exames médicos, odontológicos e laboratoriais (inclusive toxicológico).", eliminatoria: true },
  { nome: "5. Exames psicológicos", detalhe: "Testes de personalidade, atenção e raciocínio + entrevista.", eliminatoria: true },
  {
    nome: "6. Investigação social",
    detalhe: "Análise da vida pregressa e da conduta (FACSRI): preencha com total sinceridade.",
    eliminatoria: true,
  },
  { nome: "7. Análise de documentos", detalhe: "Comprovação dos requisitos antes da matrícula no curso de formação.", eliminatoria: true },
];

export type DisciplinaId = "portugues" | "matematica" | "gerais" | "informatica" | "administracao";

export const DISCIPLINAS: Record<DisciplinaId, { nome: string; curto: string; questoes: number; cor: string }> = {
  portugues: { nome: "Língua Portuguesa", curto: "Português", questoes: 20, cor: "#3b82f6" },
  matematica: { nome: "Matemática", curto: "Matemática", questoes: 15, cor: "#f59e0b" },
  gerais: { nome: "Conhecimentos Gerais", curto: "Conh. Gerais", questoes: 15, cor: "#10b981" },
  informatica: { nome: "Noções Básicas de Informática", curto: "Informática", questoes: 5, cor: "#a855f7" },
  administracao: { nome: "Noções de Administração Pública", curto: "Adm. Pública", questoes: 5, cor: "#ef4444" },
};

export const ORDEM_DISCIPLINAS: DisciplinaId[] = ["portugues", "matematica", "gerais", "informatica", "administracao"];

export const NOTA = {
  minimaObjetiva: 30,
  /** Faixa estimada de acertos para ter a redação corrigida (ampla concorrência). Não é número oficial. */
  corteEstimado: { min: 34, max: 38 },
  redacaoMax: 40,
  redacaoMin: 20,
};

/** Histórico dos últimos 5 anos (2022–2026). Números de inscritos vêm de levantamentos públicos de terceiros. */
export const HISTORICO: {
  ano: string;
  edital: string;
  banca: string;
  vagas: string;
  prova: string;
  inscritos?: string;
  obs?: string;
}[] = [
  {
    ano: "2026 (2º)",
    edital: "DP-4/321/26",
    banca: "Vunesp",
    vagas: "2.000",
    prova: "28/02/2027 (prevista)",
    obs: "Edital aberto — é o foco deste material",
  },
  { ano: "2026 (1º)", edital: "DP-3/321/26", banca: "Vunesp", vagas: "2.000", prova: "20/09/2026", obs: "Inscrições de 15/06 a 21/08/2026" },
  { ano: "2025", edital: "DP-2/321/25", banca: "Vunesp", vagas: "2.200", prova: "30/11/2025", inscritos: "≈ 59,6 mil" },
  {
    ano: "2024/2025",
    edital: "DP-3/321/24 e DP-1/321/25",
    banca: "FGV",
    vagas: "—",
    prova: "2025",
    obs: "Ciclos organizados pela FGV: mesmas disciplinas, estilo de questão diferente",
  },
  { ano: "2024", edital: "PMES2304", banca: "Vunesp", vagas: "2.700", prova: "24/03/2024" },
  { ano: "2023", edital: "PMES2203", banca: "Vunesp", vagas: "2.700", prova: "12/02/2023 e 17/09/2023", inscritos: "≈ 56 mil e ≈ 76 mil" },
  { ano: "2022", edital: "PMES2104", banca: "Vunesp", vagas: "2.700", prova: "06/02/2022" },
];

export type Prioridade = "altíssima" | "alta" | "média" | "baixa";

/** O que estudar: conteúdo programático + o que mais caiu nas provas de 2022 a 2026. */
export const CONTEUDO: Record<
  DisciplinaId,
  { resumo: string; topicos: { nome: string; prioridade: Prioridade; dica: string }[] }
> = {
  portugues: {
    resumo:
      "A disciplina que mais pesa (20 de 60 questões). A Vunesp traz 1 ou 2 textos longos (crônica, reportagem, tirinha) e tira deles quase todas as questões, inclusive as de gramática.",
    topicos: [
      { nome: "Leitura e interpretação de textos", prioridade: "altíssima", dica: "Cerca de 1 em cada 4 questões. Volte ao texto sempre: a resposta está nele, não na sua opinião." },
      { nome: "Sinônimos, antônimos e sentido no contexto", prioridade: "altíssima", dica: "Substitua a palavra pela alternativa e releia a frase inteira." },
      { nome: "Pontuação (vírgula)", prioridade: "alta", dica: "Nunca separe sujeito do verbo nem verbo do complemento." },
      { nome: "Concordância verbal e nominal", prioridade: "alta", dica: "Ache o sujeito de verdade, principalmente quando ele vem depois do verbo." },
      { nome: "Regência verbal e nominal", prioridade: "alta", dica: "Assistir (ver) pede “a”; preferir “uma coisa a outra”; obedecer “a”." },
      { nome: "Crase", prioridade: "alta", dica: "Troque por palavra masculina: se virar “ao”, tem crase." },
      { nome: "Colocação pronominal", prioridade: "média", dica: "Palavra negativa, pronome relativo e advérbio atraem o pronome (próclise)." },
      { nome: "Classes de palavras e seu emprego", prioridade: "média", dica: "Conjunções: saiba o sentido (mas = oposição; pois = explicação; embora = concessão)." },
      { nome: "Tempos e modos verbais", prioridade: "média", dica: "Futuro do pretérito = hipótese; subjuntivo = dúvida/desejo." },
      { nome: "Ortografia e acentuação", prioridade: "baixa", dica: "Regras do Novo Acordo: “ideia”, “heroico”, “voo” sem acento." },
    ],
  },
  matematica: {
    resumo:
      "15 questões contextualizadas (situações do dia a dia). Quem domina porcentagem, razão/proporção e regra de três garante quase metade da prova de matemática.",
    topicos: [
      { nome: "Porcentagem e aumentos/descontos sucessivos", prioridade: "altíssima", dica: "Aumento de 20% = ×1,2; desconto de 15% = ×0,85." },
      { nome: "Razão, proporção e divisão proporcional", prioridade: "altíssima", dica: "Divida o total pela soma das partes e multiplique." },
      { nome: "Regra de três simples e composta", prioridade: "alta", dica: "Marque as grandezas direta e inversamente proporcionais com setas." },
      { nome: "Problemas com as 4 operações, frações e decimais", prioridade: "alta", dica: "“Do restante” significa que a fração é sobre o que sobrou." },
      { nome: "MMC e MDC", prioridade: "média", dica: "“Ao mesmo tempo de novo” = MMC; “maior tamanho possível” = MDC." },
      { nome: "Equações de 1º e 2º grau e sistemas", prioridade: "alta", dica: "Monte a equação com as palavras do enunciado antes de calcular." },
      { nome: "Geometria plana: áreas, perímetros e Pitágoras", prioridade: "alta", dica: "Triângulos 3-4-5 e 6-8-10 aparecem muito." },
      { nome: "Sistema de medidas e volumes", prioridade: "média", dica: "1 m³ = 1.000 litros; 1 dm³ = 1 litro." },
      { nome: "Média aritmética, tabelas e gráficos", prioridade: "média", dica: "Soma total = média × quantidade." },
      { nome: "Juros simples", prioridade: "baixa", dica: "J = C · i · t (taxa e tempo na mesma unidade)." },
    ],
  },
  gerais: {
    resumo:
      "15 questões de História, Geografia e Atualidades. As de Atualidades cobram fatos dos meses anteriores ao edital: acompanhe notícias de política, economia, meio ambiente e segurança pública.",
    topicos: [
      { nome: "Atualidades (Brasil e mundo)", prioridade: "altíssima", dica: "Leia um portal de notícias por dia a partir de maio/2026 e anote: fato, local, data, por que importa." },
      { nome: "História do Brasil: República (Vargas, Ditadura, Redemocratização)", prioridade: "alta", dica: "Linha do tempo de 1889 a 1988." },
      { nome: "História do Brasil: Colônia e Império", prioridade: "média", dica: "Ciclos econômicos (açúcar, ouro, café) e Independência." },
      { nome: "História de São Paulo", prioridade: "alta", dica: "Bandeirantes, café, imigração, Revolução de 1932 e a criação da Força Pública (1831)." },
      { nome: "Geografia do Brasil: regiões, clima, biomas, população", prioridade: "alta", dica: "Biomas e seus problemas ambientais caem muito." },
      { nome: "Geografia de São Paulo", prioridade: "média", dica: "Rios Tietê e Paraná, regiões metropolitanas, economia paulista." },
      { nome: "Meio ambiente e sustentabilidade", prioridade: "média", dica: "COP30 em Belém (2025), desmatamento, queimadas, ODS da ONU." },
    ],
  },
  informatica: {
    resumo: "Só 5 questões, mas são as mais fáceis de garantir: o conteúdo é curto e se repete muito.",
    topicos: [
      { nome: "Windows 10/11: arquivos, pastas e atalhos", prioridade: "altíssima", dica: "Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+Z, Win+E, Win+L, Shift+Delete." },
      { nome: "Microsoft Word (formatação e atalhos)", prioridade: "alta", dica: "Ctrl+N (negrito), Ctrl+I (itálico), Ctrl+S (sublinhado) na versão em português." },
      { nome: "Microsoft Excel: fórmulas básicas", prioridade: "alta", dica: "=SOMA, =MÉDIA, =MÁXIMO, =SE e referência absoluta com $." },
      { nome: "Internet, navegadores e e-mail", prioridade: "média", dica: "CC x CCO, aba anônima, favoritos, histórico." },
      { nome: "Segurança da informação", prioridade: "média", dica: "Phishing, malware, ransomware, senhas fortes e autenticação em dois fatores." },
    ],
  },
  administracao: {
    resumo: "5 questões, quase sempre de letra da lei. Leia os artigos várias vezes: é decoreba que dá ponto.",
    topicos: [
      { nome: "Princípios da Administração Pública (CF, art. 37 — LIMPE)", prioridade: "altíssima", dica: "Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência." },
      { nome: "Servidores públicos e acesso a cargos (CF, arts. 37 a 41)", prioridade: "alta", dica: "Concurso válido por até 2 anos, prorrogável uma vez por igual período." },
      { nome: "Segurança pública (CF, art. 144)", prioridade: "alta", dica: "PM: polícia ostensiva e preservação da ordem pública; subordinada ao Governador." },
      { nome: "Direitos e garantias fundamentais (CF, art. 5º)", prioridade: "média", dica: "Casa é asilo inviolável; prisão só em flagrante ou por ordem judicial." },
      { nome: "Atos administrativos e poderes da Administração", prioridade: "média", dica: "Poder de polícia limita a liberdade individual em prol do interesse público." },
      { nome: "Improbidade administrativa e Lei de Acesso à Informação", prioridade: "baixa", dica: "Lei 8.429/92 (alterada em 2021) e Lei 12.527/2011." },
    ],
  },
};

export const TEMAS_REDACAO = [
  "O papel da tecnologia na prevenção de crimes nas cidades brasileiras",
  "Os desafios do combate aos golpes digitais no Brasil",
  "A violência contra a mulher e os caminhos para enfrentá-la",
  "Saúde mental dos profissionais de segurança pública",
  "O uso de câmeras corporais pelas polícias: transparência e proteção",
  "Juventude, educação e prevenção da criminalidade",
  "Fake news e seus impactos na sociedade",
  "Mobilidade urbana e segurança no trânsito",
];

export const CRITERIOS_REDACAO = [
  { nome: "Tema e gênero", detalhe: "Fugir do tema ou não fazer dissertação zera a redação. Releia a proposta antes de escrever." },
  { nome: "Coerência e argumentação", detalhe: "Tese clara na introdução, 2 argumentos com exemplos e uma conclusão que retoma a tese." },
  { nome: "Coesão", detalhe: "Use conectivos variados: além disso, entretanto, portanto, dessa forma, nesse sentido." },
  { nome: "Norma-padrão", detalhe: "Concordância, crase, pontuação e ortografia. Letra legível e sem rasuras." },
  { nome: "Extensão", detalhe: "Entre 20 e 30 linhas. Texto muito curto perde pontos ou pode ser desconsiderado." },
];
