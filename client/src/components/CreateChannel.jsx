import React from 'react'
import { useChatContext } from 'stream-chat-react'

// import { CloseCreateChannel } from '../assets'
// import { UserList } from './indexComponents'

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
  const handleChange = (event) => {
    event.preventDefault()
    setChannelName(event.target.value)
  }

  return (
    <div className='flex flex-col h-[169px] px-5 py-10 shadow-sm'>
      <p className='font-medium text-lg pl-1'>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="Channel-Name" className='p-1' />
      <p className='pl-1'>Add Members</p>
    </div>
  )
}

const CreateChannel = () => {
  return (
    <div>

    </div>
  )
}

export default CreateChannel