import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-ivory-50 to-french-blue-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-xl font-semibold text-slate-gray-800">
                Buttonwood Bluebook
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-slate-gray-800 font-medium transition-colors">
                About
              </Link>
              <Link to="/pricing" className="text-slate-gray-600 hover:text-slate-gray-800 transition-colors">
                Pricing
              </Link>
              <Link to="/trust" className="text-slate-gray-600 hover:text-slate-gray-800 transition-colors">
                How It Works
              </Link>
              <Link to="/trust" className="text-slate-gray-600 hover:text-slate-gray-800 transition-colors">
                Trust & Safety
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:scale-105 transition-all duration-300 px-6 py-2.5 font-semibold">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-lg border border-white/20">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-gray-800 mb-4">
                A Letter from our Founder
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-french-blue-600 mb-2">
                Dr. Shoshana Gordon
              </h2>
              <p className="text-lg text-slate-gray-600 font-medium">
                Veterinarian. Rider. Seller. Buyer. Problem-Solver.
              </p>
            </div>

            {/* Letter Content */}
            <div className="prose prose-lg max-w-none text-slate-gray-700 leading-relaxed space-y-6">
              <p>
                This platform began as a personal pivot — what some might call a midlife crisis.
              </p>
              
              <p>
                After years of riding competitively, all of my senior horses had officially retired. At the same time, I found myself feeling burned out in veterinary medicine. I took a leap of faith on a young sales horse I found in a random video. Then another. And another. What started as a side project quickly turned into something much bigger.
              </p>

              <p>
                Over the years, I've seen countless sales deals — and far too many scams. I've been the buyer. I've been the seller. I've even been the veterinarian trying to help someone make sense of a mess. And far too often, I've watched good, honest people get burned by middlemen, misinformation, and murky deals.
              </p>

              <p>
                The best horses I've ever sold were either developed from the ground up or bought directly from owners. The worst situations almost always involved someone in the middle prioritizing their payout over honesty, horsemanship, or the buyer's goals. And the truth is, many buyers don't even know what they're looking at — they rely on their trainers (who often have the best intentions) or get funneled into systems where the real details are hidden.
              </p>

              <p className="text-xl font-semibold text-slate-gray-800">
                It shouldn't be this hard. And it doesn't have to be.
              </p>

              <p>
                I've heard enough horror stories to know this industry needs a reset. The buyers who don't know how to research a horse. The sellers frustrated with failed vettings and tire-kickers. The people who paid double or triple what a horse was worth because of backdoor commissions. The trainers caught in the middle of decisions they didn't want to own. The horses misrepresented, mismanaged, or sold to the wrong homes for a quick buck.
              </p>

              <p>
                Our sport is at risk of becoming even more inaccessible — not because people aren't willing to pay for quality, but because the way we do business is broken. I'm not saying commissions are bad — trainers should be paid for their time and expertise. But I do believe we deserve a system where all parties know what they're paying for, who's involved, and why.
              </p>

              <p className="text-xl font-semibold text-slate-gray-800">
                It's time for something better. A curated network built on honesty, structure, and respect — not games.
              </p>

              <p>
                This platform is my way of helping push the industry forward. It's a place for sellers who still believe in doing right by their horses and their clients. A place where buyers can learn, search, and connect without being left in the dark. A place where trainers can support their clients with clarity, not confusion.
              </p>

              <p>
                We can still make good deals — and we can still have fun doing it. We owe that to our sport, our clients, and most of all, to the horses.
              </p>

              <p className="text-xl font-semibold text-slate-gray-800">
                Let's rebuild the trust. Let's raise the standard. Let's change how horses are bought and sold — together.
              </p>

              <div className="text-right mt-8 pt-6 border-t border-slate-gray-200">
                <p className="text-lg font-semibold text-slate-gray-800">
                  — Dr. Shoshana Gordon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
