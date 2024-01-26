export interface IAtivarCadastroMailerService {
  send(email: string, id: string): void;
}
