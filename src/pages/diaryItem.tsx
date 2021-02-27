import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../AuthSearvis'
import { store } from '../firebase/config'
import { AddButton } from '../uikit'

type Props = {
    location: {
        state:{
           index : number
           userId : string
        }
    }
}
type diary ={
    title :string
    day : string
    content: string
}

const DiaryItem:React.FC<Props> = (props) => {
    const user = useContext(AuthContext)
    const uid = user.crrentUser?.uid
    const [diary,setDiary]=useState<diary>({title:'',day:'',content:''})
    useEffect(()=>{
        if(props.location.state !== undefined ){
            console.log(props.location.state.index)
            console.log(props.location.state.userId)
            const diaryIndex = props.location.state.index
            const userId = props.location.state.userId
            store.collection(`master:${uid}`).doc(userId)
                .onSnapshot(snapshot=>{
                    const diarysData = snapshot.data()
                    if(diarysData !== undefined){
                        setDiary(diarysData.diarys.reverse()[diaryIndex])
                      }
                })

        }
        
    },[props.location.state,uid])


   console.log(diary)
    return(
        <>
            {
                props.location.state === undefined && 
                <Redirect to='/userlist'/>
            }
            <div style={{border: '1px black solid '}}>
                <h2>タイトル：{diary.title}</h2>
                <p>日付：{diary.day}</p>
                <p>内容</p>
                <p>{diary.content}</p>
            </div>
            <h2>コメント</h2>
            <p>今日はよく頑張っていた！</p>
            <span>コメント追加する</span>
            <AddButton
                onClick={()=>console.log('aaaaa')}
            />

        </>
    )
}

export default DiaryItem