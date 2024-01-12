import React from "react";
import { useNavigate } from "react-router-dom";
import { LINK_CREATE_HACK_IDEA, LINK_LOGIN } from "../../routes";
import { BUTTON_VARIANTS, LOGIN_EMPLOYEE_ID } from "../../constants";
import ButtonBox from "../ButtonBox/ButtonBox";

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
        <div className="w-16 mr-5">
          <ButtonBox
            label="Create"
            onClick={onCreateHackIdea}
            variant={BUTTON_VARIANTS.PRIMARY}
          />
        </div>
        <div className="w-16">
          <ButtonBox
            label="Logout"
            onClick={onLogout}
            variant={BUTTON_VARIANTS.SECONDARY}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
