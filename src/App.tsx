import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BattlePage from './pages/BattlePage';
import CharacterPage from './pages/CharacterPage';
import LandingPage from './pages/LandingPage';
import LeaderboardPage from './pages/LeaderBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/battle" element={<BattlePage />} />
        <Route path="/character/:id" element={<CharacterPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
