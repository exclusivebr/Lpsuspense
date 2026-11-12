/** PMESP_PEDIR_CPF=1 volta a pedir o CPF na compra (use se a Wiven/adquirente recusar cobranças sem documento). */
export const pedirCpf = () => process.env.PMESP_PEDIR_CPF === "1";
