import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LinkButton } from "./LinkButton";
import profileData from "../data/profile.json";
import { getIcon } from "../utils/iconMapper";
import { ProfileData } from "../types/profile";

export function ProfileCard() {
  const profile = profileData as ProfileData;
  return (
    <div className="w-full max-w-2xl">
      {/* Main card */}
      <div 
        className="relative backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid var(--gray-200)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
        }}
      >
        {/* Top border accent */}
        <div 
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--accent-500), transparent)'
          }}
        />
        
        <div className="p-8 sm:p-12">
          {/* Profile image */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div 
                className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: 'var(--accent-500)' }}
              />
              <div
                className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-offset-4 ring-offset-white transition-all duration-300"
                style={{ 
                  ringColor: 'var(--gray-200)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                <ImageWithFallback
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Name and role */}
          <div className="text-center mb-6">
            <h1 
              className="mb-3"
              style={{ 
                fontSize: '48px',
                color: 'var(--gray-900)',
                fontWeight: 400
              }}
            >
              {profile.name}
            </h1>
            <p 
              className="mb-4"
              style={{ 
                fontSize: '18px',
                color: 'var(--gray-950)',
                fontWeight: 500
              }}
            >
              {profile.role}
            </p>
            <p 
              style={{ 
                fontSize: '16px',
                color: 'var(--gray-600)',
                fontWeight: 400,
                lineHeight: '150%',
                maxWidth: '500px',
                margin: '0 auto'
              }}
            >
              {profile.bio}
            </p>
          </div>

          {/* Divider */}
          <div 
            className="h-[1px] my-8 mx-auto max-w-md"
            style={{ backgroundColor: 'var(--gray-200)' }}
          />

          {/* Links */}
          <div className="space-y-3">
            {profile.links.map((link) => (
              <LinkButton
                key={link.id}
                label={link.label}
                url={link.url}
                icon={getIcon(link.iconName)}
                primary={link.primary}
              />
            ))}
          </div>
        </div>

        {/* Bottom corner accent */}
        <div 
          className="absolute bottom-0 right-0 w-32 h-32 opacity-5 pointer-events-none"
          style={{
            background: `radial-gradient(circle at bottom right, var(--accent-500), transparent)`
          }}
        />
      </div>

      {/* Footer text */}
      <div className="text-center mt-8">
        <p 
          style={{ 
            fontSize: '14px',
            color: 'var(--gray-500)',
            fontWeight: 400
          }}
        >
          Designed with precision · Built with React
        </p>
      </div>
    </div>
  );
}