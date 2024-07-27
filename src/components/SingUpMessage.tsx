import Link from 'next/link';
import React from 'react';

const SingUpMessage = () => {
  return (
    <div className="absolute bottom-0 left-0 z-50 w-full bg-blue-30 px-4 py-2 text-center font-poppins text-base font-semibold">
      If you want to full access then {''}
      <Link href={'/login'} className="text-blue-20">
        SingIn
      </Link>
    </div>
  );
};

export default SingUpMessage;
