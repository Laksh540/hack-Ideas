import React, { useState } from "react";
import { HACK_IDEAS, VALIDATION } from "../../constants";
import {
  TValidationRuleType,
  isEmptyField,
  isFieldValid,
  showValidationMessage,
} from "../../commonUtils";
import { useNavigate } from "react-router-dom";
//  create a component for  input field , button  ,multiselect dropdown
// validation  for input while login  employeeId should not be empty
interface IEmployeeData {
  employeeId: string;
}

export interface IHackIdea {
  title: string;
  description: string;
  tags: string;
  upVotes?: number;
  createdOn: Date;
}

interface IFields {
  title: string;
  description: string;
  tags: string; // string[]  need to create multiselect for dropdown
}
interface IPageObj extends IFields {
  error: IFields;
}
let validationFields: Array<{
  field: keyof IFields;
  validation: TValidationRuleType;
}> = [
  { field: "title", validation: VALIDATION.MANDATORY.CODE },
  { field: "description", validation: VALIDATION.MANDATORY.CODE },
  { field: "title", validation: VALIDATION.MANDATORY.CODE },
];
const initialPageObj = {
  title: "",
  description: "",
  tags: "",
  error: {
    title: "",
    description: "",
    tags: "",
  },
};

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

  const onCreate = () => {
    if (!validateForm()) {
      return;
    }
    const enrichObj = enrichForCreate();
    let ideaList: IHackIdea[] = [];

    const existingHackIdeas = localStorage.getItem(HACK_IDEAS);
    if (!existingHackIdeas) {
      ideaList.push(enrichObj);
    } else {
      ideaList = [...JSON.parse(existingHackIdeas)];
      ideaList.push(enrichObj);
    }
    // call enrichForCreate
    localStorage.setItem(HACK_IDEAS, JSON.stringify(enrichObj));
    console.log("props ", props);
    navigate("/home "); /// naviagate to the listing page
  };

  // helper
  const updateErrorMessage: () => IFields = () => {
    let updatedErrorMessage: IFields = {
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

  const enrichForCreate: () => IHackIdea = () => {
    const enrichObj: IHackIdea = {
      title: pageObj?.title,
      description: pageObj?.description,
      tags: pageObj?.tags,
      createdOn: new Date(),
      upVotes: 0,
    };
    return enrichObj;
  };

  return (
    <div className="flex justify-center items-center h-lvh">
      <div className="w-96 flex flex-col gap-5">
        <label className="text-center">Create Hack Idea</label>
        <div>
          <label className="text-center">Title</label>
          <input className="w-full h-8 " name="title" onChange={handleChange} />
          <div>{pageObj?.error?.title ?? ""}</div>
        </div>
        <div>
          <label className="text-center">Description</label>
          <input
            className="w-full h-8 "
            name="description"
            onChange={handleChange}
          />
          <div>{pageObj?.error?.description ?? ""}</div>
        </div>
        <div>
          <label className="text-center">Tags</label>
          <input className="w-full h-8 " name="Tags" onChange={handleChange} />
          <div>{pageObj?.error?.tags ?? ""}</div>
        </div>

        <button className=" w-full h-8 bg-slate-400" onClick={onCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default PageLogin;
