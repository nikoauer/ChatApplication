import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import {
  ChannelSearch,
  TeamChannelList,
  TeamChannelPreview,
} from "./indexComponents";
import Cookies from "universal-cookie";
import chatSymbol from "../assets/chatSymbol.png";
import signOut from "../assets/signout.png";
import chatAppLogo from "../assets/ChatAppLogo.png";

const cookies = new Cookies();

const SideBar = ({logout}) => (
  <div className="w-18 shadow-md bg-indigo-600">
    <div className="w-[44px] h-[44px] m-[14px] rounded-full shadow-md">
      <div className="font-sans h-full flex items-center justify-center">
        <img src={chatSymbol} alt="chat symbol" width="50" />
      </div>
    </div>
    <div className="w-[44px] h-[44px] m-[14px] rounded-full shadow-md">
      <div className="font-sans h-full flex items-center justify-center cursor-pointer" onClick={logout}>
        <img src={signOut} alt="signout" width="50" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="px-5 h-[62px]">
    <img src={chatAppLogo} alt="Logo" width="200" />
  </div>
);

const ChannelListContainer = () => {

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload()
  }

  return (
    <div className="h-screen flex">
      <SideBar logout={logout}/>
      <div className="flex flex-col justify-start bg-indigo-500 px-3 w-full">
        <CompanyHeader />
        <div className="flex-grow overflow-auto">
          <ChannelSearch />
          <div className="mt-3">
            <ChannelList
              filters={{}}
              channelRenderFilterFn={() => {}}
              List={(listProps) => (
                <TeamChannelList {...listProps} type="team" />
              )}
              Preview={(previewProps) => (
                <TeamChannelPreview {...previewProps} 
                type="team"
                />
              )}
            />

            <ChannelList
              filters={{}}
              channelRenderFilterFn={() => {}}
              List={(listProps) => (
                <TeamChannelList {...listProps} type="messaging" />
              )}
              Preview={(previewProps) => (
                <TeamChannelPreview {...previewProps} 
                type="messaging"
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelListContainer;
