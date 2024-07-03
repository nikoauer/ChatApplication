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
    <div>
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="Channel-Name (With no spaces)" />
      <p>Add Members</p>
    </div>
  )
}

const CreateChannel = () => {
  return (
    <div>
      <ChannelNameInput />
    </div>
  )
}

export default CreateChannel