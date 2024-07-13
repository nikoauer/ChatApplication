import React, {useState} from 'react'
import { useChat, useChatContext } from 'stream-chat-react'
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { UserList } from './indexComponents'
import { CloseCreateChannel } from '../assets/CloseCreateChannel'

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const EditChannel = ({ setIsEditing }) => {

  const {channel} = useChatContext()
  const [channelName, setChannelName] = useState(channel?.data?.name)
  const [selectedUsers, setSelectedUsers] = useState([])

  const updateChannel = async (event) => {
    event.preventDefault()

    try {
      const nameChanged = channelName !== (channel.data.name || channel.data.id)

      if (nameChanged) {
        await channel.update({ name: channelName }, {text: `Channel name changed to ${channelName}`} )
      }
  
      if (selectedUsers.length) {
        await channel.addMembers(selectedUsers)
      }

      toast.error(
        "Invalid name or lack of users added! Please don't use any spaces or add more users",
        { position: "top-center" }
      );
      setChannelName(null)
      setIsEditing(false)
      setSelectedUsers([])
    } catch (error) {
      console.log(error)
      toast.error(
        "Invalid name or lack of users added! Please don't use any spaces or add more users",
        { position: "top-center" }
      );
    }
  }

  return (
<div className="flex flex-col h-full">
<ToastContainer />
<div className="flex items-center justify-between h-[60px] shadow-sm pr-5">
  <p className="ml-5 font-semibold text-lg text-gray-800">
    Edit Channel
  </p>
  <CloseCreateChannel setIsEditing={setIsEditing} />
</div>

<ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>
<UserList setSelectedUsers={setSelectedUsers}/>
<div className="h-[82px] flex items-center justify-end px-3">
  <button
    type="button"
    onClick={updateChannel}
    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >Save Changes
  </button>
</div>
</div>
  )
}

export default EditChannel

