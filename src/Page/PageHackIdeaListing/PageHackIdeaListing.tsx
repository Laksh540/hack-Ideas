import { useEffect, useState } from "react";
import Chip from "../../components/Chip/Chip";
import Header from "../../components/Header/Header";
import {
  BUTTON_VARIANTS,
  HACK_IDEAS,
  LOGIN_EMPLOYEE_ID,
  SORT_LIST_BY,
  SORT_LIST_BY_OPTIONS,
  TSortListBy,
} from "../../constants";
import {
  IHackIdea,
  ITag,
  IUpVotes,
} from "../PageCreateHackIdea/PageCreateHackIdea";
import { useNavigate } from "react-router-dom";
import { LINK_LOGIN } from "../../routes";
import SimpleDropdown from "../../components/SimpleDropdown/SimpleDropdown";
import ButtonBox from "../../components/ButtonBox/ButtonBox";
//  create a component for  input field , button  ,multiselect dropdown
// validation  for input while login  employeeId should not be empty

interface IPageObj {
  listOfAllIdeas: IHackIdea[];
  sortBy: TSortListBy | "";
}
const initialPageObj: IPageObj = {
  listOfAllIdeas: [],
  sortBy: "",
};

const PageHackIdeaListing = (props: any) => {
  const navigate = useNavigate();
  const employeeId = localStorage.getItem(LOGIN_EMPLOYEE_ID) ?? "";
  // const;
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
    if (pageObj.sortBy !== "") {
      setPageObj((prevPageObj) => {
        let updatedPageObj = { ...prevPageObj };
        let sortedList;
        if (prevPageObj.sortBy === SORT_LIST_BY.UPVOTE_COUNT) {
          sortedList = updatedPageObj.listOfAllIdeas?.sort(
            (idea1, idea2) => idea2.upVotes.length - idea1.upVotes.length
          );
        } else if (prevPageObj.sortBy === SORT_LIST_BY.CREATED_AT) {
          sortedList = updatedPageObj.listOfAllIdeas?.sort(
            (idea1, idea2) =>
              new Date(idea2.createdOn).getTime() -
              new Date(idea1.createdOn).getTime()
          );
        }
        return updatedPageObj;
      });
    }
  }, [pageObj.sortBy]);

  useEffect(() => {
    console.log("list of ideas", pageObj?.listOfAllIdeas);
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
      let updatedPageObj = structuredClone(prevPageObj);
      const index = updatedPageObj.listOfAllIdeas.findIndex(
        (idea: IHackIdea) => idea.uid === uid
      );
      if (index === -1) {
        return updatedPageObj;
      }
      const userUpVote = updatedPageObj.listOfAllIdeas[index]?.upVotes?.find(
        (upVote: IUpVotes) => upVote.employeeId === employeeId
      );
      if (userUpVote) {
        updatedPageObj.listOfAllIdeas[index].upVotes =
          updatedPageObj.listOfAllIdeas[index]?.upVotes?.filter(
            (upVote: IUpVotes) => upVote.uid !== userUpVote.uid
          );
      } else {
        updatedPageObj.listOfAllIdeas[index].upVotes.push({
          uid: Math.floor(10000 + Math.random() * 90000).toString(),
          createdAt: new Date(),
          employeeId: employeeId,
        });
      }

      let updatedList = JSON.stringify(updatedPageObj?.listOfAllIdeas);
      localStorage.setItem(HACK_IDEAS, updatedList);
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
      <div className="grid grid-cols-4  gap-5 px-8 py-8 ">
        <div className="col-span-4">
          <Header />
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div className="mt-4 ">
          <div>
            <SimpleDropdown
              name="sortBy"
              placeholder="SortBy"
              options={SORT_LIST_BY_OPTIONS}
              optionLabel="name"
              optionValue="code"
              onChange={handleChange}
              value={pageObj?.sortBy}
              hideErrorRow
            />
          </div>
        </div>
        {pageObj.listOfAllIdeas.map((idea: IHackIdea) => (
          <div className="p-5 flex flex-col gap-5 border border-gray-600 rounded-lg">
            <div>
              <div>
                <label className="text-xs text-bold text-gray-400 mb-1.5 truncate">
                  Title
                </label>
              </div>
              <div className="">
                <span className="text-xs">{idea.title}</span>
              </div>
            </div>
            <div>
              <div>
                <label className="text-xs text-bold text-gray-600 mb-1.5">
                  Description
                </label>
              </div>
              <div className="max-h-96 truncate">
                <span className="text-xs">{idea.description}</span>
              </div>
            </div>
            <div>
              <div>
                <label className="text-xs  text-gray-600 text-bold mb-1.5">
                  Tags
                </label>
              </div>
              <div className="flex flex-wrap">
                {/* <span className="text-sm">{idea.description}</span> */}
                {idea?.tags?.map((tag: ITag) => (
                  <div className="mr-3 mb-3  last-of-type:mr-0">
                    <Chip label={tag.name} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end items-center">
              <div className="w-24">
                <ButtonBox
                  label={userVoted(idea.uid) ? "Voted !" : "Up Vote"}
                  onClick={() => onUpVote(idea.uid)}
                  variant={BUTTON_VARIANTS.TERNARY}
                />
              </div>
              <div>
                <label className="text-xs  mb-1.5">
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
