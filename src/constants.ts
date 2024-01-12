import { TValidationRuleType } from "./commonUtils";

export const LOGIN_EMPLOYEE_ID = "LOGIN_EMPLOYEE_ID";

export const HACK_IDEAS = "HACK_IDEAS";

export const VALIDATION: Record<
  TValidationRuleType,
  {
    CODE: TValidationRuleType;
    MESSAGE: string;
  }
> = {
  MANDATORY: {
    CODE: "MANDATORY",
    MESSAGE: "Mandatory",
  },
};

export type TSortListBy = "UPVOTE_COUNT" | "CREATED_AT";
export const SORT_LIST_BY: Record<TSortListBy, TSortListBy> = {
  UPVOTE_COUNT: "UPVOTE_COUNT",
  CREATED_AT: "CREATED_AT",
};

export const SORT_LIST_BY_OPTIONS: { name: string; code: TSortListBy }[] = [
  {
    name: "Upvote count",
    code: "UPVOTE_COUNT",
  },
  {
    name: "Created at",
    code: "CREATED_AT",
  },
];

export type TButtonVariants = "PRIMARY" | "SECONDARY" | "TERNARY";
export const BUTTON_VARIANTS: Record<TButtonVariants, TButtonVariants> = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
  TERNARY: "TERNARY",
};
