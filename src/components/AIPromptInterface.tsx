
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, Store, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AIPromptInterface = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const placeholders = [
    "I'm looking for a hunter jumper for my daughter who's been riding for 3 years...",
    "I need to sell my 12-year-old warmblood gelding, great for intermediate riders...",
    "Just browsing to see what's available in the $30k-50k range...",
    "Looking for a suitable mount for A/O hunters, must be safe and reliable..."
  ];

  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder(prev => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickAction = (action: 'buying' | 'selling' | 'browsing') => {
    navigate('/auth', { state: { userType: action } });
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-white mb-2">
            Tell us what you're looking for
          </h3>
          <p className="text-white/70">
            Our AI will help match you with the perfect horses or buyers
          </p>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholders[currentPlaceholder]}
            className="w-full min-h-[120px] p-4 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 resize-none text-lg placeholder:text-white/40 text-white backdrop-blur-md transition-all duration-300"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => handleQuickAction('buying')}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 px-6 py-3"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            I'm Buying
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          
          <Button
            onClick={() => handleQuickAction('selling')}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 px-6 py-3"
          >
            <Store className="h-5 w-5 mr-2" />
            I'm Selling
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          
          <Button
            onClick={() => handleQuickAction('browsing')}
            className="bg-neutral-700 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 px-6 py-3"
          >
            <Eye className="h-5 w-5 mr-2" />
            Just Browsing
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {prompt && (
          <div className="text-center">
            <Button
              onClick={() => navigate('/auth', { state: { prompt } })}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 px-8 py-3"
            >
              Get Started
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
