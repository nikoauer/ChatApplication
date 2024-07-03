import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChannelList, useChatContext } from "stream-chat-react";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./indexComponents";
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

const ChannelListContainer = ({ isCreating, setIsCreating, setCreateType, setIsEditing }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div>
      {/* Dynamic sidebar */}
      <Dialog className="relative z-50 lg:hidden" open={sidebarOpen} onClose={setSidebarOpen}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2">
              <CompanyHeader />
              <div className="flex-1 flex flex-col gap-y-4">
                <ChannelSearch />
                <ChannelList
                  filters={{}}
                  channelRenderFilterFn={() => {}}
                  List={(listProps) => (
                    <TeamChannelList {...listProps} type="team"
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
                <ChannelList
                  filters={{}}
                  channelRenderFilterFn={() => {}}
                  List={(listProps) => (
                    <TeamChannelList {...listProps} type="messaging" 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}/>
                  )}
                  Preview={(previewProps) => (
                    <TeamChannelPreview {...previewProps} type="messaging" />
                  )}
                />
              </div>
              <div className="mt-auto mb-4">
                <div className="w-[44px] h-[44px] mx-auto rounded-full shadow-md">
                  <div className="font-sans h-full flex items-center justify-center cursor-pointer" onClick={logout}>
                    <img src={signOut} alt="signout" width="50" />
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      
      {/* Static Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2">
          <CompanyHeader />
          <div className="flex-1 flex flex-col gap-y-4">
            <ChannelSearch />
            <ChannelList
              filters={{}}
              channelRenderFilterFn={() => {}}
              List={(listProps) => (
                <TeamChannelList {...listProps} type="team" 
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}/>
              )}
              Preview={(previewProps) => (
                <TeamChannelPreview {...previewProps} type="team" />
              )}
            />
            <ChannelList
              filters={{}}
              channelRenderFilterFn={() => {}}
              List={(listProps) => (
                <TeamChannelList {...listProps} type="messaging" 
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}/>
              )}
              Preview={(previewProps) => (
                <TeamChannelPreview {...previewProps} type="messaging" />
              )}
            />
          </div>
          <div className="mt-auto mb-4">
            <div className="w-[44px] h-[44px] mx-auto rounded-full shadow-md">
              <div className="font-sans h-full flex items-center justify-center cursor-pointer" onClick={logout}>
                <img src={signOut} alt="signout" width="50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 px-4 py-4 shadow-md sm:px-6 lg:hidden">
        <button type="button" className="-m-2.5 p-2.5 text-indigo-200 lg:hidden" onClick={() => setSidebarOpen(true)}>
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <main className="py-10 lg:pl-72">
      </main>
    </div>
  );
};

export default ChannelListContainer;

