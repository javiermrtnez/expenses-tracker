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
    <div className='mt-8 flex flex-col gap-10 items-center'>
      <h1 className='flex relative flex-col gap-4 items-center text-8xl text-center font-bold select-none lg:flex-row lg:gap-2 lg:text-7xl'>
        {/* {ANIMATED_TEXTS.map(({ text, fromColor, toColor }, index) => (
          <span
            className={`relative block select-none before:absolute before:content-["${text}."] before:block before:w-full before:text-center before:bg-gradient-to-b before:from-[rgba(0,0,0,.8)] before:to-black before:bg-clip-text before:text-transparent before:animate-animated-gradient-text-background-${
              index + 1
            }`}
          >
            <span
              className={`relative bg-clip-text z-10 text-transparent bg-gradient-to-r from-${fromColor} to-${toColor} animate-animated-gradient-text-foreground-${
                index + 1
              }`}
            >
              {text}.
            </span>
          </span>
        ))} */}
        <div className='relative'>
          <span className='absolute lg:h-24 h-32 w-full text-center bg-gradient-to-b from-[rgba(0,0,0,.8)] to-black bg-clip-text text-transparent animate-animated-gradient-text-background-1'>
            Ingresa.
          </span>
          <span className='relative bg-clip-text z-[1] text-transparent bg-gradient-to-r from-emerald-500 to-lime-500 animate-animated-gradient-text-foreground-1'>
            Ingresa.
          </span>
        </div>

        <div className='relative'>
          <span className='absolute lg:h-24 h-32 w-full text-center bg-gradient-to-b from-[rgba(0,0,0,.8)] to-black bg-clip-text text-transparent animate-animated-gradient-text-background-2'>
            Gasta.
          </span>
          <span className='relative bg-clip-text z-[1] text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 animate-animated-gradient-text-foreground-2'>
            Gasta.
          </span>
        </div>

        <div className='relative'>
          <span className='absolute lg:h-24 h-32 w-full text-center bg-gradient-to-b from-[rgba(0,0,0,.8)] to-black bg-clip-text text-transparent animate-animated-gradient-text-background-3'>
            Ahorra.
          </span>

          <span className='relative bg-clip-text z-[1] text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 animate-animated-gradient-text-foreground-3'>
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
