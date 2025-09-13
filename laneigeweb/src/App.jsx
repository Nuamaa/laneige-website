import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home'

function App() {

  return (
    <>
      <Router basename="/laneige-website">
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>

      </Router>
    </>
  )
}

export default App
