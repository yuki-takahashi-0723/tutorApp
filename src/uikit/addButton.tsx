import React from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IconButton } from '@material-ui/core';

type Props = {
    onClick : ()=>void
}

const AddButton:React.FC<Props> = (props) => {
    return(
       <IconButton
            onClick={()=>props.onClick()}
       >
           <AddCircleOutlineIcon/>
       </IconButton>
    )
}

export default AddButton