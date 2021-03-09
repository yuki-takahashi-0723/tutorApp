import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../AuthSearvis'
import {  fieldValue, store } from '../firebase/config'
import { AddButton, DeleteButton, InputArea, InputButton, PrimaryButton } from '../uikit'
import SpeechRecognition,{useSpeechRecognition} from 'react-speech-recognition' 
import styled from 'styled-components'
import GraphPaper from '../img/banner-1571861_1920.jpg'


const Title = styled.h1`
    margin: 0;
    background: linear-gradient(rgba(179, 255, 239, 0.925), rgba(255, 254, 179, 0.6));
    `

    const DiaryUserArea = styled.div`
        padding : 10px;
        margin:0;
        position: relative;
        background: linear-gradient(rgba(179, 255, 239, 0.925), rgba(255, 254, 179, 0.6)), url(${GraphPaper}) 
        center / cover;
    `
const ContentsWrap = styled.div`
    margin: 0 30px 0 30px ;
    
`
const DiaryContentWrap = styled.div`
    border:black solid 0.5px;
    min-height:200px;

`
const DiaryMessageWrap = styled.div`
    border:#93fc0a solid 0.5px;
    min-height:200px;
    margin-bottom:10px;
    background-color:#e7fa7b;
`
 

const DiaryContent = styled.p`
    margin:0;
    padding:10px;
    white-space:pre-line;
`
const VoiceArea = styled.div`
    text-align:center;
    background:  linear-gradient(rgba(179, 255, 239, 0.925), rgba(255, 254, 179, 0.6)), url(${GraphPaper});
    padding:10px;

`


const VoiceInputTitle = styled.p`
    margin:10px;
`

const VoiceInputPreview = styled.div`
    text-align:center;
    height:200px;
    h3 {
        margin:0;
    }
    span {
        font-size:20px;
        font-weight:bold;
    }
    p {
        border:black solid 0.2px;
        margin:0;
    }
`


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
    // const handleSpeak = (text:string) => {
    //     console.log('スピーチ開始')
    //     const options = new SpeechSynthesisUtterance(text)
    //     options.lang = 'ja-Jp'
    //     window.speechSynthesis.speak(options)    
    // }
    
    
    
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



    const {transcript, resetTranscript} = useSpeechRecognition()


 
    
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
            
            <Title>教育日誌</Title>
            <DiaryUserArea>
                <ContentsWrap>
                    <div>
                        <h2 style={{marginTop:'0'}}>タイトル</h2>
                        <p>{diary.title}</p>
                        <h2>日付</h2>
                        <p>{diary.day}</p>
                        <h2>内容</h2>
                        <DiaryContentWrap>
                            <DiaryContent>
                                {diary.content}
                            </DiaryContent>
                        </DiaryContentWrap>
                    </div>
                </ContentsWrap>

            </DiaryUserArea>

            <ContentsWrap>
                <h3>スタッフよりメッセージ</h3>
                {
                    diary.messages &&
                    diary.messages.map((message,index)=>{
                        return(
                          <DiaryMessageWrap>
                              <DiaryContent key={index}>{message}</DiaryContent>
                          </DiaryMessageWrap>
                        )
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
                </ContentsWrap>
                <VoiceArea>
                    <ContentsWrap>
                        <VoiceInputTitle>音声入力はこちらから</VoiceInputTitle>
                        {
                            transcript &&
                            <VoiceInputPreview>
                                　      <span>音声入力プレビュー</span>
                                        <p>{transcript}</p>
                                        <InputButton label={'音声情報を入力欄に書き込む'}　onClick={()=>setMessage(message + transcript)}/>
                                        <DeleteButton label={'音声情報を削除する'}　onClick={()=>resetTranscript()}/>

                            </VoiceInputPreview>
                        }
                        <PrimaryButton label={'音声入力開始'}　onClick={()=>SpeechRecognition.startListening()}/>
                        <PrimaryButton label={'音声入力終了'}　onClick={()=>SpeechRecognition.stopListening()}/>
                    
                    </ContentsWrap>
                </VoiceArea>

        </>
    )
}

export default DiaryItem