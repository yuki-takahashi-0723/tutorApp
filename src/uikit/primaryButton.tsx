import { Button } from '@material-ui/core'
import React from 'react'




type Props = {
    label : string
    onClick :  () => void
}


const PrimaryButton:React.FC<Props> = (props) => {
    return(
        <Button
        style={{margin: '10px', width:'130px'}}
        color='primary'
        variant='contained'
        onClick={()=>props.onClick()}
        >
            {props.label}
        </Button>
    )
}

export default PrimaryButton