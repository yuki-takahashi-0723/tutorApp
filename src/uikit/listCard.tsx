import { Avatar, Card, CardContent, CardHeader } from '@material-ui/core'
import React from 'react'

type Props = {
    avater?:string
    name:string
    day?:string
    diaryTitle?:string
    color?:string

}


const ListCard:React.FC<Props> = (props) => {
    return(
        <Card　style={{backgroundColor:props.color}}>
            {
                (props.avater && props.name) &&
                <CardHeader
                   avatar={
                   <Avatar aria-label="recipe">
                       {props.avater}
                   </Avatar>
                   }
                   title={props.name}
                />

            }
             {
                 (props.diaryTitle && props.day ) &&
                <CardContent>
                        <p>{props.day}</p>
                        <p>{props.diaryTitle}</p>
                </CardContent>

             }
        </Card>
    )
}

export default ListCard