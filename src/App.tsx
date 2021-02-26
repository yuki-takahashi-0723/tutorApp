import React from 'react'
import {
    HashRouter,
    Switch,
    Route
} from 'react-router-dom'
import { AuthProvider } from './AuthSearvis'
import LoggedInRoute from './LoggedInRoute'
import DiaryList from './pages/diaryList'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import UserList from './pages/usersList'

const App:React.FC = () =>{
  return(
    <>
      <AuthProvider>
          <HashRouter>
            <Switch>
              <Route exact path='/signup' component={SignUp}/>
              <Route exact path='/signIn' component={SignIn}/>
              <LoggedInRoute path='/userlist' component={UserList}/>
              <Route exact path='/diarylist' component={DiaryList}/>
            
            </Switch>
          </HashRouter>
      </AuthProvider>
    </>
  )
}

export default App