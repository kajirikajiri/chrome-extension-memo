import { Memo } from "types/Memo";

export interface MemoRepository {
  SetMemos(memos: Memo[]): void
}