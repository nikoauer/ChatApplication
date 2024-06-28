import React from 'react'
import {Channel, useChatContext} from 'stream-chat-react'
import {ChannelInner, CreateChannel, EditChannel, TeamMessage} from './'

const ChannelContainer = (
{  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  isEditing}
) => {
const {Channel} = useChatContext()

if(isCreating) {
  return(
  )
}
if(isEditing) {
  return(
    
  )
}

  return (
    <div>

    </div>
  )
}

export default ChannelContainer