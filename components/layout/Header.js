// import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import title from "../../public/title.png"
import Dropdown from "./Dropdown"
// import cookies from "next-cookies"
import ProfileDropdown from "./ProfileDropdown"

const Header = () => {
  const [isLogined, setIsLogined] = useState(false)

  return (
    <div className='flex w-full h-[7vh] justify-between items-center border-b-2 border-gray-300 bg-white'>
      <>
        <Link href='/'>
          <Image src={title} className='flex h-[6vh] w-[12vw] ml-7 cursor-pointer' alt='logo' />
        </Link>
        <div className='flex justify-center items-center mr-7 text-black'>
          <Link href='/info'>
            <button className='flex w-36 h-[4vh] justify-center items-center border-b-2 border-menuitem mr-7 text-base font-semibold active:bg-gray-200'>서비스 소개</button>
          </Link>
          <Link href='/information'>
            <button className='flex w-36 h-[4vh] justify-center items-center border-b-2 border-menuitem mr-7 text-base font-semibold hover:text-gray-500 active:bg-gray-200'>기준표</button>
          </Link>
          <Link href='/barcode'>
            <button className='flex w-36 h-[4vh] justify-center items-center border-b-2 border-menuitem mr-7 text-base font-semibold active:bg-gray-200'>영양소 추가</button>
          </Link>
          <Dropdown />
          <Link href='/board'>
            <button className='flex w-36 h-[4vh] justify-center items-center border-b-2 border-menuitem mr-7 text-base font-semibold active:bg-gray-200'>고객 지원</button>
          </Link>

          {isLogined ? (
            <ProfileDropdown />
          ) : (
            <>
              <Link href='/auth/login'>
                <button className='flex w-40 h-[4vh] justify-center items-center border-2 border-black mr-5 text-menu text-base font-semibold'>로그인</button>
              </Link>
            </>
          )}
        </div>
      </>
    </div>
  )
}

export default Header
