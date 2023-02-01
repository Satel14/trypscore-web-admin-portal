import firebase from "firebase/compat/app"; //v9
import "firebase/compat/auth"; //v9

export const Firebase = () => {
  let auth;
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const getFirebase = async () => {
    const configObj = await (await fetch("/__/firebase/init.json")).json();
    firebase.initializeApp(configObj);
    auth = firebase.auth();
  };

  const callFn = async (fn, data = {}) => {
    const token = await auth?.currentUser?.getIdToken();
    const headers = {
      "Content-Type": "application/json",
    };
    token && (headers.Authorization = `Bearer ${token}`);

    const res = await fetch(`${window.location.origin}/fns/${fn}`, {
      headers,
      method: "post",
      body: JSON.stringify({ data }),
    });
    if (res.status >= 200 && res.status <= 299) {
      const json = await res.json();
      return json;
    }
    throw new Error(res.statusText);
  };

  const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  const signInWithGooglePopUp = () => auth.signInWithPopup(provider);
  const signInWithGoogleRedirect = () => auth.signInWithRedirect(provider);

  const doSignOut = () => auth.signOut();

  const inviteUser = async (email) => {
    const { result } = await callFn("dashboardUser-inviteDashboardUser", {
      email,
      dashboard: "dd",
    });
    return result;
  };

  const sendVerification = async (email) => {
    const { result } = await callFn("dashboardUser-dbVerifyEmail", {
      email,
      dashboard: "dd",
    });
    return result;
  };

  const verifyUser = async (email) => {
    const { result } = await callFn("dashboardUser-verifyDashUser", {
      email,
      dashboard: "dd",
    });
    return result;
  };

  const sendPassReset = async (email) => {
    const { result } = await callFn("dashboardUser-PassResetEmail", {
      email,
      dashboard: "dd",
    });
    return result;
  };

  const resetPass = async (email, password) => {
    const { result } = await callFn("admin-webPassReset", { email, password });
    return result;
  };

  const getDashboardUserByEmail = async (email) => {
    const { result } = await callFn("dashboardUser-getDashboardUserByEmail", {
      email,
    });
    return result;
  };

  const getUsersByDashboardCompany = async (uidCompany) => {
    const { result } = await callFn("dashboardUser-getUserByDashboardCompany", {
      companyId: uidCompany,
      dashboard: "DD",
    });
    return result;
  };

  const addDashboardUser = async (user) => {
    const { result } = await callFn("dashboardUser-addDashboardUser", {
      user,
      dashboard: "dd",
    });
    return result;
  };

  const deleteDashboardUser = async (id) => {
    const { result } = await callFn("dashboardUser-deleteDashboardUser", {
      id,
      dashboard: "dd",
    });
    return result;
  };

  const updateDashboardUser = async (user) => {
    const { result } = await callFn("dashboardUser-updateDashboardUser", {
      user,
    });
    return result;
  };

  const getCompanyById = async (id) => {
    const { result } = await callFn("companies-getCompanyById", { id });
    return result;
  };

  const verifyInvite = async (email, inviteId) => {
    const { result } = await callFn("dashboardUser-verifyInvite", {
      email,
      inviteId,
      dashboard: "dd",
    });
    return result;
  };

  const createFbUser = async (email, password) => {
    const { result } = await callFn("admin-createEmailUser", {
      email,
      password,
    });
    return result;
  };

  const setCustomClaim = async (email, type) => {
    const { result } = await callFn("admin-setCustomClaim", {
      email: email,
      type: type,
    });
    return result;
  };

  const adminGetUserByEmail = async (email) => {
    const { result } = await callFn("admin-getUserByEmail", { email });
    return result;
  };

  return {
    firebase,
    getFirebase,
    doSignInWithEmailAndPassword,
    signInWithGooglePopUp,
    signInWithGoogleRedirect,
    doSignOut,
    inviteUser,
    sendVerification,
    verifyUser,
    sendPassReset,
    resetPass,
    getDashboardUserByEmail,
    getUsersByDashboardCompany,
    addDashboardUser,
    deleteDashboardUser,
    updateDashboardUser,
    getCompanyById,
    verifyInvite,
    createFbUser,
    setCustomClaim,
    adminGetUserByEmail,
  };
};
