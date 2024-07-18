import React from 'react';
import {
  FaBeer,
  FaHistory,
  FaRobot,
  FaShieldAlt,
  FaUserLock,
} from 'react-icons/fa';

const STANDARD_LLM_ARCHITECTURE = [
  { icon: <FaRobot fill="#fff" />, text: 'Random responses' },
  { icon: <FaHistory fill="#fff" />, text: 'No trace-ability' },
  { icon: <FaUserLock fill="#fff" />, text: 'No Enterprise Access Controls' },
  { icon: <FaShieldAlt fill="#fff" />, text: 'Risk of information leakage' },
  { icon: <FaBeer fill="#fff" />, text: 'Prone to hallucination' },
];

const AVAHI_AI = [
  { icon: <FaRobot fill="#fff" />, text: 'Accurate responses' },
  { icon: <FaHistory fill="#fff" />, text: 'Complete audit trail' },
  { icon: <FaUserLock fill="#fff" />, text: 'Full enterprise access controls' },
  {
    icon: <FaShieldAlt fill="#fff" />,
    text: 'No leakage of proprietary information',
  },
  { icon: <FaBeer fill="#fff" />, text: 'No hallucination' },
];

const BottomContent = () => {
  return (
    <div className="grid w-full grid-cols-2  gap-x-[75px] gap-y-10">
      <div className="col-span-2 flex flex-col gap-5 lg:col-span-1">
        <h3 className="text-2xl font-semibold text-[#EC6837]">
          Standard LLM Architecture
        </h3>
        {STANDARD_LLM_ARCHITECTURE?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-md bg-red-400/30 px-4 py-2"
          >
            <span className="rounded-full bg-red-400 p-2">{item.icon}</span>
            <p className="text-base">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="col-span-2 flex flex-col gap-5 lg:col-span-1">
        <h3 className="text-2xl font-semibold text-green-400">Avahi AI</h3>
        {AVAHI_AI?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-md bg-green-400/30 px-4 py-2"
          >
            <span className="rounded-full bg-green-400 p-2">{item.icon}</span>
            <p className="text-base">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomContent;
