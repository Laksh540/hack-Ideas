import React from "react";

const Header = () => {
  const onCreateHackIdea = () => {
    console.log(" navigate to  hack idea  page");
  };
  return (
    <div className="flex justify-between">
      <div>
        <label className=" text-base"> Hack Ideas</label>
      </div>
      <button onClick={onCreateHackIdea}>Create Hack Idea</button>
    </div>
  );
};

export default Header;
