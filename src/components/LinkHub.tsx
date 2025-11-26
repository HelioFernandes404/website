import { ProfileCard } from "./ProfileCard";
import { GridPattern } from "./GridPattern";

export function LinkHub() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--gray-50)' }}>
      {/* Background grid pattern */}
      <GridPattern />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F9FAFB]/50 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <ProfileCard />
      </div>
      
      {/* Glow effect */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--accent-500)' }}
      />
    </div>
  );
}