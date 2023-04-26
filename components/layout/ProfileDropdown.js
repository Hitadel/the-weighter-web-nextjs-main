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
      <Menu.Button className='text-gray-800 dark:text-white hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'>
        프로필
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute z-10 origin-top-right bg-white dark:bg-gray-800 dark:text-white'>
          <Menu.Item className='flex justify-center items-center w-36 h-[4vh] hover:text-gray-400 dark:hover:text-gray-300 border-b dark:border-gray-600 border-gray-200 hover:underline dark:hover:bg-gray-500 hover:bg-gray-100'>
            {({ active }) => (
              <Link href='/profile' className={classNames(active ? "bg-gray-500 text-gray-900" : "text-gray-700", "block px-4 py-2")}>
                {_MENU[0]}
              </Link>
            )}
          </Menu.Item>
          <Menu.Item className='flex justify-center items-center w-36 h-[4vh] hover:text-gray-400 dark:hover:text-gray-300 hover:underline dark:hover:bg-gray-500 hover:bg-gray-100'>
            {({ active }) => (
              <button className={classNames(active ? "bg-gray-500 text-gray-900" : "text-gray-700", "block px-4 py-2")} onClick={() => onClickLogoutButton()}>
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
