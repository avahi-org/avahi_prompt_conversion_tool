import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';

import FrameActiveIcon from '@/components/Icons/FrameActiveIcon';
import FrameIcon from '@/components/Icons/FrameIcon';
import LogoIcon from '@/components/Icons/LogoIcon';
import SimICon from '@/components/Icons/SimICon';
import StarSaveActiveIcon from '@/components/Icons/StarSaveActiveIcon';
import StarSaveIcon from '@/components/Icons/StarSaveIcon';
import ContentAiModel from '@/components/Models/ContentAiModel';
import { useSidebar } from '@/context';

type SideBarProps = {
  childrens: ReactNode;
  isAuth?: boolean;
};

const MENUBAR = [
  {
    id: 1,
    activeIcon: <FrameActiveIcon />,
    disableIcon: <FrameIcon />,
    path: '/auth',
    name: 'Single Prompt Conversion',
  },
  {
    id: 2,
    activeIcon: <StarSaveActiveIcon />,
    disableIcon: <StarSaveIcon />,
    path: '/multiprompt',
    name: 'Multi-prompt conversion',
  },
];

const AUTH_MENUBAR = [
  {
    id: 1,
    activeIcon: <FrameActiveIcon />,
    disableIcon: <FrameIcon />,
    path: '/free',
    name: 'Single Prompt Conversion',
  },
];

const SideBar = ({ childrens, isAuth }: SideBarProps) => {
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState(
    'Demo - Strategic Model Assessment and Review Tool (S.M.A.R.T.)'
  );
  const { isOpen, setIsOpen } = useSidebar();
  const router = useRouter();
  const MENUBAR_PROPERTIES = isAuth ? MENUBAR : AUTH_MENUBAR;

  useEffect(() => {
    if (router && router?.asPath === '/auth') {
      setHeaderTitle(
        ' Strategic Model Assessment and Review Tool (S.M.A.R.T.)'
      );
    }
  }, [headerTitle]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`h-full ${
          !isOpen ? 'w-[68px]' : 'w-[292px]'
        } overflow-hidden border-r border-gray-10 duration-500`}
      >
        <div className="flex w-full items-center justify-between border-b border-gray-10 px-3 py-6">
          <div className="flex items-center">
            <button
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <LogoIcon />
            </button>
            <p className="whitespace-nowrap py-[5px] pl-3 font-poppins text-xl font-semibold leading-7 tracking-[-2%] text-blue-20">
              SMART
            </p>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <SimICon />
          </button>
        </div>

        <div className="mt-6 flex w-full flex-col items-center justify-start gap-3">
          {MENUBAR_PROPERTIES?.map(
            ({ id, activeIcon, disableIcon, path, name }) => (
              <Link
                key={id}
                href={path}
                className={`group flex w-full items-center justify-start border-l-2 px-1`}
              >
                {(isAuth || id === 1) && (
                  <div
                    className={`${
                      router?.asPath === path
                        ? 'border-blue-30 bg-[#F1F8FB] text-blue-20'
                        : 'border-transparent'
                    } flex w-full items-center whitespace-nowrap rounded-lg border font-poppins text-sm font-normal leading-5 tracking-[-0.5%] group-hover:bg-[#F1F8FB]`}
                  >
                    <div className={`${isOpen ? '' : 'mr-3'} duration-500`}>
                      {router?.asPath === path ? activeIcon : disableIcon}
                    </div>
                    <p>{name}</p>
                  </div>
                )}
              </Link>
            )
          )}
          {/* {
            isAuth && (
              <button
                className="group flex w-full items-center justify-start border-l-2 px-3"
                onClick={() => {
                  const setCookie = (name: string, value: string) => {
                    document.cookie = `${name}=${value}`;
                  };

                  setCookie('token', '');
                  router.push('/free');
                }}
              >
                <div className="flex w-full items-center gap-2 whitespace-nowrap rounded-lg p-2  font-poppins text-sm font-normal leading-5 tracking-[-0.5%] group-hover:bg-[#F1F8FB]">
                  <div className={`${isOpen ? '' : 'mr-3'} duration-500`}>
                    <CgLogOut size={25} />
                  </div>
                  <p>Logout</p>
                </div>
              </button>
            )
            : (
            <button
              className="group flex w-full items-center justify-start border-l-2 px-3"
              onClick={() => {
                router.push('/login');
              }}
            >
              <div className="flex w-full items-center gap-2 whitespace-nowrap rounded-lg p-2  font-poppins text-sm font-normal leading-5 tracking-[-0.5%] group-hover:bg-[#F1F8FB]">
                <div className={`${isOpen ? '' : 'mr-3'} duration-500`}>
                  <CgLogOut size={25} className="rotate-180" />
                </div>
                <p>Login</p>
              </div>
            </button>
            )
          } */}
        </div>
      </div>

      <div className="w-full">
        <div className="mb-1  w-full px-6">
          <div className="flex h-[90px] items-center justify-between border-b border-gray-10 py-6">
            <div className="flex items-center gap-4 pl-6">
              <h2 className="font-poppins text-xl font-semibold text-blue-20">
                {headerTitle}
              </h2>
            </div>

            {/* <div className="flex items-center gap-4 px-6">
              <button type="button">
                <AchiveIcon />
              </button>
              <button type="button">
                <SettingIcon />
              </button>
              <button type="button" onClick={() => setModelIsOpen(true)}>
                <QutionMarkIcon />
              </button>
            </div> */}

            {isAuth ? (
              <button
                onClick={() => {
                  const setCookie = (name: string, value: string) => {
                    document.cookie = `${name}=${value}`;
                  };

                  setCookie('token', '');
                  router.push('/free');
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

        <main className="h-[calc(100vh-90px)] overflow-y-auto  pb-10 pt-4">
          {childrens}
        </main>
      </div>

      <ContentAiModel isOpen={modelIsOpen} setIsOpen={setModelIsOpen} />
    </div>
  );
};

export default SideBar;
