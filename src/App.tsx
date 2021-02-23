import React, { useEffect, useState } from 'react';
import { store } from './firebase/config';
import DiaryList from './pages/diaryList';
import UserList from './pages/usersList';
// import DiaryItem from './pages/diaryItem';
import { AddButton, InputArea, ListCard, PrimaryButton } from './uikit';

// type user = {
//   id : string,
//   data : {
//       avater : string
//       diarys : {day: string, title: string, content:string}[]
//       userName : string
//   }
// }[]
function App() {
  const [value, setValue] = useState('');
  const testChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };



  // const [data, setData] = useState<any>([]);
  // useEffect(() => {
  //   store.collection('masterUsers')
  //     .onSnapshot(snapshot => {
  //       return setData(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
  //     });
  // }, []);
  
  // 　const testData = {
  //   masterUser1:{
  //       masterId:'first',
  //       users:[
  //               {
  //                 name:'雪',
  //                 avater:'a',
  //                 diarys:[
  //                     {
  //                       title:'最初の教育',
  //                       day : '1月1日',
  //                       content:'あああああああああああああああああ'
  //                     },
  //                     {
  //                       title:'二日目の教育',
  //                       day : '1月2日',
  //                       content:'いいいいいいいいいいいいいいいいいい'
  //                     },
  //                     {
  //                       title:'三日目の教育',
  //                       day : '1月3日',
  //                       content:'今日は楽しかった'
  //                     },
  //                 ]
  //               },
  //               {
  //                 name:'太郎',
  //                 avater:'b',
  //                 diarys:[
  //                     {
  //                       title:'最初の教育',
  //                       day : '2月1日',
  //                       content:'私は二人目の新人です'
  //                     }
  //                 ]
  //               },
  //     ]
  //   },
  //   masterUser2:{
  //       masterId:'second',
  //       users:[
  //               {
  //                 name:'うどんまる',
  //                 avater:'a',
  //                 diarys:[
  //                     {
  //                       title:'最初の教育',
  //                       day : '４月６日',
  //                       content:'うどんうどんうどん'
  //                     }
  //                 ]
  //               },
  //     ]
  //   },
  // }
  //ルーティングを設定するまではここにテスト表記を行う
  return (
    <>
      <UserList
        uid = {'aaaaa'}
      />
      <PrimaryButton
        label={'テスト'}
        onClick={() => console.log('aaaa')} />
      <InputArea
        required={true}
        fullWidth={false}
        multiline={false}
        rows={1}
        onChange={testChange}
        value={value}
        label={'テスト'} />

      <ListCard
        name='田中太郎'
        day='1月1日'
        diaryTitle='aaaaaa' />
      <AddButton
        onClick={() => console.log('ここではリントの言葉で話せ！')} />







    </>

  );
}

export default App 