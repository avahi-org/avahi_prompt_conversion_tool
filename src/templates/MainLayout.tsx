import { type ReactNode } from 'react';

import Footer from '@/layouts/Footer';
import SideBar from '@/layouts/SideBar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  className?: string;
};

const MainLayout = (props: IMainProps) => {
  return (
    <div className="font-roboto page-break w-full text-gray-700 antialiased">
      {props.meta}

      <div className="mx-auto w-full">
        <SideBar childrens={props.children} />
        <Footer />
      </div>
    </div>
  );
};

export { MainLayout };
