import React from "react";

//  create a component for  input field , button  ,multiselect dropdown
// validation  for input while login  employeeId should not be empty
interface IEmployeeData {
  employeeId: string;
}

interface IHackIdea {
  title: string;
  description: string;
  tags: string;
}
interface IHackIdeaData {
  ideas: [];
}

const PageLogin = () => {
  return (
    <div className="flex justify-center items-center h-lvh">
      <div className="w-96 flex flex-col gap-5">
        <label className="text-center">Hack Ideas</label>
        <div>
          <label className="text-center">Employee Id</label>
          <input className="w-full h-8 " />
        </div>

        <button className=" w-full h-8 bg-slate-400">test</button>
      </div>
    </div>
  );
};

export default PageLogin;
