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
