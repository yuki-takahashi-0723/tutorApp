
import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../AuthSearvis'
import { store　} from '../firebase/config'
import { AddButton, ListCard } from '../uikit'
import FormDialog from '../uikit/FormDialog'
import * as H from 'history'
import styled from 'styled-components'
import GraphPaper from '../img/banner-1571861_1920.jpg'

const Allwrap = styled.div`
    margin : 0;
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(rgba(255, 254, 179, 0.925), rgba(255, 254, 179, 0.6)), url(${GraphPaper}) 
    center / cover;
`
const Title = styled.h1`
    margin: 0;
`

const CardsWrap = styled.div`
    @media (min-width:600px){
        display:flex;
        flex-wrap:wrap;  
    }

`

const CardWrap = styled.div`
    margin:20px;
    @media (min-width:600px){
        width:230px;
    }
`



type Props = {
    location: {
        state:{
            userId : string
            name : string
        }
    }
    history : H.History

}
type diary = {
    title :string
    day : string
    content: string
}[]



const DiaryList:React.FC<Props> = (props) => {
    const user = useContext(AuthContext)
    const uid = user.crrentUser?.uid
    
    const [diarys,setdaiarys]=useState<diary>([])
    const [userName,setUserName]=useState('')
    const [userId,setUserId]=useState('')
    const [open,setOpen]=useState(false)
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const handleOpen = () =>{
        setOpen(true)
    }
    const handleClose = () => {
        setTitle('')
        setContent('')
        setOpen(false)
    }
    const inputTitle = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.target.value)
    }
    const inputContent = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setContent(e.target.value)
    }
    
    
    
    
    const addDiary = () => {
        const timeData = new Date()
        const year = timeData.getFullYear()
        const month = timeData.getMonth()+1
        const day = timeData.getDate()
        diarys.unshift({title: title, day: `${year}年　${month}月　${day}日`, content: content})
        store.collection(`master:${uid}`).doc(userId).update({
            diarys : diarys.reverse(),
        })
       handleClose()
    }

    const refDiary = (index:number) => {
        props.history.push({
            pathname: '/diaryitem',
            state : {
               index :　index,
               userId : userId
            }
        })
    }
    useEffect(()=> {
        if(uid !== undefined && props.location.state !== undefined){
          const usersId = props.location.state.userId
          
          store.collection(`master:${uid}`).doc(usersId)
            .onSnapshot(snapshot => {
              const data = snapshot.data()
              if(data !== undefined){
                  setUserName(data.userName)
                  setdaiarys(data.diarys.reverse()) 
                  setUserId(usersId)
                }
            });
        }
    }, [props.location.state,uid]); 
   
    return(
        <Allwrap>
            {
                props.location.state !== undefined && 
                <div>
                    <Title>学習振り返り一覧</Title>
                    <h2>名前：{userName}</h2>
                        <span>新しい振り返り記録を追加する</span>
                       <AddButton
                           onClick={()=>handleOpen()}
                       />
                       <FormDialog
                           title = '振り返り入力フォーム'
                           open = {open}
                           handleClose ={handleClose}  
                           onChangeFirst = {inputTitle}
                           onChangeSecond={inputContent}
                           value = {title}
                           label =　'記録のタイトルを入力'
                           valueSecond={content}
                           labelSecond={'今日教わったことや反省'}
                           type = 'text'
                           AddClick = {addDiary}
                       />
                    <CardsWrap>
                        {
                        diarys.map((diary,index)=>{
                                
                                return <CardWrap onClick={()=>refDiary(index)}> 
                                            <ListCard
                                                name={''}
                                                day={diary.day}
                                                diaryTitle={diary.title}
                                                key={index}
                                                color={'pink'}
                                            />  
                                        </CardWrap>
                            })
                        }
                    </CardsWrap>
                </div>
            }
            {
                props.location.state === undefined &&
                <Redirect to='/userlist'/>
            }
        </Allwrap>
    )
}

export default DiaryList