import React, { useState } from 'react';
import { InputArea, ListCard, PrimaryButton } from './uikit';

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
      
    </>

  )
}

export default App 