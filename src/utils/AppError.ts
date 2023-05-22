export class AppError {
  message: string
  // cria a class que tera uma message

  constructor(message: string) {
    // cria um constructor que sera chamado sempre que a class for instanciada(sempre que usar o new antes de chama-lo),
    // como esta sendo feito no groupCreate
    // e então colicita uma menssagem do tipo string
    this.message = message
  }
}
