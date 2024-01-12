import React, { useEffect, useState } from "react";
import {
  BUTTON_VARIANTS,
  HACK_IDEAS,
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
// import dropdownArrowIcon from "assets/icons/dropdown-arrow.svg";
import { LINK_HOME, LINK_LOGIN } from "../../routes";
import MultiSelectDropdown from "../../components/MultiSelectDropdown";
import InputBox from "../../components/InputBox/InputBox";
import ButtonBox from "../../components/ButtonBox/ButtonBox";
//  create a component for  input field , button  ,multiselect dropdown
// validation  for input while login  employeeId should not be empty

export interface IUpVotes {
  uid: string;
  employeeId: string;
  createdAt: Date;
}
export interface IHackIdea {
  uid: string;
  title: string;
  description: string;
  tags: ITag[];
  upVotes: IUpVotes[];
  // isUserUpVote: boolean;
  createdBy: string;
  createdOn: Date;
}
export interface ITag {
  name: string;
  code: string;
}
interface IFields {
  title: string;
  description: string;
  tags: ITag[]; // string[]  need to create multiselect for dropdown
}

interface IErrorFields {
  title: string;
  description: string;
  tags: string; // string[]  need to create multiselect for dropdown
}
interface IPageObj extends IFields {
  error: IErrorFields;
}
let validationFields: Array<{
  field: keyof IFields;
  validation: TValidationRuleType;
}> = [
  { field: "title", validation: VALIDATION.MANDATORY.CODE },
  { field: "description", validation: VALIDATION.MANDATORY.CODE },
  { field: "tags", validation: VALIDATION.MANDATORY.CODE },
];
const initialPageObj = {
  title: "",
  description: "",
  tags: [],
  error: {
    title: "",
    description: "",
    tags: "",
  },
};

const TAGS = [
  { name: "Feature", code: "FEATURE" },
  { name: "Tech", code: "TEACH" },
];

const PageCreateHackIdea = (props: any) => {
  let employeeId = localStorage.getItem(LOGIN_EMPLOYEE_ID);
  const navigate = useNavigate();
  // states
  const [pageObj, setPageObj] = useState<IPageObj>({
    ...initialPageObj,
  });
  // use effect

  useEffect(() => {
    if (!employeeId) {
      navigate(LINK_LOGIN);
    }
  }, []);

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

  const toggleOption = (option: ITag) => {
    setPageObj((prevPageObj) => {
      // if it's in, remove
      const updatedPageObj = { ...prevPageObj };
      if (updatedPageObj.tags.some((tag: ITag) => tag.code === option.code)) {
        updatedPageObj.tags = updatedPageObj.tags.filter(
          (tag) => tag.code != option.code
        );
      } else {
        updatedPageObj.tags = [...updatedPageObj.tags, { ...option }];
      }

      return updatedPageObj;
    });
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
    // console.log("ideaList", ideaList);

    // call enrichForCreate
    localStorage.setItem(HACK_IDEAS, JSON.stringify(ideaList));
    console.log("props ", props);
    navigate(LINK_HOME); /// naviagate to the listing page
  };

  // helper
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

  const enrichForCreate: () => IHackIdea = () => {
    const enrichObj: IHackIdea = {
      uid: Math.floor(10000 + Math.random() * 90000).toString(),
      title: pageObj?.title,
      description: pageObj?.description,
      tags: pageObj?.tags,
      createdOn: new Date(),
      createdBy: employeeId ?? "",
      upVotes: [],
    };
    return enrichObj;
  };

  return (
    <div className="flex justify-center items-center h-lvh">
      <div className="w-96 flex flex-col gap-5">
        <label className="text-center">Create Hack Idea</label>

        <InputBox
          name="title"
          label="Title"
          onChange={handleChange}
          value={pageObj?.title}
          validation={pageObj?.error?.title ?? ""}
        />

        <InputBox
          name="description"
          label="Description"
          onChange={handleChange}
          value={pageObj?.description}
          validation={pageObj?.error?.description ?? ""}
        />

        <MultiSelectDropdown
          options={TAGS}
          optionLabel="name"
          optionValue="code"
          label="Tags"
          onChange={toggleOption}
          value={pageObj?.tags}
          validation={pageObj?.error?.tags}
        />

        <ButtonBox
          label="Create"
          onClick={onCreate}
          variant={BUTTON_VARIANTS.PRIMARY}
        />
      </div>
    </div>
  );
};

export default PageCreateHackIdea;
