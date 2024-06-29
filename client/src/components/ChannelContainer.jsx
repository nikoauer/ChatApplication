import React from 'react';
import { MessageSimple, useChatContext, Channel } from 'stream-chat-react';
import { ChannelInner, CreateChannel, EditChannel, TeamMessage } from './indexComponents';

const ChannelContainer = ({ isCreating, setIsCreating, createType, setIsEditing, isEditing }) => {
  const { channel } = useChatContext(); // rename Channel to channel to avoid conflict

  if (isCreating) {
    return (
      <div className="h-full w-full">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }
  
  if (isEditing) {
    return (
      <div className="h-full w-full">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="flex flex-col justify-end h-full">
      <div className="mx-12 pb-2">
        <p className="text-base font-bold">
          This is the beginning of your chat history
        </p>
        <p className="text-base text-indigo-400">
          Send messages, attachments, emojos and more!
        </p>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full">
      <Channel 
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageSimple key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
}

export default ChannelContainer;
