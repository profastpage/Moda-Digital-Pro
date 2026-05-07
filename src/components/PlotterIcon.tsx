const PlotterIcon = ({ className = "" }: { className?: string }) => (
  <div className={`group/plotter relative inline-flex ${className}`}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Plotter icon"
    >
      {/* === Estructura del Plotter === */}
      <path
        d="M2 14V10C2 8.9 2.9 8 4 8H20C21.1 8 22 8.9 22 10V14"
        stroke="#06b6d4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 4H16"
        stroke="#06b6d4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="5"
        y="12"
        width="14"
        height="8"
        rx="1"
        fill="#06b6d4"
        fillOpacity="0.08"
        stroke="#06b6d4"
        strokeWidth="1.5"
      />

      {/* === Trail de tinta impresa — visible en hover === */}
      <rect
        x="6"
        y="14.2"
        width="12"
        height="2.6"
        rx="0.5"
        className="opacity-0 group-hover/plotter:opacity-100 transition-opacity duration-700 ease-out"
        fill="#06b6d4"
        fillOpacity="0.3"
      />

      {/* === Cabezal de impresión animado === */}
      <line
        x1="6"
        y1="15.5"
        x2="9"
        y2="15.5"
        stroke="#e2e8f0"
        strokeWidth="2.2"
        strokeLinecap="round"
        className="opacity-0 group-hover/plotter:opacity-100 group-active/plotter:opacity-100 transition-opacity duration-300"
      >
        <animate
          attributeName="x1"
          values="6;14;6"
          dur="2s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
        />
        <animate
          attributeName="x2"
          values="9;18;9"
          dur="2s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
        />
      </line>

      {/* === LED indicador === */}
      <circle cx="12" cy="17.8" r="0.7" fill="#06b6d4" fillOpacity="0.3">
        <animate
          attributeName="fill-opacity"
          values="0.3;1;0.3"
          dur="1.4s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
    </svg>

    {/* Glow sutil en hover */}
    <div className="absolute inset-0 rounded-xl bg-cyan-400/0 group-hover/plotter:bg-cyan-400/10 blur-md transition-colors duration-500 pointer-events-none" />
  </div>
);

export default PlotterIcon;
