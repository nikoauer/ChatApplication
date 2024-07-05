import React, {useEffect, useState} from 'react'
import {Avatar, useChatContext} from 'stream-chat-react'
import {InviteIcon} from '../assets/InviteIcon'

const ListContainer = ({children}) => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex items-center justify-between mx-6 my-4'>
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  )
}

const UserItem = ({user}) => {
  return (
    <div className='flex items-center mx-6 justif-between'>
      <div className='felx items-center flex-2 text-left'>
        <Avatar image={user.image} name={user.fullName || user.id} size={32}/>
      </div>
    </div>
  )
}

const UserList = () => {
  const {client} = useChatContext()
  const [user, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [listEmpty, setListEmpty] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      if(loading) return

      setLoading(true)

      try {
        const response = await client.queryUsers(
          {id: {$ne: client.userID}},
          {id: 1},
          {limit: 8}
        )
        if(response.users.length) {
          setUsers(response.users)
        } else {
          setListEmpty(true)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    if(client) getUsers()
  }, [])

  return (
    <ListContainer>
      {loading ? <div className='font-sm m-20'>Loading Users...</div> : (
        user?.map((user, i) => (
          <UserItem index={i} key={user.id} user={user}/>
        ))
      )}
    </ListContainer>
  )
}

export default UserList