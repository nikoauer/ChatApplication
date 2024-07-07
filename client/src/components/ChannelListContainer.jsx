import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
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

const CompanyHeader = () => (
  <div className="px-5 pt-3 h-[62px]">
    <img src={chatAppLogo} alt="Logo" width="200" />
  </div>
);

const ChannelListContainer = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload();
  };

  return (
    <div className="max-h-fit">
      <div className="">
        <div className="flex flex-col bg-indigo-600 px-6 pb-2 ">
          <CompanyHeader />
          <div className="flex flex-col gap-y-4">
            <div className="pb-3">
              <ChannelSearch />
            </div>
            <div className="flex justify-center items-center">
              <ChannelList
                filters={{}}
                channelRenderFilterFn={() => {}}
                List={(listProps) => (
                  <TeamChannelList
                    {...listProps}
                    type="team"
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                  />
                )}
                Preview={(previewProps) => (
                  <TeamChannelPreview {...previewProps} type="team" />
                )}
              />
            </div>
            <div>
              <ChannelList
                filters={{}}
                channelRenderFilterFn={() => {}}
                List={(listProps) => (
                  <TeamChannelList
                    {...listProps}
                    type="messaging"
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                  />
                )}
                Preview={(previewProps) => (
                  <TeamChannelPreview {...previewProps} type="messaging" />
                )}
              />
            </div>
          </div>
          <div className="mt-auto mb-4">
            <div className="w-[44px] h-[44px] mx-auto rounded-full shadow-md">
              <div
                className="font-sans h-full flex items-center justify-center cursor-pointer"
                onClick={logout}
              >
                <img src={signOut} alt="signout" width="50" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="py-10 lg:pl-72"></main>
    </div>
  );
};

export default ChannelListContainer;
