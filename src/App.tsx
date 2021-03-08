import React from 'react'
import {
    HashRouter,
    Switch,
    Route
} from 'react-router-dom'
import { AuthProvider } from './AuthSearvis'
import LoggedInRoute from './LoggedInRoute'
import DiaryItem from './pages/diaryItem'
import DiaryList from './pages/diaryList'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Top from './pages/top'
import UserList from './pages/usersList'
import './style.css'
import styled from 'styled-components'

const AllWrap = styled.div`
  margin:0;
  padding:0;
  font-family: 'HanziPen SC';
  width:100%;
  height:100%;
`

const App:React.FC = () =>{
  return(
    <AllWrap>
      <AuthProvider>
          <HashRouter>
            <Switch>
              <Route exact path='/signup' component={SignUp}/>
              <Route exact path='/signIn' component={SignIn}/>
              <LoggedInRoute path='/userlist' component={UserList}/>
              <Route exact path='/diarylist' component={DiaryList}/>
              <Route exact path='/diaryitem' component={DiaryItem}/>
              <Route exact path='(/)?'component= {Top}/>      
            </Switch>
          </HashRouter>
      </AuthProvider>
    </AllWrap>
  )
}

export default App