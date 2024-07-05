import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'

import { CloseCreateChannel } from '../assets/CloseCreateChannel'
import { UserList } from './indexComponents'

const ChannelNameInput = ({ channelName = '', setChannelName }) => {

  const handleChange = (event) => {
    event.preventDefault()
    setChannelName(event.target.value)
  }

  return (
    <div className='flex flex-col h-[169px] px-5 py-5 shadow-sm'>
      <label htmlFor="Name" className="text-md font-medium pl-1 text-gray-800 mb-3">
        Name
      </label>
      <input value={channelName} onChange={handleChange} placeholder="Channel-Name" className='p-1.5 mb-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
      <p className='pl-1'>Add Members</p>
    </div>
  )
}

const CreateChannel = ({ createType, setIsCreating}) => {
  const [channelName, setChannelName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState(useChatContext([client.userID || '']))
  const { client , setActiveChannel } = useChatContext()

  return (
    <div className='flex flex-col h-full'>
      <div className="flex items-center justify-between h-[60px] shadow-sm pr-5">
        <p className='ml-5 font-semibold text-lg text-gray-800'>{createType === 'team' ? 'Create a new channel' : 'Send a direct message'}</p>
        <CloseCreateChannel setIsCreating={setIsCreating}/>
      </div>
      {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
      <UserList setSelectedUsers={setSelectedUsers}/>
    </div>
  )
}

export default CreateChannel