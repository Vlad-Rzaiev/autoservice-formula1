export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-colors duration-200">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="loader-smoke loader-smoke-left" />
        <div className="loader-smoke loader-smoke-right" />
        <div className="loader-smoke loader-smoke-ground" />
      </div>

      <div className="relative flex items-center justify-center">
        <svg
          className="w-24 h-24 animate-spin text-zinc-400 dark:text-zinc-600"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ animationDuration: "1.2s" }}
        >
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray="6 3"
          />

          <circle
            cx="50"
            cy="50"
            r="38"
            stroke="currentColor"
            strokeWidth="1"
          />

          <circle
            cx="50"
            cy="50"
            r="32"
            className="fill-zinc-100 dark:fill-zinc-800 stroke-zinc-300 dark:stroke-zinc-700"
            strokeWidth="2"
          />

          <g
            className="stroke-zinc-400 dark:stroke-zinc-500"
            strokeWidth="4"
            strokeLinecap="round"
          >
            <line x1="50" y1="50" x2="50" y2="22" />
            <line x1="50" y1="50" x2="76" y2="41" />
            <line x1="50" y1="50" x2="66" y2="72" />
            <line x1="50" y1="50" x2="34" y2="72" />
            <line x1="50" y1="50" x2="24" y2="41" />
          </g>

          <circle
            cx="50"
            cy="50"
            r="8"
            className="fill-zinc-300 dark:fill-zinc-600 stroke-zinc-500 dark:stroke-zinc-400"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="2"
            className="fill-zinc-600 dark:fill-zinc-300"
          />
        </svg>

        <div className="absolute -bottom-2 w-16 h-1.5 bg-zinc-900/10 dark:bg-black/40 rounded-full blur-sm" />
      </div>
    </div>
  );
}
