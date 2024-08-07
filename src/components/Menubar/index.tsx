import Link from 'next/link';
import router from 'next/router';
import React from 'react';

import MenuCloseIcon from '../Icons/MenuCloseIcon';

type MenuBarType = {
  setIsHamburger: React.Dispatch<React.SetStateAction<boolean>>;
  isAuth: boolean | undefined;
  menu: {
    id: number;
    activeIcon: React.JSX.Element;
    disableIcon: React.JSX.Element;
    path: string;
    name: string;
  }[];
  headerTitle: string;
};

const MenuBar = ({
  setIsHamburger,
  isAuth,
  menu,
  headerTitle,
}: MenuBarType) => {
  return (
    <>
      <div className="slideInRight fixed top-0 z-[9999] flex size-full min-h-screen flex-col gap-y-5 bg-white lg:hidden">
        <div
          className={` flex h-[55px] w-full items-center rounded p-5 text-right text-black`}
        >
          <button
            className="slideInRightIcons size-fit"
            onClick={() => setIsHamburger(false)}
          >
            <MenuCloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-3 px-5">
          {menu?.map(({ id, activeIcon, disableIcon, path, name }) => (
            <Link
              key={id}
              href={path}
              className={`group flex w-full items-center justify-start `}
            >
              {(isAuth || id === 1) && (
                <div
                  className={`${
                    router?.asPath === path
                      ? 'border-blue-30 bg-[#F1F8FB] text-blue-20'
                      : 'border-transparent'
                  } flex w-full items-center whitespace-nowrap rounded-lg border font-poppins text-sm font-normal leading-5 tracking-[-0.5%] group-hover:bg-[#F1F8FB]`}
                >
                  <div className={` duration-500`}>
                    {router?.asPath === path ? activeIcon : disableIcon}
                  </div>
                  <p>{name}</p>
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="mb-1 w-full px-5">
          <div className="flex w-full flex-col items-start gap-2 gap-y-4 md:flex-row md:items-center md:justify-between">
            <h2 className="font-poppins text-sm font-semibold text-blue-20 sm:text-base">
              {headerTitle}
            </h2>

            {isAuth ? (
              <button
                onClick={() => {
                  const setCookie = (name: string, value: string) => {
                    document.cookie = `${name}=${value}`;
                  };

                  setCookie('token', '');
                  router.push('/demo');
                }}
                className="rounded-md bg-blue-20 px-3 py-2 font-poppins text-base font-medium leading-5 text-white transition-all duration-300 hover:bg-blue-50"
              >
                Logout
              </button>
            ) : (
              <Link
                href={'/login'}
                className="rounded-md bg-blue-20 px-3 py-2 font-poppins text-base font-medium leading-5 text-white transition-all duration-300 hover:bg-blue-50"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
