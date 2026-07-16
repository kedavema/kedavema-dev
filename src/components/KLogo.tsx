import Link from "next/link";

export function KLogo() {
  return (
    <Link href="/" className="k-logo" aria-label="Kevin Velázquez — home">
      <svg
        className="k-logo__svg"
        width="26"
        height="26"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <line
          className="k-logo__pipe"
          x1="19"
          y1="10"
          x2="19"
          y2="54"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <g className="k-logo__chevron">
          <path
            d="M47 10 27 32 47 54"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    </Link>
  );
}
