import React, { useState, useEffect } from "react";
import { useChatContextx } from "stream-chat-react";
import { IoSearch } from "react-icons/io5";

const ChannelSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const getChannels = async (text) => {
    try {
      //TODO: get channels
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

  return (
    <div className="relative flex justify-center items-center mt-3">
      <input
        className="block w-full shadow-md rounded-md border-0 py-1.5 pl-10 pr-3 text-white bg-indigo-700 placeholder:text-gray-200 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        placeholder="Search"
        value={query}
        onChange={onSearch}
      />
      <IoSearch 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200"
      />
    </div>
  );
};

export default ChannelSearch;
