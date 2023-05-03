export const AppIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='30' height='30'>
      <rect width='8' height='8' rx='2.2' fill='url(#grad1)' />
      <defs>
        <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' style={{ stopColor: '#34d399' }} />
          <stop offset='100%' style={{ stopColor: '#a3e635' }} />
        </linearGradient>
      </defs>
    </svg>
  );
};
