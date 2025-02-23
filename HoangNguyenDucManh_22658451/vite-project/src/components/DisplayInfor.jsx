import React, { useState } from "react";

const DisplayInfor = (props) => {
  const { listUser } = props;
  const [isShowHideListUser, setShowHideListUser] = useState(true);

  const handleShowHideListUser = (pops) => {
    setShowHideListUser(!isShowHideListUser);
  };
  return (
    <div>
      {listUser.map((user) => {
        return (
          <div key={user.id} className={user.Age < 18 ? "red" : "blue"}>
            <div>User name is: {user.Name}</div>
            <div>User Age: {user.Age}</div>
            <button
              onClick={() => {
                pops.handleDeleteUser(user.id);
              }}
            >
              Delete
            </button>

            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default DisplayInfor;
