import React from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import {ChannelSearch, TeamChannelList, TeamChannelPreview } from './indexComponents'
import Cookies from 'universal-cookie'
import chatSymbol from '../assets/chatSymbol.png'
import signOut from '../assets/signout.png'
import chatAppLogo from '../assets/ChatAppLogo.png'

const SideBar = () => (
    <div className="w-18 shadow-md bg-indigo-600">
        <div className="w-[44px] h-[44px] m-[14px] rounded-full shadow-md">
            <div className="font-sans h-full flex items-center justify-center">
                <img src={chatSymbol} alt="chat symbol" width="50"/>
            </div>
        </div>
        <div className="w-[44px] h-[44px] m-[14px] rounded-full shadow-md">
            <div className="font-sans h-full flex items-center justify-center">
                <img src={signOut} alt="signout" width="50"/>
            </div>
        </div>
    </div>
)

const CompanyHeader = () => (
    <div className='px-5 h-[62px]'>
        <img src={chatAppLogo} alt="Logo" width="200"/>
    </div>
)

const ChannelListContainer = () => {
  return (
    <div className="h-screen flex">
      <SideBar/>
      <div className='flex flex-col justify-center bg-indigo-500 px-3'>
        <CompanyHeader />
        <div className='flex-grow'>
          <ChannelSearch />
        </div>
      </div>
    </div>
  )
}

export default ChannelListContainer