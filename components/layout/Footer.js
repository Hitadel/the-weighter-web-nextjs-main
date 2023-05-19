import Link from "next/link";

const Footer = () => {
  return (
    <div className='flex flex-col lg:flex-row w-full h-full lg:h-[20vh] justify-between items-start dark:text-white select-none'>
      <div className='w-full h-full bg-gray-300 lg:w-[65%] change dark:bg-gray-500'>
        <div className='mt-5 ml-20'>
          <div className='text-2xl bg-clip-text text-transparent bg-gradient-to-br from-[#0faff5] dark:from-[#0b80b0] dark:to-darkButton to-button w-fit h-fit'>weighter</div>
          <div className='flex flex-row mt-2 text-sm text-gray-500 lg:text-base dark:text-gray-300'>
            <Link href='/'>
              <div className='hover:text-gray-400 dark:hover:text-gray-200 hover:underline'>서비스 소개</div>
            </Link>
            •
            <Link href='/'>
              <div className='hover:text-gray-400 dark:hover:text-gray-200 hover:underline'>기준표</div>
            </Link>
            •
            <Link href='/'>
              <div className='hover:text-gray-400 dark:hover:text-gray-200 hover:underline'>고객 지원</div>
            </Link>
          </div>
          <div className='mt-1 text-gray-400 dark:text-gray-300'>경북 칠곡군 지천면 금송로 60 영진전문대학교 글로벌 캠퍼스 5조</div>
          {/* <div className=''>text</div> */}
          <div className='text-gray-400 dark:text-gray-300'>☎: 010-1234-5678</div>
          <div className='text-gray-400 select-text dark:text-gray-300'>© Copyright - Weighter™</div>
        </div>
      </div>
      <div className='flex flex-col items-end w-full h-full lg:w-[35%] bg-gradient-to-br from-[#0faff5] dark:from-[#0b80b0] dark:to-darkButton to-button change'>
        {/* <div className='flex items-center justify-center m-2'>w</div> */}
        <div className='flex flex-row items-center justify-end w-full m-2'>
          <span className='flex select-none'>정보 지원 : </span>
          <div className='flex flex-row w-auto h-full select-none'>
            <Link href='https://github.com/mth2171/'>
              <div className='flex items-center justify-center p-2 mx-1 rounded bg-darkButton dark:bg-menuitem'>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                  <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z' />
                </svg>
                <span className='hidden ml-1 lg:block pointed-cursor'>mth2171</span>
              </div>
            </Link>
            <Link href='https://github.com/hsm2622/'>
              <div className='flex items-center justify-center p-2 mx-1 rounded bg-darkButton dark:bg-menuitem'>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                  <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z' />
                </svg>
                <span className='hidden ml-1 lg:block pointed-cursor'>hsm2622</span>
              </div>
            </Link>
            <Link href='https://github.com/hitadel/'>
              <div className='flex items-center justify-center p-2 mx-1 rounded bg-darkButton dark:bg-menuitem'>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                  <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z' />
                </svg>
                <span className='hidden ml-1 lg:block pointed-cursor'>Hitadel</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
