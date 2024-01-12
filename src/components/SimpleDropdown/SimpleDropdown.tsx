interface IProps {
  hideLabel?: string;
  label?: string;
  onChange: (e: any) => void;
  value: string;
  name: string;
  validation?: string;
  hideError?: boolean;
  placeholder: string;
  options?: any[];
  optionLabel: string;
  optionValue: string;
  hideErrorRow?: boolean;
}
const SimpleDropdown = (props: IProps) => {
  const {
    onChange,
    value,
    label,
    name,
    hideError,
    hideLabel,
    validation,
    placeholder,
    options,
    optionLabel,
    optionValue,
    hideErrorRow,
  } = props;

  return (
    <div className="w-full  ">
      {!hideLabel ? (
        <div className="mb-1">
          <label className="text-center text-xs">{label}</label>
        </div>
      ) : null}
      <select
        className="w-full px-1 py-1.5 border border-slate-400 focus:outline-slate-400"
        name={name}
        onChange={onChange}
        value={value}
      >
        <option
          className="text-xs  px-3 py-1.5"
          value=""
          disabled
          selected
          hidden
        >
          {placeholder}
        </option>
        {options?.map((option) => (
          <option className="text-xs px-3 py-1.5" value={option?.[optionValue]}>
            {option?.[optionLabel]}
          </option>
        ))}
      </select>
      {!hideErrorRow ? (
        <div className="h-5">
          {!hideError ? (
            <div className=" mt-1 text-xs text-red-500 ">
              {validation ?? ""}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SimpleDropdown;
