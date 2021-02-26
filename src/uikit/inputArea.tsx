import { TextField } from '@material-ui/core'
import React from 'react'

type Props = {
    fullWidth:boolean
    required : boolean
    multiline:boolean
    rows : number
    label:string 
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void
    value:string
    type : string
}


const InputArea:React.FC<Props> = (props) => {
    return(
        <>
        <TextField
            variant='outlined'
            color='primary'
            margin='dense'
            required = {props.required}
            fullWidth={props.fullWidth}
            multiline={props.multiline}
            rows={props.rows}
            onChange={props.onChange}
            value={props.value}
            label={props.label}
            type = {props.type}
        />
        </>
    )
}

export default InputArea