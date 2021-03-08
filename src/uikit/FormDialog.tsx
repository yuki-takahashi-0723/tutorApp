import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { InputArea } from '.'
import styled from 'styled-components'

const FormContentWrap = styled.div`
    text-align:center;
`


type Props = {
    title : string
    open : boolean
    handleClose : () => void   
    onChangeFirst : (e:React.ChangeEvent<HTMLInputElement>) => void
    onChangeSecond? : (e:React.ChangeEvent<HTMLInputElement>) => void
    value : string 
    valueSecond? : string 
    label : string 
    labelSecond? : string
    type : string
    AddClick : () => void
}



const FormDialog:React.FC<Props>=(props)=>{
    return(
        <Dialog
            fullWidth={true}
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <FormContentWrap>

                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    <div>
                        <InputArea
                            required = {true}
                            fullWidth={true}
                            multiline={false}
                            rows={1}
                            onChange={props.onChangeFirst}
                            value={props.value}
                            label={props.label}
                            type = {props.type} 
                        />
                    </div>
                    <div>
                        {
                        props.onChangeSecond && props.labelSecond &&((props.valueSecond==='')||props.valueSecond) &&
                                <InputArea
                                    required = {true}
                                    fullWidth={false}
                                    multiline={true}
                                    rows={5}
                                    onChange={props.onChangeSecond}
                                    value={props.valueSecond}
                                    label={props.labelSecond}
                                    type = {props.type} 
                                />   
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.AddClick}>
                        登録する
                    </Button>
                    <Button onClick={()=>props.handleClose()}>
                        閉じる
                    </Button>
                </DialogActions>
            </FormContentWrap>
        </Dialog>
    )
}

export default FormDialog