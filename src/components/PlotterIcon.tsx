const PlotterIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Plotter icon"
  >
    <path
      d="M2 14V10C2 8.89543 2.89543 8 4 8H20C21.1046 8 22 8.89543 22 10V14"
      stroke="#06b6d4"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect
      x="5"
      y="12"
      width="14"
      height="8"
      rx="1"
      fill="#06b6d4"
      fillOpacity="0.2"
      stroke="#06b6d4"
      strokeWidth="2"
    />
    <path
      d="M8 4H16"
      stroke="#06b6d4"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 15H12.01"
      stroke="#06b6d4"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export default PlotterIcon;
