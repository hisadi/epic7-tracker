import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Roster from './pages/Roster'
import TeamBuilder from './pages/TeamBuilder'
import Farming from './pages/Farming'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Roster />} />
          <Route path="/teams" element={<TeamBuilder />} />
          <Route path="/farming" element={<Farming />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
