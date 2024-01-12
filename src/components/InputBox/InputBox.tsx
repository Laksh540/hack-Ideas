interface IProps {
  hideLabel?: string;
  label?: string;
  onChange: (e: any) => void;
  value: string;
  name: string;
  validation?: string;
  hideError?: boolean;
}
const InputBox = (props: IProps) => {
  const { onChange, value, label, name, hideError, hideLabel, validation } =
    props;

  return (
    <div className="w-full ">
      {!hideLabel ? (
        <div className="mb-1">
          <label className="text-center text-xs">{label}</label>
        </div>
      ) : null}
      <input
        className="px-1 w-full h-8 text-xs border  focus:outline  focus:outline-slate-400 "
        name={name}
        onChange={onChange}
        value={value}
      />
      <div className="h-5">
        {!hideError ? (
          <div className=" mt-1 text-xs text-red-500 ">{validation ?? ""}</div>
        ) : null}
      </div>
    </div>
  );
};

export default InputBox;
