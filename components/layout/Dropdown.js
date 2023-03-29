import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const _EXERCISES = ["SQUAT", "PUSHUP", "SITUP"];

const Dropdown = () => {
  return (
    <Menu as="div" className="relative inline-block border-menuitem border-b-2 mr-7">
      <div>
        <Menu.Button className="flex w-36 h-[4vh] justify-center items-center text-base font-semibold">기록 측정</Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transfrom opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right">
          <div className="py-1">
            <Menu.Item className="flex justify-center items-center w-36 h-[4vh] bg-white hover:bg-gray-300">
              {({ active }) => (
                <Link
                  href={{
                    pathname: "/motion",
                    query: { type: "squat" },
                  }}
                  className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2")}
                >
                  {_EXERCISES[0]}
                </Link>
              )}
            </Menu.Item>
            <Menu.Item className="flex justify-center items-center w-36 h-[4vh] bg-white hover:bg-gray-300">
              {({ active }) => (
                <Link
                  href={{
                    pathname: "/motion",
                    query: { type: "pushup" },
                  }}
                  className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2")}
                >
                  {_EXERCISES[1]}
                </Link>
              )}
            </Menu.Item>
            <Menu.Item className="flex justify-center items-center w-36 h-[4vh] bg-white hover:bg-gray-300">
              {({ active }) => (
                <Link
                  href={{
                    pathname: "/motion",
                    query: { type: "situp" },
                  }}
                  className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2")}
                >
                  {_EXERCISES[2]}
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
