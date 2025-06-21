
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, ShoppingCart, Store, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AIPromptInterface = () => {
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
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
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
    <Card className="glass-card p-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-slate-gray-800 mb-2">
            Tell us what you're looking for
          </h3>
          <p className="text-slate-gray-600">
            Our AI will help match you with the perfect horses or buyers
          </p>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholders[currentPlaceholder]}
            className="w-full min-h-[120px] p-4 rounded-lg border-2 border-french-blue-200 focus:border-french-blue-500 focus:ring-2 focus:ring-french-blue-200 resize-none text-lg placeholder:text-slate-gray-400 bg-white/80 backdrop-blur-sm transition-all duration-300"
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
          />
          {showCursor && isTyping && (
            <div className="absolute bottom-4 right-4 w-0.5 h-6 bg-french-blue-600 animate-pulse" />
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => handleQuickAction('buying')}
            className="bg-french-blue-600 hover:bg-french-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            I'm Buying
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          
          <Button
            onClick={() => handleQuickAction('selling')}
            className="bg-burnt-orange-500 hover:bg-burnt-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Store className="h-5 w-5 mr-2" />
            I'm Selling
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          
          <Button
            onClick={() => handleQuickAction('browsing')}
            variant="outline"
            className="border-2 border-slate-gray-300 hover:border-slate-gray-400 text-slate-gray-700 hover:text-slate-gray-800 px-6 py-3 rounded-lg font-semibold bg-white/50 backdrop-blur-sm hover:bg-white/70 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
              className="bg-gradient-to-r from-french-blue-600 to-burnt-orange-500 hover:from-french-blue-700 hover:to-burnt-orange-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
