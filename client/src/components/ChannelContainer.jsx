import React from 'react'
import {Channel, useChatContext} from 'stream-chat-react'
import {ChannelInner, CreateChannel, EditChannel, TeamMessage} from './indexComponents'

const ChannelContainer = (
{  isCreating,
  setIsCreating,
  createType,
  setIsEditing,
  isEditing}
) => {
const {Channel} = useChatContext()

if(isCreating) {
  return(
    <div className="h-full w-full">
      <CreateChannel createType={createType} setIsCreating={setIsCreating}/>
    </div>
  )
}
if(isEditing) {
  return(
    <div className="h-full w-full">
    <EditChannel setIsEditing={setIsEditing}/>
  </div>
  )
}

const EmptyState = () => (
  <div>
    <p className=''>This is the beginning of your chat history</p>
    <p className=''>Send Messages, emoji's, links and more! 😁</p>
  </div>
)

  return (
    <div className="h-full w-full">
      <Channel 
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <TeamMessage key={i} {...messageProps}/>}
      >
        <ChannelInner setIsEditing={setIsEditing}/>
      </Channel>
    </div>
  )
}

export default ChannelContainer