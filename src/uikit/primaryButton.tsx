import { Button } from '@material-ui/core'
import React from 'react'


type Props = {
    label : string
    onClick :  () => void
}


const PrimaryButton:React.FC<Props> = (props) => {
    return(
        <Button
        color='primary'
        variant='outlined'
        onClick={()=>props.onClick()}
        >
            {props.label}
        </Button>
    )
}

export default PrimaryButton