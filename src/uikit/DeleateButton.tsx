import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

type Props = {
    label : string
    onClick : ()=>void
}

const DeleteButton:React.FC<Props> = (props) => {
    return(
       <IconButton
            onClick={()=>props.onClick()}
       >
           <span style={{fontSize:'15px',margin:'5px'}}>{props.label}</span>
           <DeleteIcon/>
       </IconButton>
    )
}

export default DeleteButton