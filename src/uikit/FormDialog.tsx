import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { InputArea } from '.'

type Props = {
    title : string
    open : boolean
    handleClose : () => void   
    onChangeFirst : (e:React.ChangeEvent<HTMLInputElement>) => void
    onChangeSecond? : (e:React.ChangeEvent<HTMLInputElement>) => void
    value : string
    label : string
    type : string
    AddClick : () => void
}


const FormDialog:React.FC<Props>=(props)=>{
    return(
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <InputArea
                    required = {true}
                    fullWidth={false}
                    multiline={false}
                    rows={1}
                    onChange={props.onChangeFirst}
                    value={props.value}
                    label={props.label}
                    type = {props.type} 
                />
                {
                    props.onChangeSecond &&
                        <InputArea
                            required = {true}
                            fullWidth={false}
                            multiline={false}
                            rows={1}
                            onChange={props.onChangeSecond}
                            value={props.value}
                            label={props.label}
                            type = {props.type} 
                        />
                    
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={props.AddClick}>
                    登録する
                </Button>
                <Button onClick={()=>props.handleClose()}>
                    閉じる
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FormDialog