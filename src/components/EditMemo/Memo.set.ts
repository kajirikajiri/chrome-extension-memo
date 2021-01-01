import { MemoRepositoryImpl } from "data/repositories/MemoRepositoryImpl"
import { MemoServiceImpl } from "domain/usecases/MemoService"
import { Memo } from "types/Memo"

export const setMemoToStorage = async(memos:Memo[]) => {
  const memoRepo = new MemoRepositoryImpl()
  const memoService = new MemoServiceImpl(memoRepo)
  console.log('aaa', memos)
  const result = await memoService.SetMemos(memos)
  return result
}