import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../AuthSearvis'
import { fieldValue, store } from '../firebase/config'
import { AddButton, InputArea } from '../uikit'

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
    messages: string[]
}

const DiaryItem:React.FC<Props> = (props) => {
    const user = useContext(AuthContext)
    const uid = user.crrentUser?.uid
    const [diary,setDiary]=useState<diary>({title:'',day:'',content:'',messages:[]})
    const [message,setMessage]=useState('')
    const inputMessage = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setMessage(e.target.value)
    }

    const addMessage = () => {
        if(message === ''){
            return false
        }
        store.collection(`master:${uid}`).doc(props.location.state.userId).update({
            diarys : fieldValue.arrayRemove(diary)
        })
        if(diary.messages === undefined){
            diary.messages = []
            diary.messages.push(message)
            console.log(diary)
        }else{
            diary.messages.push(message)
            console.log(diary)
        }
        store.collection(`master:${uid}`).doc(props.location.state.userId).update({
            diarys : fieldValue.arrayUnion(diary)
        })
        setMessage('')
        
    }

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
   
    // console.log(diary.messages)

   
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
            <h2>スタッフよりメッセージ</h2>
            {
                diary.messages &&
                diary.messages.map((message,index)=>{
                    return <p key={index}>{message}</p>
                })
            }
            
            <InputArea
                required = {true}
                fullWidth={true}
                multiline={true}
                rows={7}
                onChange={inputMessage}
                value={message}
                label={'メッセージを残せます'}
                type = {'text'}
            
            />
            <span>メッセージを追加する</span>
            <AddButton
                onClick={()=>addMessage()}
            />

        </>
    )
}

export default DiaryItem