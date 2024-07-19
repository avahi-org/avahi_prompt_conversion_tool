import Image from 'next/image';

const Header = () => {
  return (
    <div className="sticky top-0 z-50 border-b border-gray-25/30 bg-white py-3 shadow-sm">
      <div className="mx-auto flex max-w-[1100px] gap-5 px-4">
        <Image
          src={'/images/avahi-logo.png'}
          alt="logoImage"
          height={1000}
          width={1000}
          className="h-10 w-[150px]"
        />
      </div>
    </div>
  );
};

export default Header;
