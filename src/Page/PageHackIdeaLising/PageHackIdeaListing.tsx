import React, { useEffect, useState } from "react";
import { HACK_IDEAS, LOGIN_EMPLOYEE_ID, VALIDATION } from "../../constants";
import {
  TValidationRuleType,
  isEmptyField,
  isFieldValid,
  showValidationMessage,
} from "../../commonUtils";
import { useNavigate } from "react-router-dom";
import { IHackIdea } from "../PageCreateHackIdea/PageCreateHackIdea";
import Header from "../../components/Header/Header";
//  create a component for  input field , button  ,multiselect dropdown
// validation  for input while login  employeeId should not be empty

interface IPageObj {
  listOfAllIdeas: IHackIdea[];
}
const initialPageObj: IPageObj = {
  listOfAllIdeas: [],
};

const PageHackIdeaListing = (props: any) => {
  let firstRender = true;
  const employeeId = localStorage.getItem(LOGIN_EMPLOYEE_ID) ?? "";
  // const;
  // states
  const [pageObj, setPageObj] = useState<IPageObj>({
    ...initialPageObj,
  });
  // use effect
  useEffect(() => {
    const ideas = localStorage.getItem(HACK_IDEAS);
    let parsedIdeas = JSON.parse(ideas ?? "{}");
    if (Array.isArray(parsedIdeas)) {
      setPageObj((prevPageObj) => {
        let updatedPageObj = { ...prevPageObj };
        updatedPageObj.listOfAllIdeas = [...parsedIdeas];
        return updatedPageObj;
      });
    }
  }, []);

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
    } else {
      let updatedList = JSON.stringify(pageObj?.listOfAllIdeas);
      localStorage.setItem(HACK_IDEAS, updatedList);
    }
  }, [pageObj?.listOfAllIdeas]);

  // validations

  // onChange

  const handleChange = (e: any) => {
    setPageObj((prevPageObj) => ({
      ...prevPageObj,
      [e.target.name]: e.target.value,
    }));
  };

  // onClick

  const onUpVote = (uid: string) => {
    console.log("employee id", employeeId);

    setPageObj((prevPageObj) => {
      let updatedPageObj = { ...prevPageObj };
      const index = updatedPageObj.listOfAllIdeas.findIndex(
        (idea) => idea.uid === uid
      );
      if (index === -1) {
        return updatedPageObj;
      }
      const userUpVote = updatedPageObj.listOfAllIdeas[index]?.upVotes?.find(
        (upVote) => upVote.employeeId === employeeId
      );
      if (userUpVote) {
        updatedPageObj.listOfAllIdeas[index].upVotes =
          updatedPageObj.listOfAllIdeas[index]?.upVotes?.filter(
            (upVote) => upVote.uid === userUpVote.uid
          );
      } else {
        updatedPageObj.listOfAllIdeas[index].upVotes.push({
          uid: Math.floor(10000 + Math.random() * 90000).toString(),
          createdAt: new Date(),
          employeeId: employeeId,
        });
      }
      return updatedPageObj;
    });
  };
  // Helper
  const userVoted = (uid: string) => {
    const hackIdea = pageObj.listOfAllIdeas.find((idea) => idea.uid === uid);
    let alreadyUpVoted = false;
    if (!hackIdea) {
      return false;
    }
    if (hackIdea) {
      alreadyUpVoted = hackIdea.upVotes.some(
        (upVote) => upVote.employeeId === employeeId
      );
    }
    return alreadyUpVoted;
  };

  const totalNoOfUpVotes = (uid: string) => {
    const hackIdea = pageObj.listOfAllIdeas.find((idea) => idea.uid === uid);
    let totalUpVotes = 0;
    if (!hackIdea) {
      return 0;
    }
    if (hackIdea) {
      totalUpVotes = hackIdea.upVotes.length;
    }
    return totalUpVotes;
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-4 ">
        <div className="mt-4 "></div>
        {pageObj.listOfAllIdeas.map((idea: IHackIdea) => (
          <div className="flex flex-col gap-5 border border-gray-400 rounded-lg">
            <div>
              <div>
                <label className="text-sm text-bold mb-1.5">Title</label>
              </div>
              <div className="">
                <span className="text-sm">{idea.title}</span>
              </div>
            </div>
            <div>
              <div>
                <label className="text-sm text-bold mb-1.5">Description</label>
              </div>
              <div className="">
                <span className="text-sm">{idea.description}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="w-24">
                <button
                  className="text-sm text-bold mr-3"
                  onClick={() => onUpVote(idea.uid)}
                  disabled={userVoted(idea.uid)}
                >
                  {userVoted(idea.uid) ? "Voted !" : "Up Vote"}
                </button>
              </div>
              <div>
                <label className="text-sm  mb-1.5">
                  {totalNoOfUpVotes(idea.uid)}
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PageHackIdeaListing;
