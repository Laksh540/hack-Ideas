import { BUTTON_VARIANTS, TButtonVariants } from "../../constants";

interface IProps {
  label: string;
  onClick: () => void;
  variant: TButtonVariants;
}
const ButtonBox = (props: IProps) => {
  const { label, onClick, variant } = props;

  const getClassName = () => {
    if (variant === BUTTON_VARIANTS.PRIMARY) {
      return " bg-slate-400  hover:bg-slate-200  focus:outline  focus:outline-slate-400";
    } else if (variant === BUTTON_VARIANTS.SECONDARY) {
      return "border border-slate-400  hover:text-slate-700 focus:outline  focus:outline-slate-400";
    } else if (variant === BUTTON_VARIANTS.TERNARY) {
      return "text-blue-700  hover:text-blue-500";
    }
    return "bg-slate-400 hover:bg-slate-200 focus:outline  focus:outline-slate-400";
  };
  return (
    <button className={` w-full h-8  ${getClassName()}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default ButtonBox;
