import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import {ChannelContainer, ChannelListContainer} from './components/indexComponents'

const apiKey = process.env.REACT_APP_API_KEY

const client = StreamChat.getInstance(apiKey)

const App = () => {
return(
    <div className="flex h-full">
        <Chat client={client} theme="team light">
            <ChannelListContainer 
            
            />
            <ChannelContainer 
            
            />
        </Chat>
    </div>
)
};

export default App;
