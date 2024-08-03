import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseCreateChannel } from "../assets/CloseCreateChannel";
import { UserList } from "./indexComponents";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handleChange = (event) => {
    event.preventDefault();
    setChannelName(event.target.value);
  };

  return (
    <div className="flex flex-col h-[169px] px-5 py-5 shadow-sm">
      <label
        htmlFor="Name"
        className="text-md font-medium pl-1 text-gray-800 mb-3"
      >
        Name
      </label>
      <input
        value={channelName}
        onChange={handleChange}
        type="text"
        placeholder="Channel-Name"
        className="p-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        required
      />
      <div className="flex items-center mt-10 pl-1">
        <UserGroupIcon className="h-5 w-5" />
        <p className="pl-1 font-medium text-lg">Add Users</p>
      </div>
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const [channelName, setChannelName] = useState("");

  const createChannel = async (event) => {
    event.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });

      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
      toast.error(
        "Invalid name or lack of users added! Please don't use any spaces or add more users",
        { position: "top-center" }
      );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-[60px] shadow-sm pr-5 px-2">
        <p className="font-semibold text-lg text-gray-800 ml-16 lg:ml-0">
          {createType === "team"
            ? "Create a new channel"
            : "Send a direct message"}
        </p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      <ToastContainer />
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="h-[82px] flex items-center justify-end px-3">
        <button
          type="button"
          onClick={createChannel}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {createType === "team" ? "Create Channel" : "Create Message Group"}
        </button>
      </div>
    </div>
  );
};

export default CreateChannel;
