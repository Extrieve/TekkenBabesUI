import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import BattlePage from './pages/BattlePage';
import CharacterPage from './pages/CharacterPage';
import LandingPage from './pages/LandingPage';
import LeaderboardPage from './pages/LeaderBoard';
import NotFoundPage from './pages/NotFoundPage';

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <LandingPage /> },
    { path: '/battle', element: <BattlePage /> },
    { path: '/character/:id', element: <CharacterPage /> },
    { path: '/leaderboard', element: <LeaderboardPage /> },
    { path: '*', element: <NotFoundPage /> },
  ]);
  return routes;
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
