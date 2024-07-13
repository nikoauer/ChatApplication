import React, { useState, useEffect } from "react";
import { useChat, useChatContext } from "stream-chat-react";
import { IoSearch } from "react-icons/io5";

const ChannelSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { client, setActiveChannel } = useChatContext();
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  useEffect(() => {
    if(!query) {
      setTeamChannels([])
      setDirectChannels([])
    }
  }, [query])

  const getChannels = async (text) => {
    try {
      const channelResponse = client.queryChannels({
        type: "team",
        name: { $autocomplete: text },
        members: { $in: [client.userID] },
      });
      const userResponse = client.queryUsers({
        id: {$ne: client.userID},
        name: { $autocomplete: text }, 
      })

      const [channels, {users}] = await Promise.all([channelResponse, userResponse])

      if(channels.length) setTeamChannels(channels)
      if(users.length) setDirectChannels(users)

    } catch (error) {
      setQuery("");
    }
  };

  const onSearch = (event) => {
    event.preventDefault();

    setLoading(true);
    setQuery(event.target.value);
    getChannels(event.target.value);
  };

  const setChannel = (channel) = {
    setQuery('')
    setActiveChannel(channel)
  }

  return (
  <div>
      <div className="relative flex justify-center items-center mt-3">
        <input
          className="block w-full shadow-md rounded-md border-0 py-1.5 pl-10 pr-3 text-white bg-indigo-700 placeholder:text-gray-200 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          placeholder="Search"
          value={query}
          onChange={onSearch}
        />
        <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200" />
      </div>
      {query && (
        <ResultDropDown 
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
        />
      )}
    </div>
  );
};

export default ChannelSearch;
