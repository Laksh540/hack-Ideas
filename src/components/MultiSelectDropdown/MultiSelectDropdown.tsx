import { useState } from "react";
import dropdownArrowIcon from "../../assets/icons/dropdown-arrow.svg";

interface IProps {
  hideLabel?: string;
  label?: string;
  onChange: (option: any) => void;
  value: any[];
  options: any[];
  optionValue: string;
  optionLabel: string;
  validation?: string;
  hideError?: boolean;
}
const MultiSelectDropdown = (props: IProps) => {
  const {
    onChange,
    value,
    label,
    hideError,
    hideLabel,
    validation,
    options,
    optionValue,
    optionLabel,
  } = props;

  const [showPanel, setShowPanel] = useState(false);

  const onTogglePanel = () => {
    console.log("show panel ", showPanel);

    setShowPanel((prevState) => !prevState);
  };

  const renderPanel = () => {
    return (
      <ul
        className={` bg-slate-50  ${
          showPanel ? "block" : "hidden"
        } absolute box-border left-0 w-full list-none  pl-0 `}
      >
        {options.map((option) => {
          const isSelected = value?.some(
            (element: any) => element?.[optionValue] === option?.[optionValue]
          );

          return (
            <li
              className=" flex items-center  py-1.5 px-3 cursor-pointer hover:bg-[#eee]"
              onClick={() => onChange(option)}
            >
              <input
                type="checkbox"
                checked={isSelected}
                className=" mr-1.5"
              ></input>
              <span className="text-xs">{option?.[optionLabel]}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      {!hideLabel ? (
        <label className="text-center text-xs mb-1">{label}</label>
      ) : null}
      <div className="relative ">
        <button
          className=" w-full border text-sm px-1.5 py-2 flex justify-between items-center  "
          onClick={onTogglePanel}
        >
          <div className="text-xs">{value.length} selected</div>
          <div className=" w-4 h-4">
            <img src={dropdownArrowIcon} />
          </div>
        </button>
        {renderPanel()}
      </div>
      <div className="h-5">
        {!hideError ? (
          <div className="mt-1 text-xs text-red-500">{validation ?? ""}</div>
        ) : null}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
