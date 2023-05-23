// const ANIMATED_TEXTS = [
//   {
//     text: 'Ingresa',
//     fromColor: 'emerald-500',
//     toColor: 'lime-500',
//   },
//   {
//     text: 'Gasta',
//     fromColor: 'yellow-500',
//     toColor: 'orange-500',
//   },
//   {
//     text: 'Ahorra',
//     fromColor: 'cyan-500',
//     toColor: 'blue-500',
//   },
// ];

const HomePage = () => {
  return (
    <div className='flex flex-col gap-10 items-center lg:mt-8'>
      <h1 className='flex relative flex-col gap-4 items-center text-8xl text-center font-bold select-none lg:flex-row lg:gap-2 lg:text-7xl'>
        {/* {ANIMATED_TEXTS.map(({ text, fromColor, toColor }, index) => (
          <div key={text} className='relative'>
            <span
              className={`absolute lg:h-24 h-32 w-full text-center bg-gradient-to-b from-[rgba(0,0,0,.8)] to-black bg-clip-text text-transparent animate-animated-gradient-text-background-${
                index + 1
              }`}
            >
              {text}.
            </span>
            <span
              className={`bg-clip-text z-[1] text-transparent bg-gradient-to-r from-${fromColor} to-${toColor} animate-animated-gradient-text-foreground-${
                index + 1
              }`}
            >
              {text}.
            </span>
          </div>
        ))} */}

        <div className='relative'>
          <span className='absolute lg:h-24 h-32 w-full text-center bg-gradient-to-b from-[rgba(0,0,0,.8)] to-black bg-clip-text text-transparent animate-animated-gradient-text-background-1'>
            Ingresa.
          </span>
          <span className='bg-clip-text z-[1] text-transparent bg-gradient-to-r from-emerald-500 to-lime-500 animate-animated-gradient-text-foreground-1'>
            Ingresa.
          </span>
        </div>

        <div className='relative'>
          <span className='absolute lg:h-24 h-32 w-full text-center bg-gradient-to-b from-[rgba(0,0,0,.8)] to-black bg-clip-text text-transparent animate-animated-gradient-text-background-2'>
            Gasta.
          </span>
          <span className='bg-clip-text z-[1] text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 animate-animated-gradient-text-foreground-2'>
            Gasta.
          </span>
        </div>

        <div className='relative'>
          <span className='absolute lg:h-24 h-32 w-full text-center bg-gradient-to-b from-[rgba(0,0,0,.8)] to-black bg-clip-text text-transparent animate-animated-gradient-text-background-3'>
            Ahorra.
          </span>
          <span className='bg-clip-text z-[1] text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 animate-animated-gradient-text-foreground-3'>
            Ahorra.
          </span>
        </div>
      </h1>

      <h2 className='w-full text-center mx-auto	max-w-2xl text-slate-600'>
        ExpensesTracker es la plataforma para controlar tus finanzas, brindando la velocidad y
        confiabilidad que los usuarios necesitan para administrar sus recursos y alcanzar sus metas
        económicas.
      </h2>
    </div>
  );
};

export default HomePage;
