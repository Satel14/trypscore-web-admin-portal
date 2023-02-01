import React, { useContext } from "react";
import Dashboard from "../Pages/Dashboard";
import UserAdmin from "../Pages/UserAdmin";
import GlobalContext from "../common/Context";
import PageErrorBoundary from "../common/PageErrorBoundary";
import ErrorPage from "../Pages/ErrorPage";

const Home = () => {
  const { optionState, setNotFound } = useContext(GlobalContext);
  setNotFound(false);

  return (
    <>
      {optionState.nav === "error" && <ErrorPage />}
      {optionState.nav === "dashboard" && (
        <PageErrorBoundary>
          <Dashboard />
        </PageErrorBoundary>
      )}
      {optionState.nav === "useradmin" && (
        <PageErrorBoundary>
          <UserAdmin />
        </PageErrorBoundary>
      )}
    </>
  );
};

export default Home;
