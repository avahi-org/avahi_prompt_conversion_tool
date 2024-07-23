import Image from 'next/image';
import { useState } from 'react';

import QutionMarkIcon from '@/components/Icons/QutionMarkIcon';
import ContentAiModel from '@/components/Models/ContentAiModel';

const Header = () => {
  const [modelIsOpen, setModelIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-25/30 py-3 shadow-sm">
      <div className="mx-auto flex max-w-[1360px] justify-between gap-5 px-4">
        <Image
          src={'/images/avahi-logo.png'}
          alt="logoImage"
          height={1000}
          width={1000}
          className="h-10 w-[150px]"
        />

        <button className="w-fit" onClick={() => setModelIsOpen(true)}>
          <QutionMarkIcon />
        </button>
      </div>

      <ContentAiModel isOpen={modelIsOpen} setIsOpen={setModelIsOpen} />
    </div>
  );
};

export default Header;
