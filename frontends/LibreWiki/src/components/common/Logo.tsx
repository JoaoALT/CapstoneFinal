import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130 30"
      aria-label="LibreWiki logo"
      {...props}
    >
      <text
        x="0"
        y="23"
        fontFamily="'PT Sans', sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="currentColor"
      >
        LibreWiki
      </text>
    </svg>
  );
}
