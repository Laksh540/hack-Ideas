import React, { useState } from "react";
import { LOGIN_EMPLOYEE_ID, VALIDATION } from "../../constants";
import {
  TValidationRuleType,
  isEmptyField,
  isFieldValid,
  showValidationMessage,
} from "../../commonUtils";
import { useNavigate } from "react-router-dom";
//  create a component for  input field , button  ,multiselect dropdown
// validation  for input while login  employeeId should not be empty

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
        <div>
          <label className="text-center">Employee Id</label>
          <input
            className="w-full h-8 "
            name="employeeId"
            onChange={handleChange}
          />
          <div>{pageObj?.error?.employeeId ?? ""}</div>
        </div>

        <button className=" w-full h-8 bg-slate-400" onClick={onLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default PageLogin;
