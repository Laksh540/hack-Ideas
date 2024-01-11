import React from "react";

interface IProps {
  label: string;
}

const Chip = (props: IProps) => {
  return (
    <div className=" h-6 flex justify-center items-center border border-gray-400 rounded-md bg-slate-200 px-3 py-1.5 w-fit max-w-20 truncate">
      <div>
        <label className=" text-xs self-center">{props.label}</label>
      </div>
    </div>
  );
};

export default Chip;
