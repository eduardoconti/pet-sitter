export interface IUseCase<Input, Output> {
  executar(input: Input): Promise<Output>;
}
