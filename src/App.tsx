import ExamplePageShell from './components/ExamplePageShell/ExamplePageShell';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className='w-full mx-auto max-w-[var(--page-width-with-padding)] px-[var(--page-padding)] py-[calc(2*var(--page-padding))]'>
        <ExamplePageShell />
      </div>
      {/* <ExamplePageShell /> */}
    </>
  );
}

export default App;
