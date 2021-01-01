import { EditMemo } from 'components/EditMemo';
import { setMemoToStorage } from 'components/EditMemo/Memo.set';
import { Memo as InitMemo } from 'domain/entities/memo';
import React, { useEffect, useState } from 'react';
import { getDate } from 'scripts/getDate';
import { Memo } from 'types/Memo';

export const Memos = () => {
  const [memos, setMemos] = useState<Memo[]>([])
  const [flag, setFlag] = useState<boolean>(false)
  const [memo, setMemo] = useState<Memo>(new InitMemo())
  const [index, setIndex] = useState<number>(0)
  const [snackbar, setSnackbar] = useState<boolean>(false)
  // const memoMock = [{text: 'memo', date: '2020/11/11', id: 0},{text: 'memo', date: '2020/11/11', id: 0},{text: 'memo', date: '2020/11/11', id: 0},{text: 'memo', date: '2020/11/11', id: 0},{text: 'memo', date: '2020/11/11', id: 0},{text: 'memo', date: '2020/11/11', id: 0},{text: 'memo', date: '2020/11/11', id: 0},{text: 'memo', date: '2020/11/11', id: 0},{text: 'memo', date: '2020/11/11', id: 0},{text: 'memo', date: '2020/11/11', id: 0},{text: 'memo', date: '2020/11/11', id: 0},{text: 'memo', date: '2020/11/11', id: 0},{text: 'memo', date: '2020/11/11', id: 0},{text: 'memo', date: '2020/11/11', id: 0},{text: 'memo', date: '2020/11/11', id: 0},{text: 'memo', date: '2020/11/11', id: 0}]
  useEffect(() => {
    chrome.storage.sync.get(['memos'], ({ memos }) => {
      console.log(memos)
      setMemos(memos ?? [])
    })
  }, [])
  const handleClick = (memo: Memo, index: number) => {
    setMemo(memo)
    setIndex(index)
    setFlag(true)
  }
  const handleClickHeader = () => {
    if (flag) {
      openMemos()
    } else {
      const date = getDate()
      const newMemo = new InitMemo('', date)
      setMemo(newMemo)
      const newMemos = [...memos, newMemo]
      setMemoToStorage(newMemos)
      setMemos(newMemos)
      setIndex(memos.length)
      setFlag(true)
    }
  }
  const openMemos = () => {
    setFlag(false)
    setTimeout(()=>{},1000)
  }
  const openSnackbar = () => {
    setSnackbar(false)
    setSnackbar(true)
    setTimeout(() => {
      setSnackbar(false)
    }, 1000)
  }
  const handleClickDelete = async(index: number, event: React.MouseEvent) => {
    const copy = [...memos]
    copy.splice(index, 1)
    event.stopPropagation()
    await setMemoToStorage(copy)
    setMemos(copy)
  }
  return (
    <>
      <div className="bg-black" style={{ width: 350, minHeight: 600, height: 600 }}>
        <div className={flag ? "text-yellow-400 px-2 pt-2 font-bold fixed bg-black w-full flex justify-between" : "text-white px-2 pt-2 pb-6 font-bold text-2xl fixed bg-black w-full flex justify-between"} style={{ transition: 'font-size 300ms, color 300ms' }}>{flag ? <button onClick={() => openMemos()}>＜メモ</button> : <p>メモ</p>}<button onClick={() => handleClickHeader()}>{flag ? '完了' : '📝'}</button></div>
        <div className={snackbar ? "top-2 left-1/2 fixed text-gray-400" : "top-0 left-1/2 fixed text-transparent"} style={{ transition: 'color 400ms, top 400ms' }}>{snackbar ? 'saved!!':''}</div>
        <div className={flag ? "w-full pt-10 pb-20 px-2 bg-black h-full" : "w-full py-20 px-2 bg-black h-full"}>
          {flag ?
            <EditMemo memos={memos} text={memo.text} date={memo.date} id={memo.id} memoIndex={index} updateMemos={setMemos} openSnackbar={openSnackbar}></EditMemo>
            :
            <div className="w-full px-7 rounded" style={{ background: '#202020' }}>
              {(memos && memos.length > 0) ? memos.map((memo, i) => {
                return (
                  <div className="py-1 border-b-2 border-gray-800 cursor-pointer" onClick={() => handleClick(memo, i)}>
                    <p className="text-white font-bold" style={{overflow: 'hidden', height: '1.8em', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{memo.text}</p>
                    <div className="flex justify-between">
                      <p className="text-gray-400">{memo.date}</p>
                      <button className="hover:bg-gray-600 rounded px-1" onClick={(e)=>handleClickDelete(i,e)}>🗑️</button>
                    </div>
                  </div>
                )
              }) : <p className="text-white py-2">please give me memo</p>}
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default Memos;
