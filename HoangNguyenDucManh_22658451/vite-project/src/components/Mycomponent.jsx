import React, { useState } from "react";
import Childcomponent from "./Childcomponent";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfor";

const Mycomponent = () => {

  const [listUser, setListUser] = useState([
    { id: 1, name: "Dung", age: 49 },
    { id: 2, name: "Hoang", age: 17 },
    { id: 3, name: "Chien", age: 32 },
  ]);
  

  const handleAddnewUser = (userObject) => {
    setlistUser([userObject, ...listUser]);
  };

  const handleDeleteUser = (userID) => {
    let listUserClone = listUser;
    listUserClone = listUserClone.filter((item) => item.id !== userID);
    setlistUser(listUserClone);
  };

  return (
    <div>
      <AddUserInfor handleAddnewUser={handleAddnewUser}></AddUserInfor>

      <hr />
      <DisplayInfor
        listUser={listUser}
        handleDeleteUser={handleDeleteUser}
      ></DisplayInfor>
    </div>
  );
};

export default Mycomponent;
