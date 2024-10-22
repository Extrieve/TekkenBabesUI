import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to the Tekken Hotness Battle!
      </h1>
      <Link to="/battle">
        <Button>Start Battle</Button>
      </Link>
      <Link to="/leaderboard" className="mt-4">
        <Button variant="secondary">View Leaderboard</Button>
      </Link>
    </div>
  );
}

export default LandingPage;
