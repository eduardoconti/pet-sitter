export class StringUtil {
  static removeEspacosEmBranco(valor: string): string {
    return valor.replace(/\s+/g, ' ').trim();
  }

  static primeiraLetraMaiusculaCadaNome(valor: string): string {
    return valor
      .split(' ')
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(' ');
  }

  static isString(str: string): boolean {
    return typeof str === 'string';
  }
}
