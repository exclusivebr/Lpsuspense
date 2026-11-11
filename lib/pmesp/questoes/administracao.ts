import { q } from "./tipos";

const a = (...x: Parameters<typeof q> extends [unknown, ...infer R] ? R : never) => q("administracao", ...x);

export const ADMINISTRACAO = [
  /* ======================= Simulado 1 ======================= */
  a("a01", "Princípios da Administração Pública", "De acordo com o caput do art. 37 da Constituição Federal, NÃO é um princípio expresso da Administração Pública a", [
    "legalidade.", "impessoalidade.", "moralidade.", "razoabilidade.", "eficiência.",
  ], "D", "O art. 37 traz expressamente o LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência. A razoabilidade é um princípio implícito, reconhecido pela doutrina e pela jurisprudência."),
  a("a02", "Servidores públicos — concurso", "Segundo a Constituição Federal, o prazo de validade de um concurso público é de", [
    "até 1 ano, improrrogável.", "até 2 anos, prorrogável uma vez, por igual período.", "exatamente 4 anos.", "até 5 anos, prorrogável duas vezes.", "prazo indeterminado.",
  ], "B", "Art. 37, III: o prazo de validade do concurso será de até dois anos, prorrogável uma vez, por igual período."),
  a("a03", "Princípios da Administração Pública", "Um prefeito que coloca seu nome e sua foto em placas de obras públicas para se promover pessoalmente fere diretamente o princípio da", [
    "eficiência.", "impessoalidade.", "legalidade.", "continuidade.", "autotutela.",
  ], "B", "O art. 37, § 1º, proíbe que a publicidade oficial contenha nomes, símbolos ou imagens que caracterizem promoção pessoal de autoridades. Isso decorre da impessoalidade."),
  a("a04", "Segurança pública (art. 144)", "De acordo com o art. 144 da Constituição Federal, cabem às polícias militares", [
    "a apuração das infrações penais, exceto as militares.", "a polícia ostensiva e a preservação da ordem pública.", "o patrulhamento ostensivo das rodovias federais.", "a defesa das fronteiras do país.", "o julgamento dos crimes militares.",
  ], "B", "Art. 144, § 5º: às polícias militares cabem a polícia ostensiva e a preservação da ordem pública. A apuração de infrações (polícia judiciária) cabe às polícias civis; as rodovias federais, à PRF."),
  a("a05", "Segurança pública (art. 144)", "Segundo a Constituição Federal, as polícias militares e os corpos de bombeiros militares, forças auxiliares e reserva do Exército, subordinam-se", [
    "ao Presidente da República.", "ao Ministro da Defesa.", "aos Governadores dos Estados, do Distrito Federal e dos Territórios.", "aos Prefeitos Municipais.", "ao Comandante do Exército.",
  ], "C", "Art. 144, § 6º: são forças auxiliares e reserva do Exército, mas subordinam-se aos Governadores."),
  /* ======================= Simulado 2 ======================= */
  a("a06", "Direitos fundamentais (art. 5º)", "Segundo a Constituição Federal, a casa é asilo inviolável do indivíduo, e ninguém pode nela entrar sem consentimento do morador, SALVO", [
    "a qualquer hora, por ordem de qualquer autoridade policial.", "em caso de flagrante delito ou desastre, para prestar socorro, ou, durante o dia, por determinação judicial.", "somente com ordem judicial, a qualquer hora.", "durante a noite, por determinação judicial.", "em nenhuma hipótese.",
  ], "B", "Art. 5º, XI. Atenção: flagrante, desastre e socorro permitem a entrada a qualquer hora; a ordem judicial só pode ser cumprida durante o dia."),
  a("a07", "Direitos fundamentais (art. 5º)", "De acordo com a Constituição Federal, ressalvados os casos de transgressão militar ou crime propriamente militar, ninguém será preso senão", [
    "por determinação do delegado de polícia.", "em flagrante delito ou por ordem escrita e fundamentada de autoridade judiciária competente.", "após o trânsito em julgado da sentença, em qualquer caso.", "por ordem verbal de qualquer autoridade.", "com autorização do Ministério Público.",
  ], "B", "Art. 5º, LXI. A prisão exige flagrante delito ou ordem escrita e fundamentada do juiz competente."),
  a("a08", "Poderes administrativos", "O poder de que dispõe a Administração para condicionar e restringir o uso e o gozo de bens, atividades e direitos individuais em benefício da coletividade é o poder", [
    "hierárquico.", "disciplinar.", "regulamentar.", "de polícia.", "discricionário.",
  ], "D", "O poder de polícia limita a liberdade individual em prol do interesse público. Exemplos: fiscalização sanitária, de trânsito e licenças. O poder disciplinar pune servidores; o hierárquico organiza a estrutura."),
  a("a09", "Atos administrativos", "O atributo que permite à Administração executar seus atos diretamente, sem necessidade de autorização prévia do Poder Judiciário, é a", [
    "presunção de legitimidade.", "imperatividade.", "autoexecutoriedade.", "tipicidade.", "motivação.",
  ], "C", "Autoexecutoriedade: a Administração executa por seus próprios meios (ex.: remoção de veículo estacionado irregularmente). Imperatividade é impor obrigações a terceiros; a presunção de legitimidade faz o ato valer até prova em contrário."),
  a("a10", "Princípios da Administração Pública", "A divulgação oficial dos atos administrativos para conhecimento do público e início de seus efeitos externos está ligada ao princípio da", [
    "publicidade.", "eficiência.", "moralidade.", "legalidade.", "hierarquia.",
  ], "A", "A publicidade garante transparência e controle pela sociedade. A regra é divulgar; o sigilo é exceção, admitida em casos previstos em lei."),
  /* ======================= Simulado 3 ======================= */
  a("a11", "Servidores públicos — estabilidade", "De acordo com o art. 41 da Constituição Federal, são estáveis os servidores nomeados para cargo de provimento efetivo, em virtude de concurso público, após", [
    "1 ano de efetivo exercício.", "2 anos de efetivo exercício.", "3 anos de efetivo exercício.", "5 anos de efetivo exercício.", "a posse, imediatamente.",
  ], "C", "O prazo da estabilidade é de 3 anos de efetivo exercício, com avaliação especial de desempenho (EC 19/1998)."),
  a("a12", "Servidores públicos — acumulação", "A Constituição Federal veda a acumulação remunerada de cargos públicos, mas a permite, quando houver compatibilidade de horários, no caso de", [
    "dois cargos de policial militar.", "dois cargos de professor.", "um cargo de juiz e outro de delegado.", "dois cargos administrativos quaisquer.", "três cargos de profissionais de saúde.",
  ], "B", "Art. 37, XVI: é permitido acumular dois cargos de professor; um de professor com outro técnico ou científico; ou dois de profissionais de saúde com profissões regulamentadas. Nunca três."),
  a("a13", "Lei de Acesso à Informação", "Segundo a Lei de Acesso à Informação (Lei nº 12.527/2011), na Administração Pública", [
    "o sigilo é a regra, e a publicidade, a exceção.", "a publicidade é a regra, e o sigilo, a exceção.", "apenas jornalistas podem pedir informações.", "o cidadão precisa justificar o motivo do pedido.", "nenhuma informação pode ser classificada como sigilosa.",
  ], "B", "A LAI estabelece a publicidade como preceito geral e o sigilo como exceção. É vedado exigir os motivos do pedido de informação de interesse público."),
  a("a14", "Improbidade administrativa", "Após as alterações promovidas pela Lei nº 14.230/2021 na Lei de Improbidade Administrativa (Lei nº 8.429/1992), para a configuração do ato de improbidade, exige-se", [
    "apenas culpa leve.", "conduta dolosa.", "somente prejuízo financeiro, independentemente de intenção.", "condenação criminal prévia.", "denúncia anônima.",
  ], "B", "Com a reforma de 2021, só há improbidade com dolo, ou seja, vontade livre e consciente de alcançar o resultado ilícito. A modalidade culposa foi extinta."),
  a("a15", "Militares dos Estados", "Conforme o art. 42 da Constituição Federal, os membros das Polícias Militares e dos Corpos de Bombeiros Militares são militares dos Estados, e suas instituições são organizadas com base na", [
    "eficiência e na rentabilidade.", "hierarquia e na disciplina.", "livre associação sindical.", "eleição dos comandantes.", "autonomia financeira.",
  ], "B", "Hierarquia e disciplina são os pilares das instituições militares (art. 42, caput). Aos militares são proibidas a sindicalização e a greve (art. 142, § 3º, IV, aplicado aos militares estaduais)."),
];
