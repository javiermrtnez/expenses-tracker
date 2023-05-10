import useModal from '../hooks/useModal';

interface Props {
  children: React.ReactNode;
  title: string;
}
const ModalLayout = ({ children, title }: Props) => {
  const { closeModal } = useModal();

  return (
    <div
      tabIndex='-1'
      aria-modal='true'
      role='dialog'
      className='fixed top-0 left-0 right-0 bottom-0 z-50 w-full h-full p-4 flex justify-center items-center bg-gray-900/60'
      onClick={closeModal}
    >
      <div
        className='relative w-full max-w-lg bg-white rounded-lg shadow'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className='flex items-center justify-between p-4 border-b rounded-t'>
          <h3 className='text-xl font-semibold text-gray-900'>{title}</h3>
          <button
            type='button'
            className='text-gray-400 bg-transparent transition-colors hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center'
            data-modal-hide='defaultModal'
            onClick={closeModal}
          >
            <svg
              aria-hidden='true'
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className='p-6'>{children}</div>

        {/* Modal footer */}
        {/* <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b'>
          <button
            data-modal-hide='defaultModal'
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            onClick={closeModal}
          >
            Aceptar
          </button>
          <button
            data-modal-hide='defaultModal'
            type='button'
            className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10'
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ModalLayout;
