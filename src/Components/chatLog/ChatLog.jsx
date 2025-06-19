import React from "react";
import { PencilSquareIcon, UserIcon, PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';



const ChatLog = () => {
  return <div>
    <div className="min-h-screen flex gap-18 m-0 w-[20em] bg-white text-black dark:bg-gray-900 dark:text-white">
      <div>
      <div className="flex gap-36 mt-6">
        <div>
          <p className="text-green-500 text-[1.3em] pl-6">Messages</p>
        </div>
        <div className=" items-center">
          <PencilSquareIcon className="h-5 w-5 text-green-500 hover:text-green-800 cursor-pointer" />
        </div>
      </div> 
      <div className="mt-6 relative w-full max-w-sm">
      <input
        type="text"
        placeholder="Search..."
        className="ml-6 w-63 pl-10 pr-4 py-2 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <MagnifyingGlassIcon className="ml-5 w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
    </div>
 </div>
    </div>
      
  </div>;
};

export default ChatLog;
