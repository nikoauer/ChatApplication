import React from 'react'
import { MdErrorOutline } from "react-icons/md";


const TeamChannelList = ({children, error = false, loading, type}) => {
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
        <div>
            <p className='text-sm font-medium'>
                {type === 'team' ? 'Channels' : 'Direct Messages'}
            </p>
        </div>
        {children}
    </div>
  )
}

export default TeamChannelList