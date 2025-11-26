import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface LinkButtonProps {
  label: string;
  url: string;
  icon: LucideIcon;
  primary?: boolean;
}

export function LinkButton({ label, url, icon: Icon, primary = false }: LinkButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative flex items-center justify-between px-6 py-4 rounded-xl transition-all duration-300 overflow-hidden"
        style={{
          backgroundColor: primary 
            ? isHovered ? 'rgba(190, 242, 100, 0.2)' : 'rgba(190, 242, 100, 0.1)'
            : isHovered ? 'var(--gray-100)' : 'white',
          border: primary
            ? `1px solid ${isHovered ? 'var(--accent-500)' : 'rgba(190, 242, 100, 0.4)'}`
            : `1px solid ${isHovered ? 'var(--gray-300)' : 'var(--gray-200)'}`,
          transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
          boxShadow: isHovered 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
            : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}
      >
        {/* Background glow on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: primary
                ? 'radial-gradient(circle at left, rgba(190, 242, 100, 0.15), transparent)'
                : 'radial-gradient(circle at left, rgba(243, 244, 246, 0.8), transparent)'
            }}
          />
        )}

        {/* Content */}
        <div className="relative flex items-center gap-3 z-10">
          <div
            className="p-2 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: primary
                ? isHovered ? 'var(--accent-500)' : 'rgba(190, 242, 100, 0.3)'
                : isHovered ? 'var(--gray-200)' : 'var(--gray-100)',
            }}
          >
            <Icon
              className="w-5 h-5 transition-colors duration-300"
              style={{
                color: primary
                  ? isHovered ? 'var(--gray-950)' : 'var(--gray-800)'
                  : isHovered ? 'var(--gray-700)' : 'var(--gray-600)'
              }}
            />
          </div>
          <span
            className="transition-colors duration-300"
            style={{
              fontSize: '16px',
              fontWeight: 400,
              color: primary
                ? isHovered ? 'var(--gray-900)' : 'var(--gray-800)'
                : isHovered ? 'var(--gray-900)' : 'var(--gray-700)'
            }}
          >
            {label}
          </span>
        </div>

        {/* Arrow indicator */}
        <div
          className="relative z-10 transition-all duration-300"
          style={{
            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            opacity: isHovered ? 1 : 0.5
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke={primary ? 'var(--gray-800)' : 'var(--gray-600)'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}