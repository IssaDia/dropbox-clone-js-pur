export abstract class RegisterInterface {
  public abstract register(email: string, password: string): Promise<void>;
}
