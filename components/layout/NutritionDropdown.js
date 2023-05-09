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
        className='block px-3 py-2 text-gray-700 border-b border-gray-200 cursor-pointer lg:px-3 lg:py-2 lg:rounded dark:border-gray-600 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 dark:text-white hover:text-gray-400 dark:hover:text-gray-300 hover:underline hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700 lg:dark:hover:bg-gray-700 lg:border-0'
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
        <Menu.Items className='absolute lg:mt-2.5 origin-top-right font-medium bg-white dark:bg-gray-800 dark:text-white'>
          <Menu.Item className='flex justify-center items-center w-36 h-[4vh] hover:text-gray-400 dark:hover:text-gray-300 border-b dark:border-gray-600 border-gray-200 hover:underline dark:hover:bg-gray-500 hover:bg-gray-100'>
            {({ active }) => (
              <Link
                href={{
                  pathname: "/barcode",
                }}
                className={classNames(active ? "bg-gray-500 text-gray-900" : "text-gray-700", "block px-4 py-2")}
              >
                바코드 인식
              </Link>
            )}
          </Menu.Item>
          <Menu.Item className='flex justify-center items-center w-36 h-[4vh] hover:text-gray-400 dark:hover:text-gray-300 hover:underline dark:hover:bg-gray-500 hover:bg-gray-100'>
            {({ active }) => (
              <Link
                href={{
                  pathname: "/food",
                }}
                className={classNames(active ? "bg-gray-500 text-gray-900" : "text-gray-700", "block px-4 py-2")}
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
