import { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import * as constants from "../../../constants";
import GlobalContext from "../../common/Context";
import ReBox from "../../common/ReBox";
import UserGrid from "../../common/UserGrid";
import LoadingWheel from "../../common/LoadingWheel";

const UserAdmin = () => {
  const global = useContext(GlobalContext);

  /* States */
  const [isBMLoading, setIsBMLoading] = useState(true);
  const [brandManagers, setBrandManagers] = useState([]);
  const [userMgmtOpen, setUserMgmtOpen] = useState(true);

  /* Styles */
  const containerStyle = {
    pt: 2,
    pb: global.mobileView ? 4 : global.tabletView ? 6 : 12,
    px: global.mobileView ? 2 : global.tabletView ? 3 : 10,
    display: "flex",
    flexDirection: "column",
  };
  const brandManagersStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };
  const userMgmtContainer = {
    display: "flex",
    flexDirection: "column",
    p: 4,
    mt: 2,
  };
  const userMgmtHeader = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const userGridStyle = {
    mt: 2,
    display: userMgmtOpen ? null : "none",
  };

  /* Hooks */
  useEffect(() => {
    const getUsers = async () => {
      const users = await global.firebaseState.getUsersByDashboardCompany(
        global.authUser?.company.id
      );
      setBrandManagers(
        users
          .filter((x) => x.perms.isDDBrandManager || x.perms.isDDAdmin)
          .map((x) => ` ${x.firstName} ${x.lastName}`)
      );
      setIsBMLoading(false);
    };
    global.authUser?.company && getUsers();
  }, [global.authUser, global.firebaseState]);

  return (
    <Box sx={containerStyle}>
      <Typography variant="h3" color="primary">
        {constants.UA_WELCOME}
      </Typography>
      <Typography variant="body3" fontWeight="500" color="primary" mb={6}>
        {constants.UA_WELCOME_DESC}
      </Typography>
      {isBMLoading ? (
        <LoadingWheel width={3} />
      ) : (
        <>
          <Typography variant="h3" color="primary">
            {global.authUser?.company.companyName}
          </Typography>
          <Box sx={brandManagersStyle}>
            <Typography variant="h4" color="primary" mr={4}>
              {constants.UA_BRAND_MANAGERS}
            </Typography>
            <Typography variant="body3" color="primary" fontWeight="500">
              {brandManagers.join(", ")}
            </Typography>
          </Box>
        </>
      )}
      <ReBox style={userMgmtContainer}>
        <Box sx={userMgmtHeader}>
          <Typography variant="subtitle1" color="primary">
            {constants.UA_USER_MGMT}
          </Typography>
          {userMgmtOpen ? (
            <Remove
              sx={{ fontSize: "1.5rem" }}
              onClick={() => setUserMgmtOpen(false)}
            />
          ) : (
            <Add
              sx={{ fontSize: "1.5rem" }}
              onClick={() => setUserMgmtOpen(true)}
            />
          )}
        </Box>
        <Box sx={userGridStyle}>
          <UserGrid />
        </Box>
      </ReBox>
    </Box>
  );
};

export default UserAdmin;
