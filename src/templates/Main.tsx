import type { ReactNode } from 'react';

import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  className?: string;
};

const Main = (props: IMainProps) => {
  return (
    <div className="font-roboto page-break w-full text-gray-700 antialiased">
      {props.meta}

      <div className="mx-auto w-full">
        <Header />
        <main className="page-break-inside text-xl">{props.children}</main>
        <Footer />
      </div>
    </div>
  );
};

export { Main };
