import { q } from "./tipos";

const m = (...a: Parameters<typeof q> extends [unknown, ...infer R] ? R : never) => q("matematica", ...a);

export const MATEMATICA = [
  /* ======================= Simulado 1 ======================= */
  m("m01", "Porcentagem", "Uma bota operacional custava R$ 240,00 e recebeu um desconto de 15%. O novo preço da bota é", [
    "R$ 225,00.", "R$ 216,00.", "R$ 210,00.", "R$ 204,00.", "R$ 196,00.",
  ], "D", "Desconto de 15% → paga-se 85%: 240 × 0,85 = 204. Ou: 15% de 240 = 36; 240 − 36 = 204."),
  m("m02", "Porcentagem (aumentos sucessivos)", "Um salário recebeu dois aumentos sucessivos de 10%. O aumento total, em relação ao salário inicial, foi de", [
    "20%.", "21%.", "22%.", "19%.", "11%.",
  ], "B", "Aumentos sucessivos se multiplicam: 1,10 × 1,10 = 1,21 → aumento de 21%, e não de 20%."),
  m("m03", "Divisão proporcional", "Uma gratificação de R$ 3.600,00 será dividida entre três policiais em partes diretamente proporcionais a 2, 3 e 4. A maior parte será de", [
    "R$ 1.200,00.", "R$ 1.400,00.", "R$ 1.600,00.", "R$ 1.800,00.", "R$ 2.000,00.",
  ], "C", "Soma das partes: 2 + 3 + 4 = 9. Cada parte vale 3.600 ÷ 9 = 400. Maior parte: 4 × 400 = 1.600."),
  m("m04", "Regra de três simples", "Em uma semana, 6 viaturas consomem 900 litros de combustível. Mantido o mesmo consumo por viatura, 10 viaturas consumirão, na mesma semana,", [
    "1.200 litros.", "1.350 litros.", "1.400 litros.", "1.500 litros.", "1.800 litros.",
  ], "D", "Grandezas diretamente proporcionais: cada viatura consome 900 ÷ 6 = 150 L. Então 10 × 150 = 1.500 L."),
  m("m05", "Regra de três composta", "Quatro soldados pintam 60 m² de muro em 3 horas. Mantido o mesmo ritmo, 6 soldados pintarão 120 m² de muro em", [
    "2 horas.", "3 horas.", "4 horas.", "4 horas e 30 minutos.", "6 horas.",
  ], "C", "Mais área → mais tempo (direta); mais soldados → menos tempo (inversa). t = 3 × (120/60) × (4/6) = 3 × 2 × 2/3 = 4 horas."),
  m("m06", "MMC", "Duas sirenes são testadas periodicamente: uma a cada 12 minutos e outra a cada 18 minutos. Se as duas tocaram juntas às 8h00, voltarão a tocar juntas, pela primeira vez, às", [
    "8h30.", "8h36.", "8h48.", "9h00.", "9h12.",
  ], "B", "Problema de “voltar a coincidir” = MMC. MMC(12, 18) = 36 minutos. 8h00 + 36 min = 8h36."),
  m("m07", "MDC", "Duas cordas, uma de 48 m e outra de 72 m, serão cortadas em pedaços de mesmo comprimento, o maior possível, sem sobras. O número total de pedaços será", [
    "4.", "5.", "6.", "8.", "10.",
  ], "B", "“Maior tamanho possível” = MDC. MDC(48, 72) = 24 m. Pedaços: 48 ÷ 24 = 2 e 72 ÷ 24 = 3 → total 5."),
  m("m08", "Frações", "Um candidato gastou 1/3 do seu salário com aluguel e 1/4 do restante com alimentação, sobrando R$ 1.800,00. O salário desse candidato é", [
    "R$ 2.700,00.", "R$ 3.000,00.", "R$ 3.200,00.", "R$ 3.600,00.", "R$ 4.200,00.",
  ], "D", "Depois do aluguel sobram 2/3 do salário S. A alimentação leva 1/4 desse restante, então sobram 3/4 × 2/3 = 1/2 de S. Se S/2 = 1.800, S = 3.600."),
  m("m09", "Equação do 1º grau", "Pedro e João têm, juntos, 54 anos. Sabendo que Pedro tem o dobro da idade de João, a idade de Pedro é", [
    "18 anos.", "24 anos.", "30 anos.", "36 anos.", "40 anos.",
  ], "D", "J + 2J = 54 → 3J = 54 → J = 18. Pedro tem 2 × 18 = 36 anos."),
  m("m10", "Sistema de equações", "No pátio de um batalhão há carros e motos, num total de 30 veículos e 96 rodas. O número de motos é", [
    "10.", "12.", "14.", "16.", "18.",
  ], "B", "c + m = 30 e 4c + 2m = 96. Dividindo a 2ª por 2: 2c + m = 48. Subtraindo a 1ª: c = 18. Logo m = 12."),
  m("m11", "Equação do 2º grau", "Um terreno retangular tem área de 96 m², e seu comprimento mede 4 m a mais que a largura. O perímetro desse terreno é", [
    "36 m.", "38 m.", "40 m.", "44 m.", "48 m.",
  ], "C", "x(x + 4) = 96 → x² + 4x − 96 = 0 → x = 8 (a raiz negativa não serve). Lados 8 m e 12 m. Perímetro = 2 × (8 + 12) = 40 m."),
  m("m12", "Teorema de Pitágoras", "Uma escada de 5 m está apoiada em uma parede, com o pé a 3 m da base da parede. A altura em que a escada toca a parede é", [
    "2 m.", "3 m.", "4 m.", "4,5 m.", "6 m.",
  ], "C", "5² = 3² + h² → 25 = 9 + h² → h² = 16 → h = 4 m (triângulo 3-4-5)."),
  m("m13", "Áreas", "Um terreno retangular de 20 m por 15 m será coberto com grama que custa R$ 12,00 o metro quadrado. O gasto total com grama será", [
    "R$ 840,00.", "R$ 2.400,00.", "R$ 3.000,00.", "R$ 3.600,00.", "R$ 4.200,00.",
  ], "D", "Área = 20 × 15 = 300 m². Custo = 300 × 12 = R$ 3.600,00. (Cuidado para não usar o perímetro, 70 m.)"),
  m("m14", "Média aritmética", "A média de acertos de um candidato em 5 simulados foi 42. Nos 4 primeiros, a média foi 40. No quinto simulado, ele acertou", [
    "42 questões.", "44 questões.", "46 questões.", "48 questões.", "50 questões.",
  ], "E", "Total dos 5: 5 × 42 = 210. Total dos 4: 4 × 40 = 160. Quinto: 210 − 160 = 50."),
  m("m15", "Volume e capacidade", "Uma caixa-d’água em forma de bloco retangular mede 2 m de comprimento, 1,5 m de largura e 1 m de altura. Sua capacidade é de", [
    "300 litros.", "1.500 litros.", "2.000 litros.", "3.000 litros.", "30.000 litros.",
  ], "D", "V = 2 × 1,5 × 1 = 3 m³. Como 1 m³ = 1.000 litros, a capacidade é de 3.000 litros."),

  /* ======================= Simulado 2 ======================= */
  m("m16", "Porcentagem", "Um concurso teve 60.000 inscritos para 2.000 vagas. O número de vagas corresponde, aproximadamente, a que porcentagem do número de inscritos?", [
    "0,3%", "3%", "3,3%", "30%", "33%",
  ], "C", "2.000 ÷ 60.000 = 1/30 ≈ 0,0333 = 3,3%."),
  m("m17", "Razão", "Um concurso teve cerca de 59.600 inscritos para 2.200 vagas. A relação candidato/vaga foi de, aproximadamente,", [
    "17 candidatos por vaga.", "22 candidatos por vaga.", "27 candidatos por vaga.", "32 candidatos por vaga.", "37 candidatos por vaga.",
  ], "C", "59.600 ÷ 2.200 ≈ 27,1. Arredondando: 27 candidatos por vaga."),
  m("m18", "Juros simples", "Um capital de R$ 2.000,00 foi aplicado a juros simples de 2% ao mês durante 6 meses. O montante ao final do período foi de", [
    "R$ 2.120,00.", "R$ 2.200,00.", "R$ 2.240,00.", "R$ 2.400,00.", "R$ 2.252,32.",
  ], "C", "J = C · i · t = 2.000 × 0,02 × 6 = 240. Montante = 2.000 + 240 = R$ 2.240,00. (R$ 2.252,32 seria juros compostos.)"),
  m("m19", "Porcentagem (aumento e desconto)", "O preço de um produto aumentou 20% e, depois, sofreu um desconto de 20%. Em relação ao preço inicial, o preço final é", [
    "igual.", "2% menor.", "4% menor.", "4% maior.", "20% menor.",
  ], "C", "1,20 × 0,80 = 0,96 → o preço final é 96% do inicial, ou seja, 4% menor."),
  m("m20", "Regra de três inversa", "Uma viatura, a 60 km/h, faz um percurso em 40 minutos. Se a velocidade média fosse de 80 km/h, o mesmo percurso seria feito em", [
    "20 minutos.", "25 minutos.", "30 minutos.", "35 minutos.", "53 minutos.",
  ], "C", "Velocidade e tempo são inversamente proporcionais: 60 × 40 = 80 × t → t = 2.400 ÷ 80 = 30 minutos."),
  m("m21", "Razão e proporção", "Em uma turma de 40 alunos, a razão entre o número de homens e o de mulheres é de 3 para 5. O número de mulheres é", [
    "15.", "20.", "24.", "25.", "30.",
  ], "D", "3 + 5 = 8 partes. 40 ÷ 8 = 5 alunos por parte. Mulheres: 5 × 5 = 25."),
  m("m22", "Escala", "Em um mapa na escala 1:50.000, a distância entre duas bases policiais é de 6 cm. A distância real entre elas é de", [
    "300 m.", "3 km.", "30 km.", "0,3 km.", "6 km.",
  ], "B", "6 cm × 50.000 = 300.000 cm = 3.000 m = 3 km."),
  m("m23", "Equação do 1º grau", "O triplo de um número, diminuído de 7, é igual a 29. Esse número é", [
    "10.", "11.", "12.", "13.", "14.",
  ], "C", "3x − 7 = 29 → 3x = 36 → x = 12."),
  m("m24", "Tabelas e média", "Uma companhia registrou o seguinte número de ocorrências em uma semana: segunda, 12; terça, 15; quarta, 9; quinta, 18; sexta, 21. A média diária de ocorrências nesses cinco dias foi", [
    "13.", "14.", "15.", "16.", "18.",
  ], "C", "Soma: 12 + 15 + 9 + 18 + 21 = 75. Média: 75 ÷ 5 = 15."),
  m("m25", "Porcentagem (variação)", "O número de atendimentos de um posto passou de 80 para 100 por dia. O aumento percentual foi de", [
    "20%.", "25%.", "30%.", "80%.", "125%.",
  ], "B", "Aumento = 20 sobre a base 80: 20 ÷ 80 = 0,25 = 25%. (Erro comum: dividir por 100 e marcar 20%.)"),
  m("m26", "MMC", "Três policiais folgam, respectivamente, a cada 4, 6 e 10 dias. Se hoje os três estão de folga, eles voltarão a folgar juntos daqui a", [
    "20 dias.", "24 dias.", "30 dias.", "40 dias.", "60 dias.",
  ], "E", "MMC(4, 6, 10) = 60. Os três coincidem de novo daqui a 60 dias."),
  m("m27", "Área do círculo", "Uma praça circular tem 10 m de raio. Usando π = 3,14, a área dessa praça é", [
    "31,4 m².", "62,8 m².", "157 m².", "314 m².", "628 m².",
  ], "D", "A = π · r² = 3,14 × 10² = 3,14 × 100 = 314 m². (62,8 m é o comprimento da circunferência.)"),
  m("m28", "Área e perímetro", "Um terreno quadrado tem 400 m² de área e será cercado com 3 voltas de arame. A quantidade de arame necessária é de", [
    "80 m.", "120 m.", "160 m.", "240 m.", "1.200 m.",
  ], "D", "Lado = √400 = 20 m. Perímetro = 4 × 20 = 80 m. Três voltas: 3 × 80 = 240 m."),
  m("m29", "Medidas de tempo", "Um plantão de 12 horas começou às 19h30. Ele terminou às", [
    "6h30 do dia seguinte.", "7h00 do dia seguinte.", "7h30 do dia seguinte.", "8h30 do dia seguinte.", "19h30 do dia seguinte.",
  ], "C", "19h30 + 12 h = 31h30, ou seja, 7h30 do dia seguinte (31h30 − 24h)."),
  m("m30", "Raciocínio lógico (sequências)", "Observe a sequência: 3, 7, 15, 31, … O próximo termo é", [
    "47.", "55.", "62.", "63.", "64.",
  ], "D", "Cada termo é o dobro do anterior mais 1: 3×2+1 = 7; 7×2+1 = 15; 15×2+1 = 31; 31×2+1 = 63."),

  /* ======================= Simulado 3 ======================= */
  m("m31", "Porcentagem", "Em uma cidade, 35% dos 1.200 policiais trabalham no período noturno. O número de policiais do período noturno é", [
    "350.", "380.", "400.", "420.", "450.",
  ], "D", "35% de 1.200 = 0,35 × 1.200 = 420."),
  m("m32", "Descontos sucessivos", "Uma loja deu um desconto de 10% e, em seguida, outro de 20% sobre o novo preço. O desconto total equivale a", [
    "30%.", "28%.", "25%.", "22%.", "18%.",
  ], "B", "0,90 × 0,80 = 0,72 → paga-se 72%; o desconto total é de 28%, e não de 30%."),
  m("m33", "Regra de três composta", "Três impressoras iguais imprimem 900 páginas em 30 minutos. Cinco dessas impressoras imprimirão 1.800 páginas em", [
    "24 minutos.", "30 minutos.", "36 minutos.", "40 minutos.", "60 minutos.",
  ], "C", "Cada impressora imprime 900 ÷ 3 ÷ 30 = 10 páginas por minuto. Cinco imprimem 50 por minuto: 1.800 ÷ 50 = 36 minutos."),
  m("m34", "Regra de três inversa", "Doze soldados realizam um trabalho em 15 dias. Com o mesmo ritmo de trabalho, 18 soldados realizarão o mesmo trabalho em", [
    "8 dias.", "9 dias.", "10 dias.", "12 dias.", "22,5 dias.",
  ], "C", "Mais soldados → menos dias (inversa): 12 × 15 = 18 × d → d = 180 ÷ 18 = 10 dias."),
  m("m35", "Frações", "Em um local de prova com 840 candidatos, 3/7 são mulheres. O número de homens é", [
    "360.", "420.", "480.", "500.", "540.",
  ], "C", "Mulheres: 840 × 3/7 = 360. Homens: 840 − 360 = 480 (ou 840 × 4/7)."),
  m("m36", "Equação do 1º grau", "Um candidato comprou 3 camisetas e 2 bermudas por R$ 230,00. Cada bermuda custou R$ 20,00 a mais que cada camiseta. O preço de cada bermuda foi", [
    "R$ 38,00.", "R$ 46,00.", "R$ 50,00.", "R$ 58,00.", "R$ 62,00.",
  ], "D", "3c + 2(c + 20) = 230 → 5c + 40 = 230 → c = 38. Bermuda: 38 + 20 = R$ 58,00."),
  m("m37", "Sistema de equações", "A soma das idades de dois irmãos é 50 anos, e a diferença entre elas é de 8 anos. A idade do mais velho é", [
    "21 anos.", "25 anos.", "27 anos.", "29 anos.", "31 anos.",
  ], "D", "x + y = 50 e x − y = 8. Somando: 2x = 58 → x = 29 (o mais novo tem 21)."),
  m("m38", "Teorema de Pitágoras", "Uma rampa liga dois pontos: a distância horizontal é de 8 m, e o desnível vertical é de 6 m. O comprimento da rampa é", [
    "9 m.", "10 m.", "12 m.", "14 m.", "100 m.",
  ], "B", "c² = 6² + 8² = 36 + 64 = 100 → c = 10 m."),
  m("m39", "Área do triângulo", "Um terreno triangular tem 12 m de base e 7 m de altura. Sua área é", [
    "19 m².", "38 m².", "42 m².", "84 m².", "96 m².",
  ], "C", "A = (base × altura) ÷ 2 = (12 × 7) ÷ 2 = 42 m²."),
  m("m40", "Volume e capacidade", "Uma piscina tem 10 m de comprimento, 5 m de largura e 1,2 m de profundidade. Cheia, ela comporta", [
    "6.000 litros.", "60.000 litros.", "600.000 litros.", "50.000 litros.", "16.200 litros.",
  ], "B", "V = 10 × 5 × 1,2 = 60 m³ = 60 × 1.000 = 60.000 litros."),
  m("m41", "Média ponderada", "Um candidato tirou nota 8 em uma prova de peso 3 e nota 6 em outra de peso 2. Sua média ponderada é", [
    "6,8.", "7,0.", "7,2.", "7,5.", "7,6.",
  ], "C", "(8 × 3 + 6 × 2) ÷ (3 + 2) = (24 + 12) ÷ 5 = 36 ÷ 5 = 7,2."),
  m("m42", "Velocidade média", "No treino para o TAF, um candidato correu 2.400 m em 12 minutos. Sua velocidade média foi de", [
    "10 km/h.", "12 km/h.", "14 km/h.", "20 km/h.", "24 km/h.",
  ], "B", "2.400 m em 12 min = 200 m/min. Em 60 min: 12.000 m = 12 km. Velocidade = 12 km/h."),
  m("m43", "Sistema métrico", "Um patrulhamento percorreu 3,5 km e depois mais 800 m. A distância total percorrida, em metros, foi de", [
    "1.150 m.", "3.580 m.", "4.300 m.", "11.500 m.", "43.000 m.",
  ], "C", "3,5 km = 3.500 m. 3.500 + 800 = 4.300 m."),
  m("m44", "Probabilidade", "Uma urna contém 4 bolas azuis e 6 vermelhas. Retirando-se uma bola ao acaso, a probabilidade de ela ser azul é de", [
    "4%.", "25%.", "40%.", "60%.", "66%.",
  ], "C", "Casos favoráveis ÷ casos possíveis = 4 ÷ 10 = 0,4 = 40%."),
  m("m45", "Raciocínio lógico (negação)", "A negação lógica da afirmação “Todos os candidatos estudaram” é:", [
    "Nenhum candidato estudou.", "Todos os candidatos não estudaram.", "Pelo menos um candidato não estudou.", "Alguns candidatos estudaram.", "Todos os candidatos estudarão.",
  ], "C", "Para negar “todos”, basta um contraexemplo: “pelo menos um (algum) não”. “Nenhum” é o contrário, não a negação."),
];
