import type { SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="none"
    {...props}
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    
    <circle cx="50" cy="50" r="45" fill="url(#grad1)"/>
    
    <path d="M30 45 L50 30 L70 45 L70 60 L50 70 L30 60 Z" fill="white" opacity="0.95"/>
    
    <path d="M30 45 L50 55 L70 45" stroke="url(#grad1)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    
    <circle cx="35" cy="35" r="2.5" fill="url(#grad2)"/>
    <circle cx="50" cy="28" r="2.5" fill="url(#grad2)"/>
    <circle cx="65" cy="35" r="2.5" fill="url(#grad2)"/>
    <circle cx="42" cy="42" r="2" fill="url(#grad2)" opacity="0.7"/>
    <circle cx="58" cy="42" r="2" fill="url(#grad2)" opacity="0.7"/>
    
    <path d="M35 35 L42 42 M50 28 L42 42 M50 28 L58 42 M65 35 L58 42" stroke="url(#grad2)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
  </svg>
);

export default Logo;
