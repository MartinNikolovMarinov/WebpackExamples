export class EnvironmentService {
  public get isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development'
  }

  public get isProduction(): boolean {
    return process.env.NODE_ENV === 'production'
  }
}
