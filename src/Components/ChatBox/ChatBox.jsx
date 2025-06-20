// import React from "react";

// const ChatBox = () => {
//   return <div>ChatBox</div>;
// };

// export default ChatBox;

import React, { useState } from 'react';
import ChatLog from '../chatLog/ChatLog';
import ChatBody from '../chatBody/Chatbody';

const ChatBox = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <div className="flex">
      {/* <ChatLog onSelectContact={setSelectedContact} />
      <ChatBody contact={selectedContact} /> */}
    </div>
  );
};

export default ChatBox;
