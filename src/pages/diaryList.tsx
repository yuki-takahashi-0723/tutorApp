
import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../AuthSearvis'
import { store　} from '../firebase/config'
import { AddButton, ListCard } from '../uikit'
import FormDialog from '../uikit/FormDialog'


type Props = {
    location: {
        state:{
            userId : string
            name : string
        }
    }
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
        setTitle('')
        setContent('')
    }

    useEffect(()=> {
        if(uid !== undefined || props.location.state !== undefined){
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
        <>
            {
                props.location.state !== undefined && 
                
                <div>
                    <h2>{userName}</h2>
                    {
                    diarys.map((diary,index)=>{
                            return <ListCard
                                        name={''}
                                        day={diary.day}
                                        diaryTitle={diary.title}
                                        key={index}
                                    />  
                        })
                    }
                </div>
            }
            {
                props.location.state === undefined &&
                <Redirect to='/userlist'/>
            }
             <span>新しい記録を追加する</span>
            <AddButton
                onClick={()=>handleOpen()}
            />
            <FormDialog
                title = '記録フォーム'
                open = {open}
                handleClose ={handleClose}  
                onChangeFirst = {inputTitle}
                onChangeSecond={inputContent}
                value = {title}
                label =　'記録のタイトルを入力'
                valueSecond={content}
                labelSecond={'今日教わったことや反省の記録'}
                type = 'text'
                AddClick = {addDiary}
            />
        </>
    )
}

export default DiaryList