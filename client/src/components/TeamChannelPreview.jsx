import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p>{channel?.data?.name || channel?.data?.id}</p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    return (
      <div>
        <Avatar
          image={members[0].user.image}
          name={members[0].user.fullName}
          size={24}
        />
        <p>{members[0]?.user?.fullName}</p>
      </div>
    );
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "h-auto flex items-center bg-black/20 rounded-tr-lg rounded-br-lg font-bold mr-4 cursor-pointer z-2"
          : "h-[37px] flex items-center"
      }
      onClick ={() => {
        setIsCreating(false)
        setIsEditing(false)
        setActiveChannel(channel)
      }}
    >
         {type === 'team' ? <ChannelPreview /> : <DirectPreview/>}
    </div>
  );
};

export default TeamChannelPreview;
