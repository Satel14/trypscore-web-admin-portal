import { useState, useEffect, useContext, useCallback } from "react";
import GlobalContext from "../common/Context";
import * as constants from "../../constants";

const INITIAL_STATE = {
  company: null,
  profile: null,
  authUser: null,
};

const initAuthObj = () => ({
  auth: null,
  token: null,
  tokenFetched: false,
  settingClaim: false,
  claimSet: false,
  dashUser: null,
  dashUserFetching: false,
  dashUserFetched: false,
  mustAddDashUser: false,
  dashUserAdded: false,
  userInfo: null,
  userInfoSet: false,
  authDone: false,
  forceToken: false,
  company: null,
  companyFetched: true,
});

const useFirebaseAuthentication = (fb) => {
  const { firebaseState, setSignLoad, setSignError, setLinking, linking } =
    useContext(GlobalContext);

  const [authUser, setAuthUser] = useState(INITIAL_STATE);
  const [appFirstLoading, setAppFirstLoading] = useState(true);
  const [authObj, setAuthObj] = useState(initAuthObj);

  const resetAuth = useCallback(() => {
    setAuthUser(INITIAL_STATE);
    setAuthObj(initAuthObj());
    setSignLoad(false);
    setAppFirstLoading(false);
    sessionStorage.clear();
  }, [setSignLoad]);

  const badSignIn = useCallback(async () => {
    await firebaseState.doSignOut();
    setSignError(constants.SIGNIN_NO_ACCESS);
    resetAuth();
  }, [firebaseState, setSignError, resetAuth]);

  const getToken = useCallback(async () => {
    try {
      const token = await authObj.auth?.getIdTokenResult(authObj.forceToken);
      setAuthObj((prev) => ({
        ...prev,
        token,
        tokenFetched: true,
        forceToken: false,
      }));
      if (token.claims?.wa || linking) {
        setAuthUser((prev) => ({ ...prev, authUser: authObj.auth }));
      }
    } catch (e) {
      console.error(`Auth error: getIdTokenResult(${authObj.forceToken})`);
      console.error(e);
    }
  }, [authObj.auth, authObj.forceToken, linking]);

  const setCustomClaim = useCallback(async () => {
    setAuthObj((prev) => ({ ...prev, settingClaim: true }));
    window.localStorage.setItem("linkClaim", false);
    try {
      await firebaseState.setCustomClaim(
        authObj.auth?.email || authObj.token.claims.user.email,
        "wa"
      );
      setAuthObj((prev) => ({
        ...prev,
        settingClaim: false,
        claimSet: true,
        tokenFetched: false,
        forceToken: true,
      }));
    } catch (e) {
      console.error(e);
    }
  }, [firebaseState, authObj.auth, authObj.token]);

  const getDashboardUser = useCallback(async () => {
    setSignLoad(false);
    setAppFirstLoading(false);
    setAuthObj((prev) => ({ ...prev, dashUserFetching: true }));
    try {
      const dUser = await firebaseState.getDashboardUserByEmail(
        authObj.auth?.email || authObj.token?.claims.user.email
      );
      !dUser
        ? await badSignIn()
        : setAuthObj((prev) => ({
            ...prev,
            dashUser: dUser,
            dashUserFetched: true,
          }));
    } catch (e) {
      console.error(e);
    }
  }, [firebaseState, authObj.auth, setSignLoad, authObj.token, badSignIn]);

  const getCompany = useCallback(async () => {
    try {
      const company = await firebaseState.getCompanyById(
        authObj.dashUser.uidCompany
      );
      setAuthObj((prev) => ({ ...prev, company, companyFetched: true }));
    } catch (e) {
      console.error(e);
    }
  }, [authObj.dashUser, firebaseState]);

  const finishAuth = useCallback(() => {
    setSignError("");
    setAuthUser(authObj.userInfo);
    setAuthObj((prev) => ({ ...prev, authDone: true }));
  }, [authObj.userInfo, setSignError]);

  /* First step, get token (or refresh token if custom claims set) */
  useEffect(() => {
    authObj.auth && !authObj.tokenFetched && getToken();
  }, [authObj.auth, authObj.tokenFetched, getToken]);

  /* Get Dashboard user by token */
  useEffect(() => {
    !authObj.dashUserFetched &&
      !authObj.dashUserFetching &&
      authObj.tokenFetched &&
      authObj.token?.claims?.wa &&
      getDashboardUser();
  }, [
    authObj.token,
    authObj.tokenFetched,
    authObj.dashUserFetching,
    authObj.dashUserFetched,
    getDashboardUser,
  ]);

  /* Linking, with just the linking global */
  useEffect(() => {
    linking &&
      authObj.auth &&
      !authObj.claimSet &&
      !authObj.settingClaim &&
      setCustomClaim();
  }, [
    linking,
    authObj.auth,
    authObj.claimSet,
    authObj.settingClaim,
    setCustomClaim,
  ]);

  /* Get user company */
  useEffect(() => {
    authObj.dashUserFetched && authObj.dashUser && getCompany();
  }, [authObj.dashUserFetched, authObj.dashUser, getCompany]);

  /* Set user info */
  useEffect(() => {
    authObj.companyFetched &&
      authObj.company &&
      setAuthObj((prev) => ({
        ...prev,
        userInfo: {
          company: authObj.company,
          profile: authObj.dashUser,
          authUser: authObj.auth,
        },
        userInfoSet: true,
      }));
  }, [authObj.auth, authObj.company, authObj.companyFetched, authObj.dashUser]);

  /* Last Step */
  useEffect(() => {
    !authObj.authDone && authObj.userInfoSet && finishAuth();
  }, [authObj.authDone, authObj.userInfoSet, finishAuth]);

  /* If done, set linking false */
  useEffect(() => {
    authObj.authDone && setLinking(false);
  }, [authObj.authDone, setLinking]);

  /* Setup */
  useEffect(() => {
    const fetchData = async (auth) => {
      const linkClaim = JSON.parse(window.localStorage.getItem("linkClaim"));
      setAuthObj({ ...initAuthObj(), auth });
      setLinking(linkClaim);
    };
    const unlisten = fb
      .auth()
      .onAuthStateChanged((auth) => (auth ? fetchData(auth) : resetAuth()));
    return () => {
      unlisten();
    };
  }, [fb, resetAuth, setLinking]);

  return { authUser, appFirstLoading };
};

export default useFirebaseAuthentication;
