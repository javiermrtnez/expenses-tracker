export const amountFormatter = (number: number) =>
  `${Intl.NumberFormat('es-ES').format(number).toString()} €`;
