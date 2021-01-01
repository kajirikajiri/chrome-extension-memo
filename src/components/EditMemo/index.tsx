import { Memo } from 'types/Memo';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { getDate } from 'scripts/getDate';
import { setMemoToStorage } from './Memo.set';
import { arrayMove } from 'scripts/arrayMove';

interface Props {
  text: string
  id: string
  date: string
  memoIndex: number
  memos: Memo[]
  updateMemos: Dispatch<SetStateAction<Memo[]>>
  openSnackbar: ()=>void
}

export const EditMemo:FC<Props>=(props)=> {
  const [text, setText] = useState<string>(props.text)
  const [date, setDate] = useState<string>(props.date)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 値が保存されてなければsetTimeoutを解除
    if (timeoutId) clearTimeout(timeoutId)

    const {value} = event.target
    const date = getDate()

    setText(value)
    setDate(date)
    // 1秒後に自動保存
    console.log('before setTimeout')
    const currentTimeoutId = setTimeout(async()=> {
      const copy = [...props.memos]

      copy[props.memoIndex].text = value
      copy[props.memoIndex].date = date
      const newArray = arrayMove(copy, props.memoIndex, 0)

      console.log('settimeout', newArray)
      const result = await setMemoToStorage(newArray)
      if (result === 'success') props.openSnackbar()
      props.updateMemos(newArray)
    }, 1000)
    setTimeoutId(currentTimeoutId)
  }
  return (
    <textarea className="bg-black text-white p-4 h-full w-full" onChange={(e) => handleChange(e)} value={text}></textarea>
  )
}
