import { q, type Texto } from "./tipos";

const p = (...a: Parameters<typeof q> extends [unknown, ...infer R] ? R : never) => q("portugues", ...a);

/** Textos inéditos, escritos para este material no estilo dos textos usados pela Vunesp. */
export const TEXTOS: Record<string, Texto> = {
  t1: {
    titulo: "A esquina do sargento",
    fonte: "Crônica inédita",
    paragrafos: [
      "Todo bairro tem uma esquina que funciona como relógio. Na minha, era a do sargento Almeida. Às sete da manhã, ele já estava lá, encostado na viatura, cumprimentando quem passava como se conhecesse cada um pelo nome — e, na maioria das vezes, conhecia.",
      "As crianças da escola municipal faziam questão de atravessar a rua perto dele. Não que precisassem de ajuda: o semáforo funcionava bem. Mas havia algo de tranquilizador naquele homem grande, de fala mansa, que perguntava pelas notas do boletim e pela avó doente.",
      "Certa vez, um comerciante reclamou que o policial perdia tempo demais com conversa. O sargento ouviu em silêncio e respondeu apenas que a conversa era o seu melhor instrumento de trabalho. Na semana seguinte, foi uma dessas conversas que o ajudou a encontrar a bicicleta roubada do filho do próprio comerciante.",
      "Hoje, quando passo pela esquina vazia, percebo que a segurança de um lugar não se mede apenas pelo número de viaturas, mas pela confiança que se constrói, dia após dia, entre quem protege e quem é protegido.",
    ],
  },
  t2: {
    titulo: "Golpes pelo celular",
    fonte: "Reportagem inédita",
    paragrafos: [
      "Os golpes aplicados por meio do celular se tornaram uma das principais preocupações das famílias brasileiras. Mensagens que imitam bancos, falsos pedidos de ajuda de parentes e anúncios de produtos com preços muito abaixo do mercado fazem vítimas todos os dias, sobretudo entre os idosos.",
      "Especialistas em segurança digital explicam que os criminosos exploram menos a tecnologia do que a pressa e a emoção das pessoas. “O golpista cria um senso de urgência: diz que a conta será bloqueada ou que um filho está em apuros. Com medo, a vítima age antes de pensar”, afirma uma delegada que atua na área.",
      "As recomendações são simples, embora nem sempre sejam seguidas: desconfiar de pedidos de dinheiro feitos por mensagem, confirmar a história por ligação para um número já conhecido e jamais informar senhas ou códigos recebidos por SMS. Bancos, lembram os especialistas, não pedem esses dados.",
      "Caso o golpe aconteça, a orientação é registrar boletim de ocorrência, que pode ser feito pela internet, e comunicar imediatamente a instituição financeira, o que aumenta as chances de recuperar o valor.",
    ],
  },
  t3: {
    titulo: "O ônibus das seis",
    fonte: "Crônica inédita",
    paragrafos: [
      "O ônibus das seis sai do terminal sempre cheio de silêncio. Ninguém conversa: uns cochilam com a cabeça encostada no vidro, outros olham o celular com a atenção de quem decifra um mapa. Eu prefiro observar.",
      "Há a enfermeira que volta do plantão noturno e ainda sorri para o motorista. Há o rapaz de uniforme de supermercado que estuda por apostilas amassadas, sublinhando frases com uma caneta quase sem tinta. Há a senhora que carrega uma sacola de pães e distribui bom-dia como quem distribui troco.",
      "Nenhum deles sabe meu nome, e eu não sei o deles. Ainda assim, quando o rapaz das apostilas faltou por uma semana, senti falta dele como se sente falta de uma palavra no meio de uma frase.",
      "Na segunda-feira seguinte, ele voltou. Trazia a mesma caneta, agora acompanhada de um envelope com o timbre de um concurso público. Não precisei perguntar nada: o sorriso dele dizia tudo, e o ônibus inteiro, por alguns segundos, pareceu menos silencioso.",
    ],
  },
  t4: {
    titulo: "O sono também estuda",
    fonte: "Artigo de opinião inédito",
    paragrafos: [
      "Muitos candidatos acreditam que passar noites em claro é sinal de dedicação. A ciência, no entanto, aponta o contrário: é durante o sono que o cérebro organiza as informações aprendidas ao longo do dia e as transforma em memória de longo prazo.",
      "Pesquisadores observaram que estudantes privados de sono têm mais dificuldade de concentração e cometem mais erros em tarefas de raciocínio. Em outras palavras, a hora roubada do descanso costuma ser devolvida, com juros, na forma de esquecimento.",
      "Isso não significa que basta dormir para aprender. O estudo ativo — resolver questões, revisar e explicar o conteúdo com as próprias palavras — continua indispensável. O sono, porém, funciona como o momento em que esse esforço é consolidado.",
      "Para quem se prepara para provas longas, a recomendação é manter horários regulares, evitar telas antes de deitar e tratar o descanso como parte do plano de estudos, e não como prêmio para depois da aprovação.",
    ],
  },
  t5: {
    titulo: "Uma bolsa, quatro vidas",
    fonte: "Reportagem inédita",
    paragrafos: [
      "Uma única doação de sangue pode ajudar até quatro pessoas. O dado, repetido em campanhas de hemocentros, ganha força em períodos de férias e feriados prolongados, quando os estoques costumam cair e os acidentes nas estradas aumentam.",
      "Para doar, é preciso ter entre 16 e 69 anos — menores de idade precisam de autorização dos responsáveis —, pesar no mínimo 50 quilos e estar em boas condições de saúde. O procedimento é rápido: a coleta dura cerca de dez minutos, e todo o material utilizado é descartável.",
      "Apesar disso, apenas uma pequena parcela da população doa regularmente. Para os especialistas, o principal obstáculo não é o medo da agulha, mas a falta de hábito: muitas pessoas só se lembram de doar quando alguém próximo precisa.",
      "Corporações como a Polícia Militar e o Corpo de Bombeiros costumam organizar campanhas internas, e o exemplo tem efeito multiplicador. Quando um grupo assume o compromisso, transforma um gesto isolado em rotina — e rotina, nesse caso, significa vidas salvas.",
    ],
  },
  t6: {
    titulo: "O rádio do avô",
    fonte: "Crônica inédita",
    paragrafos: [
      "Meu avô tinha um rádio de pilha que parecia mais velho do que ele. Ficava na prateleira da cozinha, ao lado do pote de café, e só era ligado em dois momentos: no noticiário da manhã e nos jogos de domingo.",
      "Eu não entendia por que ele não trocava aquele aparelho por um novo. O som chiava, a antena estava presa com fita adesiva e, para sintonizar a estação, era preciso uma paciência que eu, aos dez anos, não tinha.",
      "Um dia, perguntei. Ele desligou o rádio, olhou para mim como quem prepara uma resposta importante e disse que aquele aparelho tinha anunciado o nascimento de todos os netos, porque era ali que ele ouvia o resultado do jogo enquanto esperava no corredor do hospital.",
      "Hoje o rádio está na minha estante. Não funciona mais, e eu também não tento consertá-lo. Há objetos que não servem para ouvir notícias, mas para guardá-las.",
    ],
  },
};

export const PORTUGUES = [
  /* ======================= Simulado 1 ======================= */
  p("pt01", "Interpretação de texto", "A ideia central do texto “A esquina do sargento” é a de que", [
    "a presença de viaturas é o único fator capaz de garantir a segurança de um bairro.",
    "o policial deveria dedicar menos tempo à conversa e mais tempo ao patrulhamento.",
    "a confiança construída no contato diário com a comunidade é parte essencial da segurança.",
    "as crianças precisavam da ajuda do sargento porque o semáforo não funcionava.",
    "os comerciantes do bairro desconfiavam do trabalho da polícia.",
  ], "C", "O último parágrafo resume a tese: a segurança “não se mede apenas pelo número de viaturas, mas pela confiança que se constrói”. O texto não diz que as viaturas são o único fator nem que o policial deveria conversar menos; também desmente que as crianças precisassem de ajuda (“o semáforo funcionava bem”) e não generaliza a desconfiança dos comerciantes.", "t1"),
  p("pt02", "Interpretação de texto", "O episódio do comerciante, no terceiro parágrafo, serve para mostrar que", [
    "o sargento se ofendia facilmente com críticas.",
    "a conversa, vista como perda de tempo, revelou-se útil no trabalho policial.",
    "o comerciante tinha razão ao criticar o policial.",
    "a bicicleta foi encontrada por acaso, sem relação com o trabalho do sargento.",
    "o filho do comerciante havia cometido um furto.",
  ], "B", "A crítica (“perdia tempo demais com conversa”) é desmentida pelo desfecho: “foi uma dessas conversas que o ajudou a encontrar a bicicleta”. O episódio ilustra a ideia de que conversar é instrumento de trabalho.", "t1"),
  p("pt03", "Sentido das palavras", "No trecho “naquele homem grande, de fala mansa”, a expressão destacada “fala mansa” significa fala", [
    "agressiva.", "apressada.", "tranquila.", "confusa.", "autoritária.",
  ], "C", "“Manso” é aquilo que é calmo, sereno, brando. Logo, “fala mansa” = fala tranquila, o que combina com o “algo de tranquilizador” atribuído ao sargento.", "t1"),
  p("pt04", "Pontuação", "Em “Não que precisassem de ajuda: o semáforo funcionava bem.”, os dois-pontos introduzem", [
    "uma enumeração de fatos.", "a fala de uma personagem.", "uma conclusão oposta à ideia anterior.", "uma explicação para o que foi dito antes.", "uma citação de outro autor.",
  ], "D", "O trecho após os dois-pontos explica por que as crianças não precisavam de ajuda: o semáforo funcionava. Os dois-pontos, aqui, introduzem esclarecimento/explicação.", "t1"),
  p("pt05", "Conjunções e sentido", "Em “cumprimentando quem passava como se conhecesse cada um pelo nome”, a expressão “como se” estabelece relação de", [
    "causa.", "comparação hipotética.", "finalidade.", "tempo.", "consequência.",
  ], "B", "“Como se” introduz uma comparação com uma situação imaginada (hipotética): ele cumprimentava do mesmo modo que faria se conhecesse todos.", "t1"),
  p("pt06", "Conjunções e sentido", "No trecho “não se mede apenas pelo número de viaturas, mas pela confiança”, a conjunção “mas” expressa, no contexto, ideia de", [
    "adição.", "oposição total.", "conclusão.", "explicação.", "condição.",
  ], "A", "Na estrutura “não apenas… mas (também)…”, o “mas” acrescenta um segundo elemento ao primeiro, sem anulá-lo: é valor aditivo. O número de viaturas também conta, mas a confiança soma-se a ele.", "t1"),
  p("pt07", "Interpretação de texto", "De acordo com o texto “Golpes pelo celular”, os criminosos exploram principalmente", [
    "falhas nos sistemas dos bancos.", "a pressa e a emoção das vítimas.", "a falta de acesso dos idosos à internet.", "os boletins de ocorrência feitos pela internet.", "a tecnologia avançada dos celulares.",
  ], "B", "O segundo parágrafo afirma que “os criminosos exploram menos a tecnologia do que a pressa e a emoção das pessoas”.", "t2"),
  p("pt08", "Conjunções e sentido", "No trecho “As recomendações são simples, embora nem sempre sejam seguidas”, a conjunção “embora” pode ser substituída, sem alteração de sentido, por", [
    "porque.", "portanto.", "ainda que.", "desde que.", "à medida que.",
  ], "C", "“Embora” é conjunção concessiva, assim como “ainda que”, “mesmo que” e “se bem que”. “Porque” é causal, “portanto” é conclusiva, “desde que” é condicional e “à medida que” é proporcional.", "t2"),
  p("pt09", "Sentido das palavras", "Em “fazem vítimas todos os dias, sobretudo entre os idosos”, o termo “sobretudo” equivale a", [
    "raramente.", "principalmente.", "exclusivamente.", "inclusive.", "apenas.",
  ], "B", "“Sobretudo” significa “principalmente, especialmente”. Não significa “exclusivamente” nem “apenas”: há vítimas de outras idades, mas sobretudo idosos.", "t2"),
  p("pt10", "Coesão e referência", "No último parágrafo, a expressão “o que”, em “o que aumenta as chances de recuperar o valor”, retoma", [
    "o golpe sofrido pela vítima.", "a internet.", "o valor perdido.", "as providências de registrar a ocorrência e comunicar o banco.", "a instituição financeira apenas.",
  ], "D", "“O que” retoma toda a ideia anterior: registrar o B.O. e comunicar imediatamente o banco. São essas atitudes que aumentam as chances de recuperar o dinheiro.", "t2"),
  p("pt11", "Pontuação", "No segundo parágrafo do texto “Golpes pelo celular”, as aspas foram usadas para", [
    "destacar palavras estrangeiras.", "indicar ironia do autor.", "reproduzir literalmente a fala de uma especialista.", "marcar o título de uma obra.", "indicar gírias.",
  ], "C", "As aspas marcam o discurso direto: a reprodução exata das palavras da delegada (“afirma uma delegada”).", "t2"),
  p("pt12", "Crase", "Assinale a alternativa que completa corretamente a frase: “O soldado entregou o relatório ___ comandante e foi ___ delegacia ___ pé.”", [
    "ao – à – a", "à – a – à", "ao – a – à", "a – à – à", "ao – à – à",
  ], "A", "“Entregar algo a alguém” + “o comandante” = ao. “Ir a” + “a delegacia” = à (crase). “A pé” não tem crase: “pé” é palavra masculina.", undefined),
  p("pt13", "Concordância verbal", "Assinale a alternativa que está de acordo com a norma-padrão.", [
    "Fazem dois anos que ele estuda para o concurso.", "Houveram muitos candidatos no último concurso.", "Existe muitas dúvidas sobre o edital.", "Faz dois anos que ele estuda para o concurso.", "Sobrou poucas vagas para o interior.",
  ], "D", "“Fazer” indicando tempo decorrido é impessoal: fica no singular (“Faz dois anos”). “Haver” = existir também é impessoal (“Houve”). “Existir” e “sobrar” concordam com o sujeito: “Existem muitas dúvidas”, “Sobraram poucas vagas”.", undefined),
  p("pt14", "Pontuação", "Assinale a alternativa com pontuação correta.", [
    "Os policiais, atenderam a ocorrência rapidamente.", "Na manhã de ontem, os policiais atenderam a ocorrência.", "Os policiais atenderam, a ocorrência na manhã de ontem.", "A ocorrência foi, atendida pelos policiais.", "Os policiais da 1ª Companhia, atenderam a ocorrência.",
  ], "B", "A vírgula após um adjunto adverbial deslocado para o início (“Na manhã de ontem”) é correta. Nas demais, a vírgula separa indevidamente o sujeito do verbo ou o verbo do seu complemento.", undefined),
  p("pt15", "Regência verbal", "De acordo com a norma-padrão, a regência verbal está correta em:", [
    "Assisti o filme ontem à noite.", "Chegamos no quartel antes das seis.", "O soldado obedeceu ao regulamento.", "Prefiro mais estudar do que sair.", "Esqueci do documento em casa.",
  ], "C", "“Obedecer” pede a preposição “a”: obedecer ao regulamento. Correções: assisti ao filme (assistir = ver); chegamos ao quartel; prefiro estudar a sair; esqueci o documento (ou esqueci-me do documento).", undefined),
  p("pt16", "Colocação pronominal", "A colocação do pronome está de acordo com a norma-padrão em:", [
    "Ninguém avisou-me da mudança de horário.", "Me disseram que a prova foi adiada.", "Quando encontrei-o, já era tarde.", "Ninguém me avisou da mudança de horário.", "Eu tinha avisado-lhe sobre o prazo.",
  ], "D", "Palavras negativas (ninguém, nunca, não) atraem o pronome: “Ninguém me avisou”. Não se inicia frase com pronome oblíquo; a conjunção “quando” atrai o pronome (quando o encontrei); não se usa pronome depois de particípio (tinha-lhe avisado / lhe tinha avisado).", undefined),
  p("pt17", "Acentuação", "De acordo com o Novo Acordo Ortográfico, todas as palavras estão grafadas corretamente em:", [
    "idéia – heróico – vôo", "ideia – heroico – voo", "ideia – heróico – vôo", "idéia – heroico – voo", "ideia – heroíco – voô",
  ], "B", "O Acordo eliminou o acento dos ditongos abertos “éi” e “ói” em paroxítonas (ideia, heroico, assembleia) e do primeiro “o” em “oo” (voo, enjoo).", undefined),
  p("pt18", "Ortografia", "Assinale a alternativa em que todas as palavras estão escritas corretamente.", [
    "excessão – análize – paralização", "exceção – análise – paralisação", "exceção – análize – paralisação", "excessão – análise – paralização", "esceção – analise – paralizacão",
  ], "B", "Grafias corretas: exceção (com ç), análise (com s) e paralisação (deriva de “paralisar”, com s).", undefined),
  p("pt19", "Verbos", "Assinale a alternativa que completa corretamente a frase: “Quando você ___ o resultado no site, avise-me.”", [
    "ver", "vir", "visse", "verá", "vier",
  ], "B", "É o futuro do subjuntivo do verbo VER: quando eu vir, quando você vir. “Ver” no lugar de “vir” é erro comum. “Vier” é o futuro do subjuntivo de VIR (deslocar-se).", undefined),
  p("pt20", "Conjunções e sentido", "Em “Ele treinou todos os dias, por isso foi aprovado no TAF”, a expressão “por isso” estabelece relação de", [
    "concessão.", "condição.", "conclusão.", "comparação.", "finalidade.",
  ], "C", "“Por isso” introduz a conclusão/consequência do que foi dito antes, assim como “portanto”, “logo” e “assim”.", undefined),

  /* ======================= Simulado 2 ======================= */
  p("pt21", "Interpretação de texto", "Em “O ônibus das seis”, o narrador", [
    "critica os passageiros por usarem demais o celular.", "conhece pessoalmente todos os passageiros.", "observa os passageiros e cria com eles um vínculo afetivo, mesmo sem conhecê-los.", "é o rapaz que estuda para o concurso.", "prefere conversar com o motorista durante a viagem.",
  ], "C", "O narrador diz que prefere observar e que ninguém sabe seu nome; mesmo assim, “senti falta dele” mostra o vínculo afetivo criado só pela convivência.", "t3"),
  p("pt22", "Figuras de linguagem", "Em “distribui bom-dia como quem distribui troco”, há uma", [
    "comparação.", "ironia.", "hipérbole.", "antítese.", "onomatopeia.",
  ], "A", "A palavra “como” liga dois elementos (dar bom-dia e dar troco) para aproximá-los: é uma comparação explícita.", "t3"),
  p("pt23", "Interpretação de texto", "O último parágrafo do texto permite inferir que o rapaz das apostilas", [
    "desistiu do concurso.", "trocou de emprego no supermercado.", "obteve uma boa notícia relacionada ao concurso público.", "perdeu a caneta que usava para estudar.", "brigou com o narrador.",
  ], "C", "O envelope com timbre de concurso e o sorriso que “dizia tudo” sugerem que ele teve êxito (aprovação). Inferir é concluir algo que o texto indica sem dizer diretamente.", "t3"),
  p("pt24", "Conjunções e sentido", "A expressão “Ainda assim”, no terceiro parágrafo, pode ser substituída, sem prejuízo de sentido, por", [
    "Por isso.", "Mesmo assim.", "Desse modo.", "Além disso.", "Por exemplo.",
  ], "B", "“Ainda assim” tem valor concessivo/adversativo: apesar de não saberem os nomes uns dos outros, o narrador sentiu falta. “Mesmo assim” mantém esse sentido.", "t3"),
  p("pt25", "Linguagem figurada", "A expressão “sempre cheio de silêncio”, no primeiro parágrafo,", [
    "é empregada em sentido literal.", "indica que o ônibus estava vazio.", "usa linguagem figurada para enfatizar a ausência de conversas.", "contradiz o restante do parágrafo.", "revela que o narrador não gosta de ônibus.",
  ], "C", "Silêncio não “enche” nada literalmente: a construção é figurada e reforça a ideia confirmada logo depois: “Ninguém conversa”.", "t3"),
  p("pt26", "Classes de palavras", "Em “sublinhando frases com uma caneta quase sem tinta”, a palavra “quase” é um", [
    "adjetivo.", "substantivo.", "pronome.", "advérbio.", "verbo.",
  ], "D", "“Quase” modifica a expressão “sem tinta”, indicando intensidade/aproximação: é advérbio.", "t3"),
  p("pt27", "Interpretação de texto", "A tese defendida em “O sono também estuda” é a de que", [
    "passar noites em claro demonstra dedicação aos estudos.", "o sono é parte fundamental do processo de aprendizagem.", "dormir bem dispensa a resolução de questões.", "as telas ajudam a relaxar antes de dormir.", "o descanso deve ser deixado para depois da aprovação.",
  ], "B", "O texto defende que o cérebro consolida a memória durante o sono e que o descanso deve fazer parte do plano de estudos. As demais alternativas contrariam o texto.", "t4"),
  p("pt28", "Interpretação de texto", "A frase “a hora roubada do descanso costuma ser devolvida, com juros, na forma de esquecimento” significa que", [
    "dormir pouco aumenta a memória.", "o esquecimento é cobrado pelos bancos.", "a privação de sono traz um prejuízo maior do que o tempo ganho.", "quem dorme pouco estuda mais e aprende mais.", "o descanso deve ser reduzido gradualmente.",
  ], "C", "A metáfora financeira (“roubada”, “devolvida com juros”) indica que o tempo tirado do sono volta como perda ainda maior: esquecimento.", "t4"),
  p("pt29", "Conjunções e sentido", "No primeiro parágrafo, a expressão “no entanto” expressa ideia de", [
    "oposição.", "causa.", "tempo.", "adição.", "finalidade.",
  ], "A", "“No entanto” é conjunção adversativa (= mas, porém, contudo): a ciência aponta o contrário do que muitos acreditam.", "t4"),
  p("pt30", "Pontuação", "No terceiro parágrafo, os travessões isolam um trecho que", [
    "contradiz a ideia principal.", "especifica o que se entende por “estudo ativo”.", "indica a fala de um pesquisador.", "introduz uma conclusão.", "apresenta uma pergunta ao leitor.",
  ], "B", "Entre os travessões estão os exemplos de estudo ativo: resolver questões, revisar e explicar com as próprias palavras. É uma explicação/especificação.", "t4"),
  p("pt31", "Sentido das palavras", "Um antônimo de “indispensável”, no contexto em que aparece, é", [
    "imprescindível.", "essencial.", "prescindível.", "necessário.", "obrigatório.",
  ], "C", "“Prescindível” significa “que se pode dispensar”, o oposto de indispensável. As demais são sinônimos de indispensável.", "t4"),
  p("pt32", "Interpretação de texto", "Segundo o terceiro parágrafo do texto, é correto afirmar que", [
    "basta dormir bem para ser aprovado.", "dormir, sozinho, não garante o aprendizado.", "o estudo ativo é menos importante que o sono.", "revisar o conteúdo prejudica o sono.", "o sono substitui a resolução de questões.",
  ], "B", "“Isso não significa que basta dormir para aprender. O estudo ativo […] continua indispensável.” O sono consolida, mas não substitui o estudo.", "t4"),
  p("pt33", "Crase", "O acento indicativo de crase está empregado corretamente em:", [
    "Fomos à pé até o batalhão.", "Começou à estudar logo cedo.", "Refiro-me à candidata aprovada em primeiro lugar.", "Entregou o documento à ele.", "Ficou frente à frente com o suspeito.",
  ], "C", "“Referir-se a” + “a candidata” = à. Não há crase antes de palavra masculina (pé), de verbo (estudar), de pronome pessoal (ele) nem em expressões com palavras repetidas (frente a frente).", undefined),
  p("pt34", "Concordância nominal", "Assinale a alternativa correta quanto à concordância nominal.", [
    "Seguem anexo os documentos solicitados.", "Elas mesmo resolveram o problema.", "É proibida a entrada de pessoas não autorizadas.", "Comprei bastante livros para estudar.", "Chegou ao meio-dia e meio.",
  ], "C", "Com artigo (“a entrada”), o particípio concorda: “É proibida a entrada”. Correções: anexos; elas mesmas; bastantes livros; meio-dia e meia (hora).", undefined),
  p("pt35", "Pontuação", "Assinale a alternativa em que a vírgula foi corretamente usada para isolar um vocativo.", [
    "Soldado, apresente-se ao comandante.", "O soldado, apresentou-se ao comandante.", "O soldado apresentou-se, ao comandante.", "Apresentou-se o soldado ao, comandante.", "O comandante, chamou o soldado.",
  ], "A", "Vocativo é o termo usado para chamar o interlocutor (“Soldado”) e deve vir isolado por vírgula. Nas outras, a vírgula separa sujeito e verbo ou verbo e complemento.", undefined),
  p("pt36", "Regência verbal", "Está de acordo com a norma-padrão:", [
    "O atraso implicará na eliminação do candidato.", "O atraso implicará a eliminação do candidato.", "Os moradores simpatizam-se com o policial.", "Ele namorava com a vizinha.", "O candidato visava o cargo de soldado.",
  ], "B", "“Implicar” no sentido de acarretar é transitivo direto: implicará a eliminação. “Simpatizar” não é pronominal (simpatizam com); “namorar” é transitivo direto (namorava a vizinha); “visar” = almejar pede “a” (visava ao cargo).", undefined),
  p("pt37", "Vozes verbais", "Passando a frase “Os policiais prenderam o suspeito” para a voz passiva analítica, obtém-se:", [
    "O suspeito prendeu-se pelos policiais.", "Prenderam-se os policiais.", "O suspeito foi preso pelos policiais.", "Os policiais foram presos pelo suspeito.", "O suspeito era prendido pelos policiais.",
  ], "C", "Na voz passiva analítica, o objeto (o suspeito) vira sujeito, o verbo fica “ser + particípio” no mesmo tempo (prenderam → foi preso) e o sujeito vira agente (pelos policiais).", undefined),
  p("pt38", "Flexão de substantivos", "O plural das palavras “cidadão”, “capitão” e “pão” é, respectivamente:", [
    "cidadões – capitões – pões", "cidadãos – capitães – pães", "cidadães – capitãos – pães", "cidadãos – capitões – pãos", "cidadões – capitães – pãos",
  ], "B", "Plurais consagrados: cidadãos, capitães e pães. Palavras terminadas em -ão podem fazer o plural em -ãos, -ães ou -ões, e é preciso memorizar as mais comuns.", undefined),
  p("pt39", "Conjunções e sentido", "A frase “Embora estivesse cansado, terminou o simulado” mantém o sentido original em:", [
    "Porque estava cansado, terminou o simulado.", "Apesar de estar cansado, terminou o simulado.", "Como estava cansado, terminou o simulado.", "Se estivesse cansado, terminaria o simulado.", "Estava cansado, logo terminou o simulado.",
  ], "B", "“Embora” é concessiva, assim como “apesar de”. “Porque” e “como” indicam causa; “se” indica condição; “logo” indica conclusão.", undefined),
  p("pt40", "Ortografia (mal/mau)", "Assinale a alternativa em que “mal” e “mau” estão empregados corretamente.", [
    "Ele se sentiu mau após o treino; não é um mal soldado.", "Ele se sentiu mal após o treino; não é um mau soldado.", "Ele se sentiu mal após o treino; não é um mal soldado.", "Ele se sentiu mau após o treino; não é um mau soldado.", "Ele se sentiu mál após o treino; não é um máu soldado.",
  ], "B", "MAL é o oposto de BEM (sentir-se mal). MAU é o oposto de BOM (mau soldado).", undefined),

  /* ======================= Simulado 3 ======================= */
  p("pt41", "Interpretação de texto", "Segundo os especialistas citados em “Uma bolsa, quatro vidas”, o principal obstáculo à doação regular de sangue é", [
    "o medo da agulha.", "a demora do procedimento.", "a falta de hábito.", "o risco de contaminação.", "a exigência de idade mínima.",
  ], "C", "“O principal obstáculo não é o medo da agulha, mas a falta de hábito.” O texto também afirma que o procedimento é rápido e que o material é descartável.", "t5"),
  p("pt42", "Coesão e referência", "A expressão “Apesar disso”, no início do terceiro parágrafo, refere-se ao fato de", [
    "os estoques caírem nas férias.", "o procedimento de doação ser rápido e seguro.", "os acidentes aumentarem nas estradas.", "menores precisarem de autorização.", "a Polícia Militar fazer campanhas.",
  ], "B", "“Apesar disso” retoma o que foi dito imediatamente antes: o procedimento é rápido e todo o material é descartável. Mesmo sendo fácil, poucos doam.", "t5"),
  p("pt43", "Pontuação", "No segundo parágrafo, os travessões isolam", [
    "a conclusão do texto.", "uma informação adicional sobre a condição de quem é menor de idade.", "a fala de um médico.", "uma crítica aos hemocentros.", "uma pergunta retórica.",
  ], "B", "O trecho entre travessões (“menores de idade precisam de autorização dos responsáveis”) acrescenta uma ressalva à faixa etária de 16 a 69 anos.", "t5"),
  p("pt44", "Sentido das expressões", "A expressão “efeito multiplicador”, no último parágrafo, indica que", [
    "o número de bolsas é multiplicado no laboratório.", "o exemplo de um grupo estimula outras pessoas a doarem também.", "cada doador precisa doar várias vezes por mês.", "as corporações são obrigadas a doar.", "os acidentes multiplicam a necessidade de sangue.",
  ], "B", "Um gesto que se espalha e gera outros iguais tem “efeito multiplicador”. O texto completa: o compromisso do grupo transforma um gesto isolado em rotina.", "t5"),
  p("pt45", "Tipologia textual", "O texto “Uma bolsa, quatro vidas” é predominantemente", [
    "narrativo, com personagens e conflito.", "informativo, com dados e orientações sobre a doação de sangue.", "poético, com versos e rimas.", "instrucional, como uma receita.", "descritivo, voltado a descrever um hemocentro.",
  ], "B", "O texto apresenta dados (uma doação ajuda até quatro pessoas), requisitos e opiniões de especialistas: é um texto informativo/expositivo de caráter jornalístico.", "t5"),
  p("pt46", "Interpretação de texto", "A ideia central de “O rádio do avô” é", [
    "a importância de consertar aparelhos antigos.", "o valor afetivo de objetos ligados a memórias de família.", "a superioridade do rádio sobre a televisão.", "a impaciência das crianças com os mais velhos.", "a rotina de um hospital.",
  ], "B", "O rádio vale pelas lembranças (o nascimento dos netos), e não por funcionar. Por isso o narrador o guarda sem consertá-lo.", "t6"),
  p("pt47", "Coesão e referência", "Na frase “Há objetos que não servem para ouvir notícias, mas para guardá-las”, o pronome “-las” retoma", [
    "objetos.", "notícias.", "pilhas.", "estantes.", "lembranças, mencionadas antes no texto.",
  ], "B", "“Guardá-las” = guardar as notícias. O pronome feminino plural retoma o substantivo “notícias”, mencionado na mesma frase.", "t6"),
  p("pt48", "Concordância verbal", "Substituindo-se o verbo “haver” por “existir” em “Há objetos que não servem para ouvir notícias”, de acordo com a norma-padrão, tem-se:", [
    "Existe objetos que não servem…", "Existem objetos que não servem…", "Existiu objetos que não servem…", "Existia objetos que não servem…", "Existir objetos que não servem…",
  ], "B", "“Haver” no sentido de existir é impessoal (singular). Já “existir” é pessoal e concorda com o sujeito “objetos”: Existem objetos.", "t6"),
  p("pt49", "Pontuação", "Em “uma paciência que eu, aos dez anos, não tinha”, as vírgulas", [
    "isolam um vocativo.", "separam itens de uma enumeração.", "isolam uma expressão adverbial intercalada.", "separam o sujeito do verbo, o que é um erro.", "indicam a omissão de um verbo.",
  ], "C", "“Aos dez anos” é um adjunto adverbial de tempo deslocado para o meio da oração; por isso, vem entre vírgulas.", "t6"),
  p("pt50", "Interpretação de texto", "Ao final do texto, a atitude do narrador em relação ao rádio é de", [
    "indiferença, pois o aparelho não funciona.", "irritação com o chiado do aparelho.", "compreensão do seu significado e desejo de preservá-lo.", "arrependimento por não tê-lo vendido.", "curiosidade técnica sobre o conserto.",
  ], "C", "Na infância ele não entendia; hoje o guarda na estante e nem tenta consertá-lo, pois compreendeu que o objeto guarda memórias.", "t6"),
  p("pt51", "Sentido das palavras", "No segundo parágrafo, a forma verbal “chiava” significa que o som", [
    "estava muito alto.", "era emitido com ruídos.", "havia parado.", "era muito claro.", "vinha de outra estação.",
  ], "B", "“Chiar” é produzir som agudo e contínuo, um ruído, como o de rádios mal sintonizados.", "t6"),
  p("pt52", "Crase", "Assinale a alternativa que completa corretamente: “Os candidatos chegaram ___ escola ___ duas horas da tarde e ficaram ___ espera do fiscal.”", [
    "a – as – a", "à – às – à", "à – as – a", "a – às – à", "à – às – a",
  ], "B", "“Chegar a” + “a escola” = à; hora determinada = às duas horas; locução feminina “à espera de” leva crase.", undefined),
  p("pt53", "Concordância verbal", "Assinale a frase correta segundo a norma-padrão.", [
    "Mais de um candidato apresentaram recurso.", "Mais de um candidato apresentou recurso.", "A maioria dos candidatos estavam nervoso.", "Fazem cinco anos que entrou na PM.", "Haviam muitas pessoas na fila.",
  ], "B", "Com “mais de um”, o verbo fica normalmente no singular. Correções das demais: “mais de um candidato apresentou”; “nervoso” deveria concordar com o sujeito (“a maioria dos candidatos estava/estavam nervosos”); “Faz cinco anos”; “Havia muitas pessoas”.", undefined),
  p("pt54", "Pontuação", "Compare: (I) “Os policiais, que estavam de folga, ajudaram no resgate.” (II) “Os policiais que estavam de folga ajudaram no resgate.” É correto afirmar que", [
    "as duas frases têm exatamente o mesmo sentido.", "em I, todos os policiais estavam de folga; em II, apenas parte deles.", "em II, todos os policiais estavam de folga; em I, apenas parte deles.", "a frase I está errada, pois não se usa vírgula antes de “que”.", "a frase II está errada, pois falta vírgula.",
  ], "B", "Entre vírgulas, a oração adjetiva é explicativa: generaliza (todos estavam de folga). Sem vírgulas, é restritiva: só os que estavam de folga ajudaram.", undefined),
  p("pt55", "Ortografia (porquês)", "Assinale a alternativa que completa corretamente: “Não sei ___ ele faltou. Disse que faltou ___ estava doente, mas ninguém entendeu o ___ de não avisar.”", [
    "porque – por que – porquê", "por que – porque – porquê", "por quê – porque – por que", "porquê – por que – porque", "por que – por que – porque",
  ], "B", "“Por que” = pelo qual motivo (pergunta indireta); “porque” = pois (explicação); “o porquê” = substantivo (o motivo).", undefined),
  p("pt56", "Sentido das palavras", "A Vunesp publicou uma “retificação” do edital. A palavra destacada significa", [
    "confirmação.", "correção.", "cancelamento.", "prorrogação.", "publicação original.",
  ], "B", "Retificar = corrigir. Não confunda com “ratificar” (confirmar).", undefined),
  p("pt57", "Colocação pronominal", "Está de acordo com a norma-padrão:", [
    "Se fará a chamada às oito horas.", "Far-se-á a chamada às oito horas.", "Fará-se a chamada às oito horas.", "A chamada fará-se às oito horas.", "Se faria-se a chamada às oito horas.",
  ], "B", "Com verbo no futuro do presente ou do pretérito, sem palavra atrativa, usa-se a mesóclise: far-se-á, dir-se-ia. Não se inicia frase com pronome e não se usa ênclise com o futuro.", undefined),
  p("pt58", "Classes de palavras", "Em qual alternativa a palavra “bastante” é adjetivo, e não advérbio?", [
    "Ele estudou bastante para a prova.", "A prova foi bastante difícil.", "Havia candidatos bastantes para todas as vagas.", "Ela corre bastante todos os dias.", "Estavam bastante cansados.",
  ], "C", "Quando acompanha substantivo, “bastante” é adjetivo (= suficiente) e varia: candidatos bastantes. Quando modifica verbo, adjetivo ou advérbio, é advérbio e não varia.", undefined),
  p("pt59", "Acentuação", "Assinale a alternativa correta quanto à acentuação dos verbos.", [
    "Os candidatos tem até amanhã e vem de longe.", "Os candidatos têm até amanhã e vêm de longe.", "Os candidatos têem até amanhã e vêem de longe.", "O candidato têm até amanhã e vêm de longe.", "Os candidatos tém até amanhã e vém de longe.",
  ], "B", "Os verbos TER e VIR recebem acento circunflexo na 3ª pessoa do plural: eles têm, eles vêm. No singular, não: ele tem, ele vem.", undefined),
  p("pt60", "Figuras de linguagem", "Em “A cidade acordou cedo para receber os atletas”, há a figura de linguagem chamada", [
    "personificação (prosopopeia).", "hipérbole.", "eufemismo.", "pleonasmo.", "antítese.",
  ], "A", "Atribuir uma ação humana (acordar) a um ser inanimado (a cidade) é personificação, também chamada prosopopeia.", undefined),
];
