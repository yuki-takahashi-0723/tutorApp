import React from 'react'
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { IconButton } from '@material-ui/core';

type Props = {
    label : string
    onClick : ()=>void
}

const InputButton:React.FC<Props> = (props) => {
    return(
       <IconButton
            onClick={()=>props.onClick()}
       >
           <span style={{fontSize:'15px',margin:'5px'}}>{props.label}</span>
           <BorderColorIcon/>
       </IconButton>
    )
}

export default InputButton