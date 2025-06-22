
interface AuthCardProps {
  isSignUp: boolean;
  children: React.ReactNode;
}

const AuthCard = ({ isSignUp, children }: AuthCardProps) => {
  return (
    <div 
      className="rounded-lg shadow-2xl border border-white/10 backdrop-blur-2xl overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Header */}
      <div className="flex flex-col space-y-1.5 p-6 text-center">
        <h3 className="text-2xl font-bold text-white">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h3>
      </div>
      
      {/* Content */}
      <div className="p-6 pt-0">
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
