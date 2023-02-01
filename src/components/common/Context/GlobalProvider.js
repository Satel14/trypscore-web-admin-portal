import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext({});

export const GlobalProvider = (props) => {
  const [firebaseState] = useState(props.fsvc);
  const [companyState, setCompanyState] = useState();
  const [optionState, setOptionState] = useState({ nav: "dashboard" });
  const [linking, setLinking] = useState(false);
  const [linkClaim, setLinkClaim] = useState(false);
  const [signError, setSignError] = useState("");
  const [signLoad, setSignLoad] = useState(false);
  const [signUp, setSignUp] = useState(true);
  const [mobileView, setMobileView] = useState(false);
  const [tabletView, setTabletView] = useState(false);
  const [desktopView, setDesktopView] = useState(false);
  const [largeView, setLargeView] = useState(false);
  const [authUser, setAuthUser] = useState();
  const [userBrowserName, setUserBrowserName] = useState("");
  const [headerHeight, setHeaderHeight] = useState("0px");
  const [headerNavHeight, setHeaderNavHeight] = useState("0px");
  const [notFound, setNotFound] = useState(true);

  useEffect(() => {
    setCompanyState(authUser?.company);
  }, [authUser]);

  useEffect(() => {
    setDesktopView(!mobileView && !tabletView && !largeView);
    if (mobileView) {
      setHeaderNavHeight("106px");
      setHeaderHeight("54px");
    } else if (largeView) {
      setHeaderNavHeight("130px");
      setHeaderHeight("64px");
    } else {
      setHeaderNavHeight("113px");
      setHeaderHeight("57px");
    }
  }, [mobileView, tabletView, largeView]);

  return (
    <GlobalContext.Provider
      value={{
        firebaseState,
        companyState,
        setCompanyState,
        optionState,
        setOptionState,
        linking,
        setLinking,
        signError,
        setSignError,
        signLoad,
        setSignLoad,
        signUp,
        setSignUp,
        linkClaim,
        setLinkClaim,
        mobileView,
        setMobileView,
        tabletView,
        setTabletView,
        desktopView,
        largeView,
        setLargeView,
        authUser,
        setAuthUser,
        userBrowserName,
        setUserBrowserName,
        headerHeight,
        headerNavHeight,
        notFound,
        setNotFound,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
