import React from 'react';

interface StatProps {
  name: string;
  icon: React.ReactNode;
  length: number;
}

const Stat: React.FC<StatProps> = ({ name, icon, length }) => {
  return (
    <div className="bg-[#272822]  w-max md:w-fit rounded-lg  flex items-center space-x-4 capitalize p-5 mb-6">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-full text-black ">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-white ">{name}</p>
        <p className="text-3xl font-semibold text-[#fa0089]">{length.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Stat;