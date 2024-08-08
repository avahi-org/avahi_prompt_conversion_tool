import React from 'react';

import { Meta } from '@/layouts/Meta';
import { MainLayout } from '@/templates/MainLayout';

const segmentation = () => {
  return (
    <MainLayout isAuth={true} meta={<Meta title="AVAHI" description="AVAHI" />}>
      <div className="w-full text-center font-bold">Comming soon</div>
    </MainLayout>
  );
};

export default segmentation;
