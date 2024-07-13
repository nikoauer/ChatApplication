import React from 'react'
import { MdErrorOutline } from "react-icons/md";
import { AddChannel } from '../assets/AddChannel';
import { HiUserGroup } from "react-icons/hi2";
import { TbMessage } from "react-icons/tb";




const TeamChannelList = ({children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing}) => {
    if(error){
        return type === 'team' ? (
            <div className="max-w-xs rounded-md bg-red-50 p-3 break-words">
                <h3 className="text-sm font-medium text-red-800">
                    Connection Error: Please wait a moment and try again later.
                </h3>
            </div>
        ) : null
    }

    if(loading){
        return (
            <div className="max-w-xs rounded-md bg-blue-50 p-3 break-words">
                <h3 className="text-sm font-medium text-blue-800">
                    {type === 'team' ? 'Channels' : 'Messages'} Loading...
                </h3>
            </div>
        )
    }

  return (
    <div className="max-w-xs rounded-md bg-blue-50 p-2 break-words my-2">
    <div className="flex items-center justify-between">
        <h2 className='text-normal font-normal mb-1'>
            {type === 'team' ?
            <div className='inline-flex items-center'>
            <HiUserGroup className="mb-1 mr-1 h-5 w-5" />
            <p className='font-medium'>Channels</p>
            </div> : <div className='inline-flex items-center'>
            <TbMessage className=" mr-1 h-5 w-5" />
            <p className='font-medium'>Direct Messages</p>
            </div>}
        </h2>
        <AddChannel
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
            type={type === 'team' ? 'team' : 'messaging'}
        />
    </div>
    {children}
</div>
  )
}

export default TeamChannelList