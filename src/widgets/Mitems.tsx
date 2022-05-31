import { Menu, Transition } from "@headlessui/react";
import {
  ArchiveIcon,
  ClipboardListIcon, DotsVerticalIcon, PencilAltIcon, TrashIcon
} from "@heroicons/react/solid";
import React, { Fragment } from "react";
import { MenuItems } from "widgets/TypeWidgets";


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
type MitemsProps = {
  menu: MenuItems[];
};
interface menuProp {
  obj: any;
  edit: (obj: any) => void;
  update: (obj: any) => void;
  del: (id: string) => void;
  archive: (id: string) => void;
 // restore: (id: string) => void;
}
const Mitems = ({ archive, del, edit, obj, update }: menuProp) => {
  const menu: MenuItems[] = [
    {
      icon: (
        <ClipboardListIcon
          className="mr-3 h-8 w-8 text-green-300 group-hover:text-gray-500"
          aria-hidden="true"
        />
      ),
      text: "Détail",
      action: () => {
        edit(obj);
      },
    },
    {
      icon: (
        <PencilAltIcon
          className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
          aria-hidden="true"
        />
      ),
      text: "Modifier",
      action: () => {
        update(obj);
      },
    },
    {
      icon: (
        <TrashIcon
          className="mr-3 h-8 w-8 text-rose-900 group-hover:text-gray-500"
          aria-hidden="true"
        />
      ),
      text: "Supprimer",
      action: () => {
        del(obj.id);
      },
    },
    {
      icon: (
        <ArchiveIcon
          className="mr-3 h-8 w-8 text-gray-800 group-hover:text-gray-500"
          aria-hidden="true"
        />
      ),
      text: "Archiver",
      action: () => {
        archive(obj.id);
      },
    },
    /* {
      icon: (
        <ReplyIcon
          className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
          aria-hidden="true"
        />
      ),
      text: "Restorer",
      action: () => {
        restore(obj.id);
      },
    }, */
  ];
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
              {menu?.map((m) => (
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

export default Mitems;
