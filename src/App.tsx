import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './Page/LoginPage'
import RegisterPage from './Page/RegisterPage'
import AttendancePage from './Page/AttendancePage'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/attendance' element={<AttendancePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
