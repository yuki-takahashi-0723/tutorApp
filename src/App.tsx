import React from 'react'
import {
    HashRouter,
    Switch,
    Route
} from 'react-router-dom'
import UserList from './pages/usersList'

const App:React.FC = () =>{
  return(
    <>
      <HashRouter>
        <Switch>
          <Route exact path='/userlist' component={UserList}/>
         
        </Switch>
      </HashRouter>
    </>
  )
}

export default App