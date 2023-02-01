import { useState, useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton, Button, Typography, Tooltip } from "@mui/material";
import GlobalContext from "../Context";
import * as constants from "./constants";
import LoadingWheel from "../LoadingWheel";
import {
  MoreHoriz,
  StarsRounded,
  Lock,
  CheckCircleOutline,
  HighlightOff,
} from "@mui/icons-material";
import UserMgmtMenu from "./UserMgmtMenu";

const UserGrid = () => {
  const global = useContext(GlobalContext);

  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [option, setOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateUserList, setUpdateUserList] = useState({});

  const containerStyle = { width: "100%", height: "25rem" };
  const loadWheel = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: "5rem",
  };

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      setUserList(
        await global.firebaseState.getUsersByDashboardCompany(
          global.authUser?.company?.id
        )
      );
      setIsLoading(false);
    };
    global.authUser?.profile && getUsers();
  }, [global.authUser, global.firebaseState, updateUserList]);

  const handleClick = (type) => (event) => {
    switch (type) {
      case "userMgmt":
      case "add":
        setOption(type);
        break;
      case "row":
        setSelectedUser(event.row);
        break;
      default:
        break;
    }
  };

  const refreshUserList = () => {
    setUpdateUserList({});
  };

  const columns = [
    { field: "id", headerName: "id", width: 50, hide: true },
    {
      field: "isBrandManager",
      headerName: "",
      width: global.mobileView ? 55 : 90,
      align: "center",
      renderCell: (cellValues) => {
        return cellValues.row.perms.isDDAdmin ? (
          <Tooltip title={constants.CP_UG_AD_TOOLTIP}>
            <StarsRounded />
          </Tooltip>
        ) : (
          <></>
        );
      },
    },
    {
      field: "firstName",
      headerName: global.mobileView ? constants.FN_LABEL_M : constants.FN_LABEL,
      width: 125,
    },
    {
      field: "lastName",
      headerName: global.mobileView ? constants.LN_LABEL_M : constants.LN_LABEL,
      width: 125,
    },
    { field: "email", headerName: constants.EMAIL_LABEL, width: 225 },
    {
      field: "phoneNumber",
      headerName: global.mobileView
        ? constants.PHONE_LABEL_M
        : constants.PHONE_LABEL,
      width: 175,
    },
    {
      field: "verified",
      headerName: constants.VERIFIED_LABEL,
      width: 100,
      align: "center",
      renderCell: (params) =>
        params.row.verified?.dd ? (
          <CheckCircleOutline color="success" />
        ) : (
          <HighlightOff color="error" />
        ),
    },
    {
      field: "actions",
      headerName: constants.ACTIONS_LABEL,
      width: 100,
      align: "center",
      renderCell: (params) => (
        <IconButton onClick={handleClick("userMgmt")}>
          <MoreHoriz />
        </IconButton>
      ),
    },
    {
      field: "bm_lock",
      headerName: "",
      width: global.mobileView ? 75 : 90,
      align: "center",
      renderCell: (cellValues) => {
        return cellValues.row.perms.isDDBrandManager ? (
          <Tooltip title={constants.CP_UG_BM_TOOLTIP}>
            <Lock />
          </Tooltip>
        ) : (
          <></>
        );
      },
    },
  ];

  return (
    <>
      <Box sx={containerStyle}>
        <DataGrid
          rows={userList}
          columns={columns}
          pageSize={5}
          onRowClick={handleClick("row")}
        />
        {isLoading && <LoadingWheel width={4} style={loadWheel} />}
      </Box>
      <Button onClick={handleClick("add")} color="info">
        <Typography variant="h4">{constants.INVITE_USER}</Typography>
      </Button>
      <UserMgmtMenu
        variant={option}
        setVariant={setOption}
        selectedUser={selectedUser}
        onChange={refreshUserList}
      />
    </>
  );
};

export default UserGrid;
