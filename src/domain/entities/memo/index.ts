import {v4 as uuid} from 'uuid'

export class Memo {
  text: string
  id: string
  date: string

  constructor(text:string = '', date:string = '', id:string = uuid()) {
    this.text = text
    this.id = id
    this.date = date
  }
}