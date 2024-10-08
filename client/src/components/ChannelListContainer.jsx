import React, { useState } from "react";
import {
  TransitionChild,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { ChannelList, useChatContext } from "stream-chat-react";
import {
  ChannelSearch,
  TeamChannelList,
  TeamChannelPreview,
} from "./indexComponents";
import Cookies from "universal-cookie";
import chatAppLogo from "../assets/ChatAppLogo.png";

const cookies = new Cookies();

const CompanyHeader = () => (
  <div className="px-5 pt-3 flex justify-center">
    <img src={chatAppLogo} alt="Logo" width="200" />
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setSidebarOpen,
}) => {
  const { client } = useChatContext();
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");

    window.location.reload();
  };

  const filters = { members: { $in: [client.userID] } };

  return (
    <div className="flex flex-col min-w-72 bg-indigo-500 h-screen overflow-y-auto">
      <CompanyHeader />
      <div className="flex flex-col justify-center">
        <div className="mx-3">
          <ChannelSearch setSidebarOpen={setSidebarOpen} />
        </div>
        <div className="flex flex-col my-2">
          <div className="flex justify-center mx-3 my-1">
            <ChannelList
              filters={filters}
              channelRenderFilterFn={customChannelTeamFilter}
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
                <TeamChannelPreview
                  {...previewProps}
                  setIsCreating={setIsCreating}
                  setIsEditing={setIsEditing}
                  type="team"
                />
              )}
            />
          </div>
          <div className="flex justify-center mx-3 my-2">
            <ChannelList
              filters={filters}
              channelRenderFilterFn={customChannelMessagingFilter}
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
                <TeamChannelPreview
                  {...previewProps}
                  setIsCreating={setIsCreating}
                  setIsEditing={setIsEditing}
                  type="messaging"
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="font-sans h-full flex items-center justify-center cursor-pointer">
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-24 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <ArrowLeftStartOnRectangleIcon
              aria-hidden="true"
              className="-ml-0.5 h-5 w-5"
            />
            Logout
          </button>
        </div>
      </div>
      <main className="py-10 lg:pl-72"></main>
    </div>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="relative shadow-lg">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="absolute top-0 left-0 p-4 lg:hidden z-10 bg-indigo-600"
        >
          <Bars3Icon className="h-6 w-6 text-white" />
        </button>
      </div>

      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-10 lg:hidden"
      >
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
              <div className="absolute left-full top-0 flex justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </button>
              </div>
            </TransitionChild>

            <ChannelListContent
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setSidebarOpen={setSidebarOpen}
            />
          </DialogPanel>
        </div>
      </Dialog>

      <div className="hidden lg:block">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
