import React,{useState} from 'react';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert alert={alert}/>
          <div className='container'>
          <Routes>
          <Route exact path="/Home" element={<Home showAlert={showAlert}/>}> </Route>
          <Route exact path="/About" element={<About />}> </Route>
          <Route exact path="/Login" element={<Login showAlert={showAlert}/>}> </Route>
          <Route exact path="/Signup" element={<Signup showAlert={showAlert}/>}> </Route>
          </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  )
}

export default App
