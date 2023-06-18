import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dropdown = () => {
  return (
    <Menu>
      <Menu.Button
        as='a'
        className='block px-3 py-2  border-b border-gray-200 cursor-pointer lg:px-3 lg:py-2 lg:rounded dark:border-gray-600 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600   hover:underline hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-[#373a3c] lg:dark:hover:bg-[#373a3c] lg:border-0 z-50'
      >
        영양소 추가
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
        <Menu.Items className='absolute lg:mt-2.5 origin-top-right font-medium bg-white dark:bg-[#2d2f34] z-50'>
          <Menu.Item className='flex justify-center items-center w-36 h-[40px] border-b dark:border-gray-600 border-gray-200 hover:underline dark:hover:bg-[#373a3c] hover:bg-gray-200 '>
            {({ active }) => (
              <Link
                href={{
                  pathname: "/barcode",
                }}
                className={classNames(active ? "bg-gray-500 " : "", "block px-4 py-2")}
              >
                바코드 인식
              </Link>
            )}
          </Menu.Item>
          <Menu.Item className='flex justify-center items-center w-36 h-[40px]  hover:underline dark:hover:bg-[#373a3c] hover:bg-gray-200'>
            {({ active }) => (
              <Link
                href={{
                  pathname: "/food",
                }}
                className={classNames(active ? "bg-gray-500 " : "", "block px-4 py-2")}
              >
                식탁 사진 촬영
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
