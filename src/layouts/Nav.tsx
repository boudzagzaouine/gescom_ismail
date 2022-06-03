/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
//npm install @headlessui/react
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { NavType } from "widgets/TypeWidgets";
import {
  CLIENT_MANAGER,
  HOME,
  PURCHASE_MANAGER,
  VENDOR_MANAGER,
} from "tools/consts";
import { signOut, signIn, getSession, useSession } from "next-auth/react";
import axios from "axios";
import { emptySession, emptyUser, SessionToken, user0, UserSession } from "tools/types";
import { Session } from "next-auth";
import { useRouter } from "next/router";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
type NavProps = {
  selected: number;
  loading: boolean;
};
export default function Nav({ selected, loading }: NavProps) {
  const { data: session, status } = useSession();
  //@ts-ignore
  const [user, setUser] = useState<UserSession>(session?.user)
  const route = useRouter()
  useEffect(() => {
    if (!session) setUser(emptyUser)
    //@ts-ignore
    else setUser(session?.user)
  })
  console.log("my user = " + JSON.stringify(user))
  //selected==CLIENT_MANAGER?navClient:selected==VENDOR_MANAGER?navVendor:selected==PURCHASE_MANAGER?navPurchase:
  const navigation: NavType[] = [
    /*  { name: "Home", href: "/", current: true, visible: selected == HOME }, */
    /* { name: "crud", href: "/crud", current: false, visible: selected == HOME },
    {
      name: "formulaire",
      href: "/backfromsaisie",
      current: false,
      visible: selected == HOME,
    },
    { name: "test", href: "/Test", current: false, visible: selected == HOME }, */
    {
      name: "Factures",
      href: "/manager/ventefacturation/Facturation",
      current: route.pathname == "/manager/ventefacturation/Facturation",
      visible: route.pathname == "/manager/ventefacturation/Facturation" ||
        route.pathname == "/manager/ventefacturation/AvoirManager" || route.pathname == "/manager/ventefacturation/ConversionManager" ||
        route.pathname == "/manager/ventefacturation/JournalManager",
    },
    {
      name: "Avoirs",
      href: "/manager/ventefacturation/AvoirManager",
      current: route.pathname == "/manager/ventefacturation/AvoirManager",
      visible: route.pathname == "/manager/ventefacturation/Facturation" ||
        route.pathname == "/manager/ventefacturation/AvoirManager" || route.pathname == "/manager/ventefacturation/ConversionManager" ||
        route.pathname == "/manager/ventefacturation/JournalManager",
    },
    {
      name: "Conversions",
      href: "/manager/ventefacturation/ConversionManager",
      current: route.pathname == "/manager/ventefacturation/ConversionManager",
      visible: route.pathname == "/manager/ventefacturation/Facturation" ||
        route.pathname == "/manager/ventefacturation/AvoirManager" || route.pathname == "/manager/ventefacturation/ConversionManager" ||
        route.pathname == "/manager/ventefacturation/JournalManager",
    },
    {
      name: "Journals des ventes",
      href: "/manager/ventefacturation/JournalManager",
      current: route.pathname == "/manager/ventefacturation/JournalManager",
      visible: route.pathname == "/manager/ventefacturation/Facturation" ||
        route.pathname == "/manager/ventefacturation/AvoirManager" || route.pathname == "/manager/ventefacturation/ConversionManager" ||
        route.pathname == "/manager/ventefacturation/JournalManager",
    },
    {
      name: "Clients",
      href: "/manager/client/ClientManager",
      current: route.pathname == "/manager/client/ClientManager",
      visible: route.pathname == "/manager/client/ClientManager" || route.pathname == "/manager/client/CommandeClientManager" || route.pathname == "/manager/client/SoldeCommandeClientManager",
    },
    
    {
      name: "Commandes Clients",
      href: "/manager/client/CommandeClientManager",
      current: route.pathname == "/manager/client/CommandeClientManager",
      visible: route.pathname == "/manager/client/ClientManager" || route.pathname == "/manager/client/CommandeClientManager" || route.pathname == "/manager/client/SoldeCommandeClientManager",
    },
    {
      name: "Soldes Commandes",
      href: "/manager/client/SoldeCommandeClientManager",
      current: route.pathname == "/manager/client/SoldeCommandeClientManager",
      visible: route.pathname == "/manager/client/ClientManager" || route.pathname == "/manager/client/CommandeClientManager" || route.pathname == "/manager/client/SoldeCommandeClientManager",
    },

    {
      name: "Fournisseurs",
      href: "/manager/vendor/VendorManager",
      current: route.pathname == "/manager/vendor/VendorManager",
      visible: route.pathname == "/manager/vendor/VendorManager" || route.pathname == "/manager/vendor/CommandeVendor" || route.pathname == "/manager/vendor/RawMaterielManager" || route.pathname == "/manager/vendor/CommandeVendorManager",
    },
    {
      name: "Commandes Fournisseurs",
      href: "/manager/vendor/CommandeVendor",
      current: route.pathname == "/manager/vendor/CommandeVendor",
      visible: route.pathname == "/manager/vendor/VendorManager" || route.pathname == "/manager/vendor/CommandeVendor" || route.pathname == "/manager/vendor/RawMaterielManager" || route.pathname == "/manager/vendor/CommandeVendorManager",
    },
    {
      name: "Matières premieres",
      href: "/manager/vendor/RawMaterielManager",
      current: route.pathname == "/manager/vendor/RawMaterielManager",
      visible: route.pathname == "/manager/vendor/VendorManager" || route.pathname == "/manager/vendor/CommandeVendor" || route.pathname == "/manager/vendor/RawMaterielManager" || route.pathname == "/manager/vendor/CommandeVendorManager",
    },
    {
      name: "Génerer Commandes Fournisseur",
      href: "/manager/vendor/CommandeVendorManager",
      current: route.pathname == "/manager/vendor/CommandeVendorManager",
      visible: route.pathname == "/manager/vendor/VendorManager" || route.pathname == "/manager/vendor/CommandeVendor" || route.pathname == "/manager/vendor/RawMaterielManager" || route.pathname == "/manager/vendor/CommandeVendorManager",
    },

    {
      name: "Réception",
      href: "/manager/purchase/Reception",
      current: route.pathname == "/manager/purchase/Reception",
      visible: route.pathname == "/manager/purchase/Reception" || route.pathname == "/manager/purchase/RightOfReturn" || route.pathname == "/manager/purchase/StockStatus" || route.pathname == "/manager/purchase/InputOutputHistory",
    },
    {
      name: "Bon de retour",
      href: "/manager/purchase/RightOfReturn",
      current: route.pathname == "/manager/purchase/RightOfReturn",
      visible: route.pathname == "/manager/purchase/Reception" || route.pathname == "/manager/purchase/RightOfReturn" || route.pathname == "/manager/purchase/StockStatus" || route.pathname == "/manager/purchase/InputOutputHistory",
    },
    {
      name: "état du stock",
      href: "/manager/purchase/StockStatus",
      current: route.pathname == "/manager/purchase/StockStatus",
      visible: route.pathname == "/manager/purchase/Reception" || route.pathname == "/manager/purchase/RightOfReturn" || route.pathname == "/manager/purchase/StockStatus" || route.pathname == "/manager/purchase/InputOutputHistory",
    },
    {
      name: "historique des entrées sorties",
      href: "/manager/purchase/InputOutputHistory",
      current: route.pathname == "/manager/purchase/InputOutputHistory",
      visible: route.pathname == "/manager/purchase/Reception" || route.pathname == "/manager/purchase/RightOfReturn" || route.pathname == "/manager/purchase/StockStatus" || route.pathname == "/manager/purchase/InputOutputHistory",
    },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="w-5/6 float-right px-2 sm:px-6 lg:px-8 bg-[#fff]">
            <div className="relative flex items-center justify-between h-16">

              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">

                    {navigation.map((item) =>
                      item.visible ? (
                        <Link
                          key={item.name}
                          href={item.href}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <a
                            className={classNames(
                              item.current
                                ? "bg-[#B9DAEC]/30"
                                : "hover:bg-[#B9DAEC]/10",
                              "text-[11273B] px-3 py-2 rounded-md text-sm font-medium"
                            )}
                          >
                            {item.name}
                          </a>
                        </Link>
                      ) : (
                        <></>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/*   <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <span className="float-right mr-2">{user?.name}</span>
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="/images/empty-contact.png"
                        alt=""
                      />
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      {!session && <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/api/auth/signin"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={(e: any) => {
                              //api/auth/signin
                              e.preventDefault()
                              //signIn("keycloak")
                              signIn("keycloak");

                            }}
                          >
                            sign in
                          </a>
                        )}
                      </Menu.Item>}
                      {session && <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/api/auth/federated-logout"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={(e: any) => {
                              //      e.preventDefault()
                              // signOut()
                              /*  logout()
                            setTimeout(() => {
                              window.location.href='/'
                            }, 500);*/
                              signOut({ callbackUrl: "/", redirect: true });
                            }}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
