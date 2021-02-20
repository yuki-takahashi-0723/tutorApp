import React from 'react'

type Props = {
    diaryTitle: string
    day : string
    diaryContent : string
}

const DiaryItem:React.FC<Props> = (props) => {
    return(
        <>
            <div style={{border: '1px black solid '}}>
                <h2>タイトル：{props.diaryTitle}</h2>
                <p>日付：{props.day}</p>
                <p>内容</p>
                <p>{props.diaryContent}</p>
            </div>

        </>
    )
}

export default DiaryItem