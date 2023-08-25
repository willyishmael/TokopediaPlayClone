import './App.css'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DetailVideo from './pages/DetailVideo'

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/video/:videoId' Component={DetailVideo} />
      </Routes>
    </Router>

  )
}

export default function App() {
  return (
    <>
      <Header />
      <AppRouter />
    </>
  )
}
