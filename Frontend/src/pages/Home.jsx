import React, { useState } from "react";
import Left from "../components/Left";
import Right from "../components/Right";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex h-screen bg-[#030712]">
      <div className="w-[30%]">
        <Left
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>

      <div className="w-[70%]">
        <Right
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
};

export default Home;