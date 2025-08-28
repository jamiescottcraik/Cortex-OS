export class OrchestrationError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = 'OrchestrationError';
  }
}
