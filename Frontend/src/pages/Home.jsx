import React, { useState } from "react";
import Left from "../components/Left";
import Right from "../components/Right";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="h-screen overflow-hidden bg-[#030712]">
      
      <div className="hidden md:flex h-full">
        <div className="w-[30%] border-r border-gray-800">
          <Left
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </div>

        <div className="w-[70%]">
          <Right selectedUser={selectedUser} />
        </div>
      </div>

      <div className="md:hidden h-full">
        {!selectedUser ? (
          <Left
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        ) : (
          <Right
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
      </div>

    </div>
  );
};

export default Home;