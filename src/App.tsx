import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import {
  LINK_BASEURL,
  LINK_CREATE_HACK_IDEA,
  LINK_HOME,
  LINK_LOGIN,
} from "./routes";
import Page404 from "./Page/Page404";
import Loading from "./components/Loading";

function App(props: any) {
  const navigate = useNavigate();
  const location = useLocation();
  // useEffect

  useEffect(() => {
    setTimeout(() => {
      if (location.pathname === "") {
        navigate(LINK_LOGIN);
      }
    }, 500);
  }, []);

  const PageLogin = React.lazy(() => import("./Page/PageLogin"));

  const PageHackIdeaListing = React.lazy(
    () => import("./Page/PageHackIdeaListing")
  );

  const PageCreateHackIdea = React.lazy(
    () => import("./Page/PageCreateHackIdea")
  );

  return (
    <div>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path={"*"} element={<Page404 />} />
          <Route path={LINK_LOGIN} element={<PageLogin />} />
          <Route path={LINK_HOME} element={<PageHackIdeaListing />} />
          <Route
            path={LINK_CREATE_HACK_IDEA}
            element={<PageCreateHackIdea />}
          />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
