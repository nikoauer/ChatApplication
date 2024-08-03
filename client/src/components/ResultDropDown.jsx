import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { HiUserGroup, HiUser } from "react-icons/hi2";

const channelByUser = async ({ client, setActiveChannel, channel, setChannel }) => {
  const filters = {
    type: 'messaging',
    member_count: 2,
    members: { $eq: [client.user.id, client.userID] },
  };

  const [existingChannel] = await client.queryChannels(filters);

  if (existingChannel) return setActiveChannel(existingChannel);

  const newChannel = client.channel('messaging', { members: [channel.id, client.userID] });
  
  setChannel(newChannel)

  return setActiveChannel(newChannel);
};

const SearchResult = ({ channel, focusedId, type, setChannel, setSidebarOpen }) => {
  const { client, setActiveChannel } = useChatContext();

  if (type === 'channel') {
    return (
      <div
        onClick={() => {
          setChannel(channel)
          if(setSidebarOpen) {
            setSidebarOpen((prevState) => !prevState)   
          }
        }}
        className='cursor-pointer hover:bg-indigo-200 rounded-md py-1'
      >
        <p className='ml-1'>{channel.data.name}</p>
      </div>
    );
  }

  return (
    <div
      onClick={async () => {
        channelByUser({ client, setActiveChannel, channel, setChannel })
        if(setSidebarOpen) {
            setSidebarOpen((prevState) => !prevState)   
        }
      }}
      className='cursor-pointer hover:bg-indigo-200 rounded-md py-1'
    >
      <div className='flex flex-inline'>
        <Avatar image={channel.image || undefined} name={channel.name} size={24} />
        <p className='mt-0.5'>{channel.name}</p>
      </div>
    </div>
  );
};

const ResultsDropdown = ({ teamChannels, directChannels, focusedId, loading, setChannel, setSidebarOpen }) => {

  return (
<div className='flex justify-center'>
<div className="absolute z-50 mt-2 max-h-[20rem] lg:w-[264px] md:w-[249px] w-[255px] overflow-auto rounded-md bg-white p-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <p className='inline-flex font-medium'><HiUserGroup className='mt-0.5 mx-1'/>Channels</p>
      {loading && !teamChannels.length && (
        <p className='ml-2'>
          <i>Loading...</i>
        </p>
      )}
      {!loading && !teamChannels.length ? (
        <p className='ml-2'>
          <i>No channels found</i>
        </p>
      ) : (
        teamChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type='channel'
            setSidebarOpen={setSidebarOpen}
          />
        ))
      )}
      <p className='inline-flex font-medium'><HiUser className='mt-0.5 mx-1'/>Users</p>
      {loading && !directChannels.length && (
        <p className='ml-2'>
          <i>Loading...</i>
        </p>
      )}
      {!loading && !directChannels.length ? (
        <p className='ml-2'>
          <i>No direct messages found</i>
        </p>
      ) : (
        directChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type='user'
            setSidebarOpen={setSidebarOpen}
          />
        ))
      )}
    </div>
    </div>
  );
};

export default ResultsDropdown;