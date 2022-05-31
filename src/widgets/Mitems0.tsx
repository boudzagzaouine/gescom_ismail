import { Menu, Transition } from "@headlessui/react";
import {
  DotsVerticalIcon
} from "@heroicons/react/solid";
import React, { Fragment } from "react";
import { MenuItems } from "widgets/TypeWidgets";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
type Mitems0Props = {
  menu: MenuItems[];
};

const Mitems0 = ({ menu }: Mitems0Props) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full  px-4 py-2 bg-transparent text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-40">
            <div className="py-1">
              {menu.map((m) => (
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={m.action}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "group flex items-center px-4 py-2 text-sm"
                      )}
                    >
                      {m.icon}
                      {m.text}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default Mitems0;
