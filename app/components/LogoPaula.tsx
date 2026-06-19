export default function PaulapaloozaLogo() {
  return (
    <div className="logo-container">
      <svg viewBox="0 0 900 200" preserveAspectRatio="xMidYMid meet">
        <defs>
          <path id="logo-curve" d="M 50 140 Q 450 20 850 140" />
        </defs>

        <text className="logo-text">
          <textPath href="#logo-curve" startOffset="50%" textAnchor="middle">
            Paulapalooza
          </textPath>
        </text>
      </svg>
    </div>
  );
}
