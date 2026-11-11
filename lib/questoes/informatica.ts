import { q } from "./tipos";

const i = (...a: Parameters<typeof q> extends [unknown, ...infer R] ? R : never) => q("informatica", ...a);

export const INFORMATICA = [
  /* ======================= Simulado 1 ======================= */
  i("i01", "Windows — atalhos", "No Windows 10/11, o atalho de teclado Ctrl + Z é usado, na maioria dos programas, para", [
    "salvar o arquivo.", "desfazer a última ação.", "fechar a janela.", "colar um item copiado.", "selecionar tudo.",
  ], "B", "Ctrl+Z desfaz; Ctrl+Y refaz; Ctrl+C copia; Ctrl+V cola; Ctrl+A (ou Ctrl+T no Word em português) seleciona tudo."),
  i("i02", "Windows — arquivos", "No Explorador de Arquivos do Windows, ao selecionar um arquivo e pressionar Shift + Delete, o arquivo será", [
    "copiado para a Área de Transferência.", "enviado para a Lixeira.", "excluído permanentemente, sem passar pela Lixeira.", "renomeado.", "compactado.",
  ], "C", "Delete sozinho envia para a Lixeira (é possível restaurar). Shift+Delete exclui definitivamente, após uma confirmação."),
  i("i03", "Windows — atalhos", "A combinação de teclas que abre o Explorador de Arquivos no Windows é", [
    "Windows + E.", "Windows + L.", "Windows + D.", "Alt + F4.", "Ctrl + Esc.",
  ], "A", "Win+E abre o Explorador; Win+L bloqueia a tela; Win+D mostra a área de trabalho; Alt+F4 fecha a janela ativa."),
  i("i04", "Excel — fórmulas", "Em uma planilha do Excel, as células A1, A2, A3 e A4 contêm, respectivamente, os valores 2, 4, 6 e 8. O resultado da fórmula =SOMA(A1:A4) é", [
    "8.", "14.", "20.", "48.", "384.",
  ], "C", "O intervalo A1:A4 inclui as quatro células: 2 + 4 + 6 + 8 = 20."),
  i("i05", "Word — formatação", "No Microsoft Word em português, o atalho Ctrl + N aplica ao texto selecionado a formatação", [
    "itálico.", "sublinhado.", "negrito.", "tachado.", "sobrescrito.",
  ], "C", "No Word em português: Ctrl+N = negrito, Ctrl+I = itálico, Ctrl+S = sublinhado. (Na versão em inglês, negrito é Ctrl+B.)"),
  /* ======================= Simulado 2 ======================= */
  i("i06", "Excel — fórmulas", "No Excel, as células B1, B2 e B3 contêm os valores 6, 8 e 10. O resultado de =MÉDIA(B1:B3) é", [
    "6.", "8.", "10.", "12.", "24.",
  ], "B", "Média = (6 + 8 + 10) ÷ 3 = 24 ÷ 3 = 8."),
  i("i07", "Correio eletrônico", "Ao enviar um e-mail, o campo CCO (com cópia oculta) serve para", [
    "anexar arquivos grandes.", "enviar cópias sem que os demais destinatários vejam quem as recebeu.", "marcar a mensagem como urgente.", "criptografar a mensagem.", "agendar o envio.",
  ], "B", "Quem está em CCO recebe a mensagem, mas seu endereço não aparece para os outros destinatários. Já o CC (com cópia) é visível a todos."),
  i("i08", "Segurança da informação", "Uma mensagem que imita a comunicação de um banco e pede que o usuário clique em um link e informe sua senha é um exemplo típico de", [
    "backup.", "firewall.", "phishing.", "antivírus.", "spam legítimo.",
  ], "C", "Phishing (de “fishing”, pescar) é o golpe que usa mensagens falsas para “pescar” dados como senhas e números de cartão."),
  i("i09", "Windows — atalhos", "Para bloquear rapidamente o computador com Windows ao se afastar da mesa, sem fechar os programas, utiliza-se o atalho", [
    "Windows + L.", "Windows + E.", "Ctrl + Alt + T.", "Alt + Tab.", "Ctrl + W.",
  ], "A", "Win+L bloqueia a sessão: os programas continuam abertos, e é preciso senha para voltar. Alt+Tab alterna entre janelas."),
  i("i10", "Excel — referências", "No Excel, a referência que permanece fixa quando a fórmula é copiada para outras células é", [
    "A1.", "$A1.", "A$1.", "$A$1.", "#A#1.",
  ], "D", "O cifrão “trava” a linha e/ou a coluna. $A$1 é referência absoluta (coluna e linha fixas). $A1 e A$1 são referências mistas."),
  /* ======================= Simulado 3 ======================= */
  i("i11", "Internet — navegadores", "Ao usar a janela anônima (ou privativa) de um navegador, é correto afirmar que", [
    "o provedor de internet não consegue ver os sites acessados.", "o navegador não salva o histórico de navegação nem os cookies após a janela ser fechada.", "o computador fica protegido contra vírus.", "os downloads são apagados automaticamente.", "a navegação fica mais rápida.",
  ], "B", "O modo anônimo apenas não guarda localmente histórico, cookies e dados de formulários. Ele não torna o usuário invisível para provedores, empresas ou sites, nem protege contra vírus."),
  i("i12", "Segurança da informação", "O tipo de código malicioso que criptografa os arquivos da vítima e exige pagamento para liberá-los é chamado de", [
    "spyware.", "adware.", "ransomware.", "worm.", "cookie.",
  ], "C", "Ransomware vem de “ransom”, resgate. Spyware espiona; adware exibe propagandas; worm se espalha sozinho pela rede."),
  i("i13", "Excel — função SE", "No Excel, a célula A1 contém o valor 28. A fórmula =SE(A1>=30;\"Aprovado\";\"Reprovado\") retorna", [
    "Aprovado.", "Reprovado.", "28.", "VERDADEIRO.", "#VALOR!",
  ], "B", "A função SE testa a condição: 28 >= 30 é falso, então ela retorna o terceiro argumento, “Reprovado”."),
  i("i14", "Arquivos — extensões", "Um arquivo de planilha salvo no formato padrão das versões atuais do Microsoft Excel possui a extensão", [
    ".docx", ".pptx", ".xlsx", ".pdf", ".txt",
  ], "C", ".xlsx = Excel; .docx = Word; .pptx = PowerPoint; .pdf = documento portátil; .txt = texto simples."),
  i("i15", "Segurança da informação", "A autenticação em dois fatores (2FA) aumenta a segurança de uma conta porque", [
    "dispensa o uso de senhas.", "exige, além da senha, uma segunda comprovação, como um código enviado ao celular.", "impede o acesso à internet.", "apaga os dados após três tentativas.", "torna a senha visível ao usuário.",
  ], "B", "Mesmo que a senha vaze, o invasor ainda precisa do segundo fator (código, aplicativo ou biometria). Por isso nunca se deve repassar esses códigos a ninguém."),
];
