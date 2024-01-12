import React, { useState } from "react";
import {
  BUTTON_VARIANTS,
  LOGIN_EMPLOYEE_ID,
  VALIDATION,
} from "../../constants";
import {
  TValidationRuleType,
  isEmptyField,
  isFieldValid,
  showValidationMessage,
} from "../../commonUtils";
import { useNavigate } from "react-router-dom";
import InputBox from "../../components/InputBox";
import ButtonBox from "../../components/ButtonBox";

interface IFields {
  employeeId: string;
}
interface IErrorFields {
  employeeId: string;
}
interface IPageObj extends IFields {
  error: IErrorFields;
}

const initialPageObj: IPageObj = {
  employeeId: "",
  error: {
    employeeId: "",
  },
};
let validationFields: Array<{
  field: keyof IFields;
  validation: TValidationRuleType;
}> = [{ field: "employeeId", validation: VALIDATION.MANDATORY.CODE }];

const PageLogin = (props: any) => {
  const navigate = useNavigate();
  // states
  const [pageObj, setPageObj] = useState<IPageObj>({
    ...initialPageObj,
  });
  // use effect

  // validations
  const validateForm = () => {
    let isFormValid = true;
    for (const field of validationFields) {
      if (!isFieldValid(pageObj[field.field], field.validation)) {
        isFormValid = false;
        break;
      }
    }

    setPageObj((prevPageObj) => ({
      ...prevPageObj,
      error: {
        ...prevPageObj.error,
        ...updateErrorMessage(),
      },
    }));
    return isFormValid;
  };

  // onChange

  const handleChange = (e: any) => {
    setPageObj((prevPageObj) => ({
      ...prevPageObj,
      [e.target.name]: e.target.value,
    }));
  };

  // onClick

  const onLogin = () => {
    if (!validateForm()) {
      return;
    }
    localStorage.setItem(LOGIN_EMPLOYEE_ID, pageObj.employeeId);
    console.log("props ", props);
    navigate("/home ");
  };

  // Helper
  const updateErrorMessage: () => IErrorFields = () => {
    let updatedErrorMessage: IErrorFields = {
      ...initialPageObj.error,
    };
    for (const field of validationFields) {
      updatedErrorMessage[field.field] = showValidationMessage(
        pageObj[field.field],
        VALIDATION[field.validation].CODE
      );
    }
    return updatedErrorMessage;
  };

  return (
    <div className="flex justify-center items-center h-lvh">
      <div className="w-96 flex flex-col gap-5">
        <label className="text-center">Hack Ideas</label>
        <InputBox
          name="employeeId"
          label="Employee Id"
          onChange={handleChange}
          value={pageObj?.employeeId}
          validation={pageObj?.error?.employeeId ?? ""}
        />
        <ButtonBox
          label="Login"
          onClick={onLogin}
          variant={BUTTON_VARIANTS.PRIMARY}
        />
      </div>
    </div>
  );
};

export default PageLogin;
