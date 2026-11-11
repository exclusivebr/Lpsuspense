import { q } from "./tipos";

const g = (...a: Parameters<typeof q> extends [unknown, ...infer R] ? R : never) => q("gerais", ...a);

export const GERAIS = [
  /* ======================= Simulado 1 ======================= */
  g("g01", "História do Brasil — Império", "A Independência do Brasil, proclamada por D. Pedro em 7 de setembro de 1822, ocorreu às margens do riacho Ipiranga, na então província de", [
    "Rio de Janeiro.", "Minas Gerais.", "São Paulo.", "Bahia.", "Pernambuco.",
  ], "C", "O “Grito do Ipiranga” aconteceu em São Paulo, onde hoje está o Parque da Independência e o Museu do Ipiranga."),
  g("g02", "História do Brasil — Império", "A Lei Áurea, assinada pela Princesa Isabel em 13 de maio de 1888,", [
    "proclamou a República.", "aboliu a escravidão no Brasil.", "libertou apenas os escravizados com mais de 60 anos.", "declarou livres os filhos de escravizadas.", "proibiu o tráfico negreiro.",
  ], "B", "A Lei Áurea extinguiu a escravidão. As outras leis citadas são anteriores e graduais: Eusébio de Queirós (1850, fim do tráfico), Ventre Livre (1871) e Sexagenários (1885)."),
  g("g03", "História do Brasil — República", "A Proclamação da República no Brasil, em 15 de novembro de 1889, foi liderada pelo", [
    "Marechal Deodoro da Fonseca.", "imperador D. Pedro II.", "presidente Getúlio Vargas.", "Marechal Floriano Peixoto, já como presidente eleito.", "Duque de Caxias.",
  ], "A", "Deodoro liderou o movimento militar que derrubou a monarquia e tornou-se o primeiro presidente. Floriano foi seu vice e sucessor."),
  g("g04", "História do Brasil — Era Vargas", "A Consolidação das Leis do Trabalho (CLT), que reuniu a legislação trabalhista brasileira, foi criada em 1943, durante", [
    "o governo de Juscelino Kubitschek.", "o Estado Novo de Getúlio Vargas.", "a Ditadura Militar.", "a República Velha.", "o governo de Fernando Henrique Cardoso.",
  ], "B", "A CLT foi assinada por Getúlio Vargas em 1º de maio de 1943, durante o Estado Novo (1937–1945)."),
  g("g05", "História de São Paulo", "A Revolução Constitucionalista de 1932, lembrada no feriado paulista de 9 de julho, teve como principal reivindicação", [
    "a independência de São Paulo em relação ao Brasil.", "a volta da monarquia.", "a elaboração de uma nova Constituição e o fim do governo provisório de Vargas.", "o fim da escravidão.", "a transferência da capital para São Paulo.",
  ], "C", "Os paulistas pegaram em armas contra o governo provisório de Getúlio Vargas, exigindo uma Constituição. Foram derrotados militarmente, mas a Constituição veio em 1934."),
  g("g06", "História de São Paulo", "A Polícia Militar do Estado de São Paulo tem origem no Corpo de Guardas Municipais Permanentes, criado pelo Brigadeiro Rafael Tobias de Aguiar, patrono da corporação, no ano de", [
    "1808.", "1822.", "1831.", "1889.", "1932.",
  ], "C", "A PMESP considera 15 de dezembro de 1831 sua data de criação. O Brigadeiro Tobias de Aguiar é o patrono da corporação."),
  g("g07", "Geografia do Brasil — Biomas", "O maior bioma brasileiro em extensão territorial é", [
    "o Cerrado.", "a Mata Atlântica.", "a Caatinga.", "a Amazônia.", "o Pampa.",
  ], "D", "A Amazônia ocupa quase metade do território nacional. O Cerrado é o segundo maior."),
  g("g08", "Geografia do Brasil — Biomas", "O bioma que originalmente cobria grande parte do litoral brasileiro e do território paulista, e que hoje conserva apenas uma pequena parcela de sua vegetação original, é", [
    "a Amazônia.", "a Mata Atlântica.", "o Pantanal.", "a Caatinga.", "o Pampa.",
  ], "B", "A Mata Atlântica é o bioma mais devastado do país, pois está onde se concentram as maiores cidades e a maior parte da população. Restam cerca de 12% da cobertura original."),
  g("g09", "Geografia de São Paulo", "O Rio Tietê, um dos mais importantes do Estado de São Paulo, tem como característica marcante o fato de", [
    "desaguar diretamente no Oceano Atlântico, em Santos.", "nascer no Paraná e correr para São Paulo.", "nascer perto do litoral e correr para o interior, até desaguar no Rio Paraná.", "ser um rio temporário, que seca no inverno.", "fazer parte da bacia do Rio São Francisco.",
  ], "C", "O Tietê nasce em Salesópolis, a pouco mais de 20 km do mar, mas corre para o interior (sentido oeste) por cerca de 1.100 km até o Rio Paraná, graças ao relevo da Serra do Mar."),
  g("g10", "Geografia do Brasil — Regiões", "Pela divisão regional do IBGE, o Estado de São Paulo integra a Região Sudeste, juntamente com", [
    "Paraná, Santa Catarina e Rio Grande do Sul.", "Minas Gerais, Rio de Janeiro e Espírito Santo.", "Goiás, Mato Grosso e Mato Grosso do Sul.", "Minas Gerais, Goiás e Rio de Janeiro.", "Bahia, Minas Gerais e Rio de Janeiro.",
  ], "B", "O Sudeste é formado por SP, MG, RJ e ES. É a região mais populosa e de maior PIB do país."),
  g("g11", "História do Brasil — República", "Brasília foi inaugurada como nova capital do país em 1960, no governo de", [
    "Getúlio Vargas.", "Juscelino Kubitschek.", "Jânio Quadros.", "João Goulart.", "Eurico Gaspar Dutra.",
  ], "B", "A construção de Brasília foi a “meta-síntese” do Plano de Metas de JK (“50 anos em 5”)."),
  g("g12", "História do Brasil — Redemocratização", "A Constituição Federal de 1988, conhecida como “Constituição Cidadã”, foi promulgada", [
    "durante o regime militar, para endurecer a censura.", "após a redemocratização, ampliando direitos e garantias fundamentais.", "por D. Pedro II.", "durante o Estado Novo.", "para instituir o parlamentarismo.",
  ], "B", "Promulgada em 5 de outubro de 1988, após o fim da ditadura, ela ampliou direitos sociais e individuais, daí o apelido dado por Ulysses Guimarães."),
  g("g13", "Geografia do Brasil — Clima", "O clima semiárido, com chuvas escassas e irregulares, predomina", [
    "no litoral do Sul.", "no Sertão nordestino, onde se encontra a Caatinga.", "na Amazônia.", "na Serra da Mantiqueira.", "no Pantanal.",
  ], "B", "O semiárido ocupa o interior do Nordeste e o norte de Minas Gerais. Sua vegetação típica é a Caatinga, adaptada à falta de água."),
  g("g14", "Atualidades — Meio ambiente", "Em novembro de 2025, o Brasil sediou a 30ª Conferência das Nações Unidas sobre Mudanças Climáticas (COP30), realizada na cidade de", [
    "Rio de Janeiro (RJ).", "São Paulo (SP).", "Manaus (AM).", "Belém (PA).", "Brasília (DF).",
  ], "D", "A COP30 foi realizada em Belém, no Pará, na Amazônia, colocando a floresta no centro do debate climático mundial."),
  g("g15", "Atualidades — Meio ambiente", "A Agenda 2030 da ONU reúne os Objetivos de Desenvolvimento Sustentável (ODS), que são, ao todo,", [
    "8.", "10.", "12.", "17.", "20.",
  ], "D", "São 17 ODS, como erradicação da pobreza, fome zero, educação de qualidade e ação contra a mudança do clima. (Os 8 eram os antigos Objetivos do Milênio.)"),

  /* ======================= Simulado 2 ======================= */
  g("g16", "História do Brasil — Colônia", "A descoberta de ouro em Minas Gerais, no século XVIII, deslocou o eixo econômico da colônia para o Centro-Sul e levou à transferência da capital, em 1763,", [
    "de Salvador para o Rio de Janeiro.", "do Rio de Janeiro para Salvador.", "de São Paulo para Ouro Preto.", "de Recife para Salvador.", "do Rio de Janeiro para Brasília.",
  ], "A", "O porto do Rio de Janeiro passou a escoar o ouro de Minas, e a capital deixou Salvador em 1763."),
  g("g17", "História do Brasil — Colônia", "A Inconfidência Mineira (1789) foi um movimento contra a cobrança de impostos pela Coroa portuguesa. Seu participante mais conhecido, executado em 1792, foi", [
    "Zumbi dos Palmares.", "Tiradentes.", "Frei Caneca.", "José Bonifácio.", "Bento Gonçalves.",
  ], "B", "Joaquim José da Silva Xavier, o Tiradentes, foi enforcado em 21 de abril de 1792, data hoje feriado nacional."),
  g("g18", "História de São Paulo", "No final do século XIX e início do XX, São Paulo recebeu grande número de imigrantes, sobretudo italianos, principalmente para", [
    "trabalhar nas minas de ouro.", "substituir a mão de obra escravizada nas lavouras de café.", "povoar a Amazônia.", "construir Brasília.", "lutar na Guerra do Paraguai.",
  ], "B", "Com o fim do tráfico e depois da escravidão, os cafeicultores paulistas incentivaram a imigração europeia, especialmente italiana, para as fazendas de café."),
  g("g19", "História do Brasil — Ditadura Militar", "O Ato Institucional nº 5 (AI-5), de 1968, é considerado o mais duro do regime militar porque, entre outras medidas,", [
    "convocou eleições diretas para presidente.", "permitiu o fechamento do Congresso e suspendeu o habeas corpus para crimes políticos.", "concedeu anistia aos presos políticos.", "criou a Constituição de 1988.", "extinguiu a censura.",
  ], "B", "O AI-5 ampliou os poderes do Executivo: fechamento do Congresso, cassações e suspensão do habeas corpus em crimes políticos. Ele foi revogado em 1978."),
  g("g20", "História do Brasil — Redemocratização", "O movimento “Diretas Já” (1983–1984) reuniu milhões de pessoas em comícios para reivindicar", [
    "o retorno da monarquia.", "eleições diretas para presidente da República.", "o fim do voto obrigatório.", "a independência do Nordeste.", "a criação da Petrobras.",
  ], "B", "A Emenda Dante de Oliveira, que restabelecia a eleição direta para presidente, foi rejeitada em 1984. A primeira eleição direta pós-ditadura ocorreu em 1989."),
  g("g21", "História do Brasil — Nova República", "O Plano Real, lançado em 1994, teve como principal objetivo", [
    "construir novas hidrelétricas.", "controlar a hiperinflação e estabilizar a moeda.", "nacionalizar os bancos.", "criar o voto eletrônico.", "privatizar a Petrobras.",
  ], "B", "O Plano Real, do governo Itamar Franco (com FHC no Ministério da Fazenda), acabou com a hiperinflação que marcava a economia desde os anos 1980."),
  g("g22", "História de São Paulo — Cultura", "A Semana de Arte Moderna de 1922, marco do modernismo brasileiro, foi realizada", [
    "no Theatro Municipal de São Paulo.", "no Palácio do Catete, no Rio de Janeiro.", "em Ouro Preto.", "na Bienal de São Paulo.", "em Brasília.",
  ], "A", "A Semana ocorreu em fevereiro de 1922 no Theatro Municipal de São Paulo, com Mário de Andrade, Oswald de Andrade, Anita Malfatti e outros."),
  g("g23", "Geografia de São Paulo", "A Região Metropolitana de São Paulo, a mais populosa do país, é formada pela capital e outros municípios, num total de", [
    "12 municípios.", "20 municípios.", "39 municípios.", "52 municípios.", "645 municípios.",
  ], "C", "A RMSP tem 39 municípios. O número 645 é o total de municípios do Estado de São Paulo."),
  g("g24", "Geografia do Brasil — Biomas", "O Pantanal, uma das maiores planícies alagáveis do planeta, localiza-se principalmente nos estados de", [
    "Amazonas e Pará.", "Mato Grosso e Mato Grosso do Sul.", "Bahia e Minas Gerais.", "Paraná e Santa Catarina.", "Goiás e Tocantins.",
  ], "B", "O Pantanal fica em MT e MS (com partes na Bolívia e no Paraguai). Nos últimos anos, as queimadas e as secas severas colocaram o bioma no noticiário."),
  g("g25", "Geografia do Brasil — Energia", "A maior parte da energia elétrica produzida no Brasil vem de fonte", [
    "nuclear.", "hidrelétrica.", "a carvão mineral.", "a óleo diesel.", "geotérmica.",
  ], "B", "As hidrelétricas ainda são a principal fonte da eletricidade brasileira, embora a energia eólica e a solar cresçam rapidamente."),
  g("g26", "Geografia do Brasil — Fusos horários", "O território brasileiro possui", [
    "um único fuso horário.", "dois fusos horários.", "três fusos horários.", "quatro fusos horários.", "seis fusos horários.",
  ], "D", "O Brasil tem 4 fusos horários (de −2 a −5 horas em relação a Greenwich). O horário de Brasília (−3 h) é o oficial."),
  g("g27", "Geografia do Brasil — Biomas", "O Cerrado, segundo maior bioma brasileiro, é chamado de “berço das águas” e vem sendo pressionado principalmente", [
    "pela urbanização do litoral.", "pela expansão da agropecuária, como o cultivo de soja.", "pela mineração de carvão no Sul.", "pela pesca predatória.", "pelo turismo de inverno.",
  ], "B", "No Cerrado nascem rios de grandes bacias brasileiras. A expansão das lavouras e das pastagens é a principal causa de desmatamento no bioma."),
  g("g28", "Geografia — Recursos hídricos", "O Aquífero Guarani, uma das maiores reservas subterrâneas de água doce do mundo, estende-se sob os territórios de", [
    "Brasil, Bolívia e Peru.", "Brasil, Argentina, Paraguai e Uruguai.", "Brasil e Venezuela.", "Brasil, Chile e Argentina.", "apenas o Brasil.",
  ], "B", "O Aquífero Guarani ocupa partes de Brasil (a maior porção, inclusive em SP), Argentina, Paraguai e Uruguai."),
  g("g29", "Geografia de São Paulo — Economia", "O porto que é o mais movimentado da América Latina e fica no litoral paulista é o Porto de", [
    "Paranaguá.", "Santos.", "Itajaí.", "Suape.", "Rio Grande.",
  ], "B", "O Porto de Santos é o maior da América Latina em movimentação de cargas, essencial para as exportações brasileiras."),
  g("g30", "História do Brasil — Império", "A Lei do Ventre Livre, de 1871, determinou que", [
    "todos os escravizados seriam libertados imediatamente.", "os filhos de mulheres escravizadas nascidos a partir daquela data seriam considerados livres.", "os escravizados com mais de 60 anos seriam livres.", "o tráfico negreiro estava proibido.", "os escravizados poderiam votar.",
  ], "B", "A Lei do Ventre Livre (Lei Rio Branco) libertava os filhos de escravizadas nascidos após 1871. Foi uma das leis graduais que antecederam a Lei Áurea."),

  /* ======================= Simulado 3 ======================= */
  g("g31", "História do Brasil — Colônia", "Em 1534, para ocupar e defender o território, a Coroa portuguesa dividiu a colônia em grandes faixas de terra entregues a donatários. Esse sistema ficou conhecido como", [
    "sesmarias urbanas.", "capitanias hereditárias.", "governo-geral.", "províncias imperiais.", "municípios coloniais.",
  ], "B", "As capitanias hereditárias foram criadas por D. João III em 1534. Como a maioria fracassou, em 1548 foi criado o Governo-Geral."),
  g("g32", "História do Brasil — Período Joanino", "Com a chegada da família real portuguesa ao Brasil, em 1808, uma das primeiras medidas de D. João foi", [
    "a proclamação da República.", "a abertura dos portos às nações amigas.", "a abolição da escravidão.", "a mudança da capital para São Paulo.", "a independência do Brasil.",
  ], "B", "A Abertura dos Portos (1808) acabou na prática com o monopólio comercial português e beneficiou sobretudo a Inglaterra."),
  g("g33", "História do Brasil — Império", "O Período Regencial (1831–1840) terminou com o chamado Golpe da Maioridade, que", [
    "proclamou a República.", "antecipou a maioridade de D. Pedro II, que assumiu o trono aos 14 anos.", "devolveu o trono a D. Pedro I.", "criou o parlamentarismo republicano.", "transferiu a corte para Portugal.",
  ], "B", "Para conter as revoltas regenciais, a maioridade de D. Pedro II foi antecipada em 1840, aos 14 anos, dando início ao Segundo Reinado."),
  g("g34", "História do Brasil — Império", "Na Guerra do Paraguai (1864–1870), o Brasil formou a Tríplice Aliança com", [
    "Chile e Peru.", "Argentina e Uruguai.", "Bolívia e Argentina.", "Uruguai e Bolívia.", "Inglaterra e França.",
  ], "B", "Brasil, Argentina e Uruguai enfrentaram o Paraguai de Solano López. Foi o maior conflito armado da América do Sul."),
  g("g35", "História do Brasil — República Velha", "Na Primeira República, a “política do café com leite” referia-se à alternância no poder entre as elites de", [
    "São Paulo e Minas Gerais.", "Rio de Janeiro e Bahia.", "Rio Grande do Sul e Paraná.", "Pernambuco e Ceará.", "Goiás e Mato Grosso.",
  ], "A", "O “café” representava São Paulo, grande produtor de café, e o “leite”, Minas Gerais, com sua pecuária leiteira."),
  g("g36", "História do Brasil — Era Vargas", "A Revolução de 1930 teve como resultado", [
    "a Proclamação da República.", "a chegada de Getúlio Vargas ao poder e o fim da República Velha.", "o início da Ditadura Militar.", "a eleição direta de Juscelino Kubitschek.", "a independência do Brasil.",
  ], "B", "O movimento de 1930 impediu a posse de Júlio Prestes e levou Vargas ao governo, encerrando a política do café com leite."),
  g("g37", "História do Brasil — Era Vargas", "O direito de voto das mulheres no Brasil foi garantido pelo Código Eleitoral de", [
    "1889.", "1922.", "1932.", "1964.", "1988.",
  ], "C", "O Código Eleitoral de 1932, do governo Vargas, instituiu o voto feminino e o voto secreto."),
  g("g38", "História do Brasil — Era Vargas", "A Petrobras foi criada em 1953, após a campanha “O petróleo é nosso”, durante o governo de", [
    "Juscelino Kubitschek.", "Getúlio Vargas.", "Eurico Gaspar Dutra.", "Castelo Branco.", "José Sarney.",
  ], "B", "A Petrobras foi criada no segundo governo Vargas (1951–1954), com o monopólio estatal da exploração do petróleo."),
  g("g39", "Geografia do Brasil — Hidrografia", "O Rio São Francisco, conhecido como “Velho Chico” e “rio da integração nacional”, nasce", [
    "na Amazônia.", "na Serra da Canastra, em Minas Gerais.", "na Serra do Mar, em São Paulo.", "no Pantanal.", "na Chapada Diamantina, na Bahia.",
  ], "B", "O São Francisco nasce na Serra da Canastra (MG), atravessa o semiárido nordestino e deságua no Atlântico, entre Alagoas e Sergipe."),
  g("g40", "Geografia do Brasil — População", "O estado brasileiro mais populoso é", [
    "Minas Gerais.", "Rio de Janeiro.", "Bahia.", "São Paulo.", "Paraná.",
  ], "D", "São Paulo tem mais de 44 milhões de habitantes, cerca de um quinto da população brasileira."),
  g("g41", "Atualidades — Meio ambiente", "A principal causa do desmatamento na Amazônia brasileira é", [
    "a construção de cidades.", "a expansão da agropecuária, principalmente a pecuária.", "a extração de petróleo.", "o turismo ecológico.", "a pesca.",
  ], "B", "A maior parte das áreas desmatadas na Amazônia vira pasto. A grilagem de terras e o garimpo ilegal também são problemas graves."),
  g("g42", "Atualidades — Clima", "O fenômeno El Niño, que influencia o clima no Brasil, caracteriza-se", [
    "pelo resfriamento das águas do Oceano Atlântico Sul.", "pelo aquecimento anormal das águas do Oceano Pacífico equatorial.", "pela formação de geleiras na Amazônia.", "pelo aumento das chuvas no Sertão nordestino.", "pelo fim das estações do ano.",
  ], "B", "No El Niño, as águas do Pacífico equatorial esquentam. No Brasil, costuma provocar seca no Norte e no Nordeste e chuvas acima da média no Sul."),
  g("g43", "Geografia urbana", "O fenômeno das “ilhas de calor”, comum em grandes cidades como São Paulo, é provocado principalmente", [
    "pela proximidade com o mar.", "pela concentração de asfalto, concreto e edifícios e pela pouca vegetação.", "pela altitude elevada.", "pelas chuvas de verão.", "pela poluição sonora.",
  ], "B", "Asfalto e concreto absorvem e liberam calor, e a falta de áreas verdes reduz o resfriamento. Por isso, o centro urbano fica mais quente que a periferia arborizada."),
  g("g44", "Geografia do Brasil — Transportes", "O principal modal de transporte de cargas no Brasil é o", [
    "ferroviário.", "hidroviário.", "rodoviário.", "aéreo.", "dutoviário.",
  ], "C", "A maior parte das cargas brasileiras é transportada por caminhões, o que encarece o frete e torna o país dependente das rodovias."),
  g("g45", "Atualidades — Política", "Nas eleições gerais realizadas em outubro de 2026, os eleitores brasileiros votaram para", [
    "prefeito e vereador.", "presidente, governador, senador, deputado federal e deputado estadual.", "apenas presidente e vice-presidente.", "apenas deputados e senadores.", "prefeito, governador e presidente.",
  ], "B", "As eleições gerais (federais e estaduais) ocorrem a cada 4 anos (2022, 2026…). As municipais, para prefeito e vereador, ocorrem em anos diferentes (2024, 2028…)."),
];
