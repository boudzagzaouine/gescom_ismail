import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuNavTabs } from "./TypeWidgets";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
type NatabsProps = {
  tab: MenuNavTabs[];
};
const NavTabs = ({ tab }: NatabsProps) => {
  return (
    <div className="bg-white w-full float-left h-56">
      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}

          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="">
                <div className="h-16 flex items-top justify-between">
                  <div className="hidden h-full lg:flex">
                    {/* Flyout menus */}
                    <Popover.Group className="px-4 bottom-0 inset-x-0">
                      <div className="h-full flex justify-start space-x-1">
                        {tab.map((c) => (
                          <Popover key={c.name} className="flex">
                            {({ open }) => (
                              <>
                                <div className="relative flex">
                                  <Popover.Button
                                    className={classNames(
                                      open
                                        ? "border-[#dddddd]"
                                        : "border-transparent hover:text-gray-800",
                                      "text-indigo-600 relative z-10 flex items-top transition-colors ease-out duration-200 text-sm font-medium border-t-2 border-r-2 border-l-2 px-5"
                                    )}
                                  >
                                    {c.name}
                                  </Popover.Button>
                                </div>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                                    <div
                                      className="absolute inset-0 top-1/2 bg-white shadow"
                                      aria-hidden="true"
                                    />

                                    <div className="relative bg-white">
                                      <div className="max-w-7xl mx-auto px-8">
                                        <div className="grid grid-cols-4 gap-y-10 gap-x-8 py-2">
                                          {c.featured}
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavTabs;
