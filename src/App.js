import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import getCustomMuiTheme from "./CustomMuiTheme";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Layout from "./components/common/Layout";
import { useFirebaseAuthentication } from "./components/Firebase";
import GlobalContext from "./components/common/Context";
import Navbar from "./components/common/Navbar";
import LoadingModal from "./components/common/LoadingModal";
import Verify from "./components/Pages/Verify";
import { useScript } from "./components/common/Utils";
import BrowserUtils from "./components/common/Utils/BrowserUtils";
import ErrorPage from "./components/Pages/ErrorPage";
import PageErrorBoundary from "./components/common/PageErrorBoundary";
import ResetPass from "./components/Pages/ResetPass";
import ForgotPassword from "./components/Pages/ForgotPassword";

import * as constants from "./constants";

const customTheme = getCustomMuiTheme();
const browserUtil = BrowserUtils();

function PrivateRoute({ children, authenticated, isLoading, ...rest }) {
  return (
    <Route {...rest}>
      {authenticated ? (
        isLoading ? (
          <LoadingModal width={6} />
        ) : (
          children
        )
      ) : (
        <Redirect to={constants.SIGNIN_LINK} />
      )}
    </Route>
  );
}

function PublicRoute({ children, authenticated, isLoading, signUp, ...rest }) {
  return (
    <Route {...rest}>
      {!authenticated || signUp ? (
        isLoading ? (
          <LoadingModal width={6} />
        ) : (
          children
        )
      ) : (
        <Redirect to={constants.DB_LINK} />
      )}
    </Route>
  );
}

const App = () => {
  useScript(
    "https://static.zdassets.com/ekr/snippet.js?key=41c7d9c3-9cfe-456b-9306-34b36998964a",
    "ze-snippet"
  );
  const global = useContext(GlobalContext);
  const tabletView = useMediaQuery("(max-width:1280px) and (min-width:744px)");
  const mobileView = useMediaQuery("(max-width:743px) and (min-width:300px)");
  const largeView = useMediaQuery("(min-width:2000px)");
  global.setMobileView(mobileView);
  global.setTabletView(tabletView);
  global.setLargeView(largeView);

  const userBrowserName = browserUtil.getUserBrowserName();
  global.setUserBrowserName(userBrowserName);

  const signUp = global.signUp;
  const { authUser, appFirstLoading } = useFirebaseAuthentication(
    global.firebaseState.firebase
  );
  const authenticated = authUser?.authUser?.uid;

  useEffect(() => {
    !appFirstLoading && authUser && global.setAuthUser(authUser);
  }, [appFirstLoading, authUser, global]);

  return (
    <Router>
      <ThemeProvider theme={customTheme}>
        <Layout>
          <Navbar isLoggedIn={authenticated} />
          <Switch>
            {/* This first route is just for backwards compatibility with the old dd, just in case */}
            <PublicRoute
              exact
              path="/signin"
              authenticated={authenticated}
              isLoading={appFirstLoading}
            >
              <PageErrorBoundary>
                <SignIn />
              </PageErrorBoundary>
            </PublicRoute>

            <PublicRoute
              exact
              path={constants.SIGNIN_LINK}
              authenticated={authenticated}
              isLoading={appFirstLoading}
            >
              <PageErrorBoundary>
                <SignIn />
              </PageErrorBoundary>
            </PublicRoute>

            <PrivateRoute
              path={constants.DB_LINK}
              authenticated={authenticated}
              isLoading={appFirstLoading}
            >
              <Home />
            </PrivateRoute>

            <PublicRoute
              path={constants.CREATE_ACC_LINK}
              authenticated={authenticated}
              signUp={signUp}
              isLoading={appFirstLoading}
            >
            </PublicRoute>

            <PublicRoute
              path={constants.VERIFY_PATH}
              authenticated={authenticated}
              signUp={signUp}
              isLoading={appFirstLoading}
            >
              <PageErrorBoundary>
                <Verify />
              </PageErrorBoundary>
            </PublicRoute>

            <PublicRoute
              path={constants.RESET_PATH}
              authenticated={authenticated}
              signUp={signUp}
              isLoading={appFirstLoading}
            >
              <PageErrorBoundary>
                <ResetPass />
              </PageErrorBoundary>
            </PublicRoute>

            <PublicRoute
              path={constants.LINK_PATH}
              authenticated={authenticated}
              signUp={signUp}
              isLoading={appFirstLoading}
            >
            </PublicRoute>

            <PublicRoute
              path={constants.FORGOT_PATH}
              authenticated={authenticated}
              isLoading={appFirstLoading}
            >
              <PageErrorBoundary>
                <ForgotPassword />
              </PageErrorBoundary>
            </PublicRoute>

            <Route path={constants.ERROR_PATH} component={ErrorPage} />
            <Route>
              <ErrorPage pageNotFound />
            </Route>
          </Switch>
        </Layout>
      </ThemeProvider>
    </Router>
  );
};

export default App;
