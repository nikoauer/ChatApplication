import React, {useEffect, useState} from 'react'
import {Avatar, useChatChannel} from 'stream-chat-react'
import {InviteIcon} from '../assets/InviteIcon'

const ListContainer = ({children}) => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex align-middle justify-between mx-6 my-4'>
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  )
}

const UserList = () => {
  return (
    <ListContainer>
      Userlist
    </ListContainer>
  )
}

export default UserList