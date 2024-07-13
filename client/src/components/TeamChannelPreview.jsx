import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p>{channel?.data?.name || channel?.data?.id}</p>
  );

  const truncateId = (id, n) => {
    return id && id.length > n ? id.substr(0, n) + "..." : id;
  };

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    return (
      <div className="inline-flex py-0.5">
        <Avatar
          image={members[0].user.image}
          name={members[0].user.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.fullName || truncateId(members[0]?.user?.id, 14)}</p>
      </div>
    );
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "h-auto flex items-center bg-indigo-600 pl-4 p-0.5 rounded-md font-medium cursor-pointer text-white my-1"
          : "py-1 flex items-center text-gray-600 cursor-pointer hover:bg-indigo-200 rounded-md pl-1"
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
