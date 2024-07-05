import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import { AiOutlineUserAdd } from "react-icons/ai";


const ListContainer = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mx-6 my-4">
        <div className="flex items-center flex-2">
          <p className="font-bold">User</p>
          <p className="ml-6 font-bold">Name/ID</p>
        </div>
        <p className="font-bold">Invite</p>
      </div>
      {children}
    </div>
  );
};

const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    if(selected) {
      setSelectedUsers((prevUsers) => prevUsers.filter((prevUsers) => prevUsers !== user.id))
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id])
    }
    setSelected((prevSelected) => !prevSelected);
  };

  const truncateId = (id, n) => {
    return (id && id.length > n) ? id.substr(0, n) + '...' : id;
  };

  return (
    <div
      className="flex items-center px-6 justify-between py-1 hover:bg-slate-100"
      onClick={handleSelect}
    >
      <div className="flex items-center flex-2 text-left">
        <Avatar image={user.image} name={user.fullName || user.id} size={40} />
        <p className="font-normal text-md pl-3">{user.fullName || truncateId(user.id, 14)}</p>
      </div>
      <div className="pr-2">
        {selected ? (
          <div className="flex items-center justify-center h-10 w-10 bg-indigo-600 text-white rounded-full box-border">
            <AiOutlineUserAdd className="h-6 w-6" />
          </div>
        ) : (
          <div className="flex items-center justify-center h-10 w-10 bg-gray-200 border border-gray-200 rounded-full box-border ml-0.5">
            <AiOutlineUserAdd className="h-6 w-6 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

const UserList = ({setSelectedUsers}) => {
  const { client } = useChatContext();
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
        );
        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    if (client) getUsers();
  }, []);

  return (
    <ListContainer>
      {loading ? (
        <div className="font-sm m-20">Loading Users...</div>
      ) : (
        user?.map((user, i) => <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />)
      )}
    </ListContainer>
  );
};

export default UserList;
