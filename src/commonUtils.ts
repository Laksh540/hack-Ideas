import { VALIDATION } from "./constants";

export const isEmptyField = (value: any) => {
  if (!value) {
    return true;
  }
  if (Array.isArray(value)) {
    if (value?.length === 0) {
      return true;
    }
    return false;
  }
  if (value?.toString()?.trim() === "") {
    return true;
  }
  return false;
};

export type TValidationRuleType = "MANDATORY";
export const showValidationMessage = (
  value: any,
  rule: TValidationRuleType
) => {
  switch (rule) {
    case VALIDATION.MANDATORY.CODE:
      return isEmptyField(value) ? VALIDATION.MANDATORY.MESSAGE : "";

    default:
      return isEmptyField(value) ? VALIDATION.MANDATORY.MESSAGE : "";
  }
};

export const isFieldValid = (value: any, rule: TValidationRuleType) => {
  switch (rule) {
    case VALIDATION.MANDATORY.CODE:
      return isEmptyField(value) ? true : false;

    default:
      return isEmptyField(value) ? true : false;
  }
};
