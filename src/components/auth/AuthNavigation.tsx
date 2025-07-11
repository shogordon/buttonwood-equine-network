
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';

const AuthNavigation = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl glass-light flex items-center justify-center">
              <Logo />
            </div>
            <span className="text-xl font-semibold text-white">
              The Aisle
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-white/70 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/pricing" className="text-white/70 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link to="/how-it-works" className="text-white/70 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link to="/trust" className="text-white/70 hover:text-white transition-colors">
              Trust & Safety
            </Link>
            <Link to="/blog" className="text-white/70 hover:text-white transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavigation;
