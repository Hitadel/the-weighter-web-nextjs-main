// import axios from "axios";
// import cookies from "next-cookies";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import title from "../../public/title2.png";
import darkTitle from "../../public/title_gray.png";
// import Dropdown from "./Dropdown";
import ProfileDropdown from "./ProfileDropdown";
import NutritionDropdown from "./NutritionDropdown";
import { getItemWithExpireTime } from "../../utils/request";
import DarkMode from "../../utils/DarkMode";
import { useTheme } from "next-themes";

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isVisible, setVisible] = useState(false);
  // const [ScrollY, setScrollY] = useState(0);
  // const [ScrollActive, setScrollActive] = useState(false);
  const { theme, setTheme } = useTheme("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  // function handleScroll() {
  //   if (ScrollY > 149) {
  //     setScrollY(window.pageYOffset);
  //     setScrollActive(true);
  //   } else {
  //     setScrollY(window.pageYOffset);
  //     setScrollActive(false);
  //   }
  // }
  // useEffect(() => {
  //   function scrollListener() {
  //     window.addEventListener("scroll", handleScroll);
  //   }
  //   scrollListener();
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // });

  const onClick = () => {
    setVisible(!isVisible);
  };

  useEffect(() => {
    if (getItemWithExpireTime("token") != null) {
      setIsLogged(true);
    }
  }, []);

  return (
    <>
      <div className='h-[60px]'></div>
      <nav className='fixed left-0 -top-10 translate-y-10  z-50 w-full px-4 lg:px-6 py-2.5 bg-white dark:bg-[#2d2f34] text-[#373A3C] dark:text-[#DDDDDD] select-none change drop-shadow'>
        <div className='flex flex-wrap items-center justify-between max-w-screen-xl mx-auto'>
          <Link href='/' alt='title'>
            {loaded ? <Image src={theme == "dark" ? darkTitle : title} className='w-auto h-10 ' alt='title' /> : <></>}
          </Link>

          <div className='flex items-center lg:order-2 '>
            {isLogged ? (
              <ProfileDropdown />
            ) : (
              <Link href='/auth/login' className=' hover:bg-gray-100 lg:hover:bg-gray-200 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-[#373a3c]'>
                로그인
              </Link>
            )}
            <button
              type='button'
              className='inline-flex items-center p-2 ml-1  rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-[#373a3c] focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600'
              onClick={onClick}
            >
              <svg className={`${isVisible ? "hidden" : ""} w-6 h-6`} fill='currentColor' viewBox='0 0 20 20' xmlns='http:www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <svg className={`${isVisible ? "" : "hidden"} w-6 h-6`} fill='currentColor' viewBox='0 0 20 20' xmlns='http:www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>

          <div className={`${isVisible ? "" : "hidden"} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}>
            <ul className='flex flex-col mt-4 font-bold lg:flex-row lg:items-center lg:mt-0 lg:space-x-5'>
              <li>
                <Link
                  href='/info'
                  className='block px-3 py-2  border-b border-gray-200 lg:px-3 lg:py-2 lg:rounded dark:border-gray-600 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600   hover:underline hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-[#373a3c] lg:dark:hover:bg-[#373a3c] lg:border-0 '
                >
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link
                  href='/information'
                  className='block px-3 py-2  border-b border-gray-200 lg:px-3 lg:py-2 lg:rounded dark:border-gray-600 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600   hover:underline hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-[#373a3c] lg:dark:hover:bg-[#373a3c] lg:border-0'
                >
                  기준표
                </Link>
              </li>
              <li>
                <NutritionDropdown />
              </li>
              {/* <li>
                <Dropdown /> 
              </li> */}
              <li>
                <Link
                  href='/recommend/diet'
                  className='block px-3 py-2  border-b border-gray-200 lg:px-3 lg:py-2 lg:rounded dark:border-gray-600 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600   hover:underline hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-[#373a3c] lg:dark:hover:bg-[#373a3c] lg:border-0'
                >
                  식단 추천
                </Link>
              </li>
              <li>
                <Link
                  href='/recommend/exercise'
                  className='block px-3 py-2  border-b border-gray-200 lg:px-3 lg:py-2 lg:rounded dark:border-gray-600 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600   hover:underline hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-[#373a3c] lg:dark:hover:bg-[#373a3c] lg:border-0'
                >
                  운동 추천
                </Link>
              </li>
              {/* <li>
                <Link
                  href='/board'
                  className='block px-3 py-2  border-b border-gray-200 lg:px-3 lg:py-2 lg:rounded dark:border-gray-600 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600   hover:underline hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-[#373a3c] lg:dark:hover:bg-[#373a3c] lg:border-0'
                >
                  고객 지원
                </Link>
              </li> */}
            </ul>
            <div className={`${isVisible ? "" : "hidden"} flex items-center justify-end mt-2 lg:mt-0 lg:ml-10 lg:block lg:order-3`}>
              <DarkMode />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
