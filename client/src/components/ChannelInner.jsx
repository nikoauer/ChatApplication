import React, { useState } from 'react';
import { MessageList, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext } from 'stream-chat-react';
import ChannelInfo from '../assets/ChannelInfo';

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();
  
  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };
    
    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }
    
    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div className='flex w-full'>
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
            <MessageList class='custom-message-list' />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = ({ setIsEditing }) => {
  const { channel, watcher_count } = useChannelStateContext();
  const { client } = useChatContext();

  const MessagingHeader = () => {
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    const additionalMembers = members.length - 3;

    if (channel.type === 'messaging') {
      return (
        <div className="flex items-center space-x-2">
          {members.map(({ user }, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Avatar image={user.image} name={user.fullName || user.id} size={32} />
              <p className="text-sm text-gray-700">{user.fullName || user.id}</p>
            </div>
          ))}
          {additionalMembers > 0 && <p className="text-sm text-gray-700">and {additionalMembers} more</p>}
        </div>
      );
    }

    return (
      <div className="flex items-center cursor-pointer">
        <p className="font-bold text-lg text-indigo-700 mr-2">
          {channel.data.name}
        </p>
        <span style={{ display: "flex" }} onClick={() => setIsEditing(true)}>
          <ChannelInfo />
        </span>
      </div>
    );
  };

  const getWatcherText = (watchers) => {
    if (!watchers) return 'No users online';
    if (watchers === 1) return `1 user online`;
    return `${watchers} users online`;
  };

  return (
    <div className="relative h-14 flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <MessagingHeader />
      <div className="flex-0.55 flex items-center justify-end text-right">
        <p className="text-sm text-gray-500">
          {getWatcherText(watcher_count)}
        </p>
      </div>
    </div>
  );
};

export default ChannelInner;
