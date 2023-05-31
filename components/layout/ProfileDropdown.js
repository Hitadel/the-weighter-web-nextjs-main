import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { request } from "../../utils/request";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const _MENU = ["내 정보", "로그아웃"];

const ProfileDropdown = () => {
  const onClickLogoutButton = () => {
    request()
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
      .then((res) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
        console.error(err);
      });
  };

  return (
    <Menu as='div'>
      <Menu.Button className=' hover:bg-gray-200 font-medium rounded text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-[#373a3c]  hover:underline '>프로필</Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute z-50 origin-top-right bg-white dark:bg-[#2d2f34] '>
          <Menu.Item className='flex justify-center items-center w-36 h-[40px]    border-b dark:border-gray-600 border-gray-200 hover:underline dark:hover:bg-[#373a3c] hover:bg-gray-200'>
            {({ active }) => (
              <Link href='/profile' className={classNames(active ? "bg-gray-500 " : "", "block px-4 py-2")}>
                {_MENU[0]}
              </Link>
            )}
          </Menu.Item>
          <Menu.Item className='flex justify-center items-center w-36 h-[40px]   hover:underline dark:hover:bg-[#373a3c] hover:bg-gray-200'>
            {({ active }) => (
              <button className={classNames(active ? "bg-gray-500 " : "", "block px-4 py-2")} onClick={() => onClickLogoutButton()}>
                {_MENU[1]}
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
