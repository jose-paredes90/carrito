export class NotFoundException extends Error {
  status: number
  constructor(msg: string) {
    super(msg)
  }
}