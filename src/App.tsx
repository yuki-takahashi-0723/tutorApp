import React, { useState } from 'react';
import DiaryItem from './pages/diaryItem';
import { AddButton, InputArea, ListCard, PrimaryButton } from './uikit';

const App : React.FC = () => {

  const [value,setValue]=useState('')

  const testChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  //ルーティングを設定するまではここにテスト表記を行う
  return(
    <>
      <PrimaryButton
        label={'テスト'}
        onClick={()=>console.log('aaaa')}
      />
      <InputArea
        required = {true}
        fullWidth={false}
        multiline={false}
        rows={1}
        onChange={testChange}
        value={value}
        label={'テスト'}
      />
      
      <ListCard
        name='田中太郎'
        day='1月1日'
        diaryTitle='aaaaaa'
      />
      <AddButton
        onClick={()=>console.log('ここではリントの言葉で話せ！')}
      />
      <DiaryItem
        diaryTitle='今日はトランスファーを練習しました' 
        day='3月７日'
        diaryContent='今日は午前中は〇〇さんと一緒にトランスファーを練習しました。'
      />
      
    </>

  )
}

export default App 