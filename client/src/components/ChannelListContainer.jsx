import React from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
// import {ChannelSearch, TeamChannelList, TeamChannelPreview } from './'
import Cookies from 'universal-cookie'
import chatSymbol from '../assets/chatSymbol.png'
import signOut from '../assets/signout.png'

const SideBar = () => (
    <div className="w-18 shadow-md bg-purple-500">
        <div className="w-[44px] h-[44px] m-[14px] rounded-full shadow-md">
            <div className="font-sans h-full flex items-center justify-center">
                <img src={chatSymbol} alt="chat Logo" width="50"/>
            </div>
        </div>
        <div className="w-[44px] h-[44px] m-[14px] rounded-full shadow-md">
            <div className="font-sans h-full flex items-center justify-center">
                <img src={signOut} alt="signout" width="50"/>
            </div>
        </div>
    </div>
)

const ChannelListContainer = () => {
  return (
    <div className="h-screen flex">
        <SideBar/>
    </div>
  )
}

export default ChannelListContainer