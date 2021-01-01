import { Memo } from "types/Memo";
import {MemoRepository} from 'domain/repositories/MemoRepository'

interface MemoService {
  SetMemos(memos: Memo[]): void
}

export class MemoServiceImpl implements MemoService {
  memoRepo: MemoRepository

  constructor(mr: MemoRepository) {
    this.memoRepo = mr
  }

  async SetMemos(memos: Memo[]): Promise<'success'> {
    console.log('in set', memos)
    return new Promise((resolve)=>{
      chrome.storage.sync.set({memos}, ()=>{
        resolve('success')
      })
    })
  }
}