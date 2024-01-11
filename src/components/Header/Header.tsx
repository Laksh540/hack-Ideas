import React from "react";
import { useNavigate } from "react-router-dom";
import { LINK_CREATE_HACK_IDEA, LINK_LOGIN } from "../../routes";
import { LOGIN_EMPLOYEE_ID } from "../../constants";

const Header = () => {
  const navigate = useNavigate();
  const onCreateHackIdea = () => {
    navigate(LINK_CREATE_HACK_IDEA);
  };

  const onLogout = () => {
    localStorage.removeItem(LOGIN_EMPLOYEE_ID);
    navigate(LINK_LOGIN);
  };
  return (
    <div className="flex justify-between">
      <div>
        <label className=" text-2xl font-bold"> Hack Ideas</label>
      </div>
      <div className=" flex ">
        <button
          onClick={onCreateHackIdea}
          className="h-8 bg-slate-400 p-5 flex justify-center items-center mr-3"
        >
          Create
        </button>
        <button
          onClick={onLogout}
          className="h-8 bg-slate-400 p-5 flex justify-center items-center"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
