
const BrowseBackground = () => {
  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div style={{
          background: 'radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(ellipse at bottom center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)'
        }} className="absolute inset-0" />
      </div>

      {/* Floating Elements */}
      <div className="floating-element w-96 h-96 -top-48 -left-48 animate-float" />
      <div className="floating-element w-64 h-64 top-1/4 -right-32 animate-float" style={{ animationDelay: '2s' }} />
      <div className="floating-element w-48 h-48 bottom-1/4 left-1/4 animate-float" style={{ animationDelay: '4s' }} />
    </>
  );
};

export default BrowseBackground;
