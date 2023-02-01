import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  DialogActions,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as constants from "../constants";
import GlobalContext from "../../Context";
import LoadingModal from "../../LoadingModal";

const UserForm = ({ selectedUser, variant, onClose, onChange }) => {
  const { authUser, firebaseState } = useContext(GlobalContext);

  const fieldStyle = { width: "100%" };
  const errorStyle = { mb: 3 };
  const formGroupStyle = {
    flexDirection: "row",
    mt: 1,
    mb: 6,
    fontSize: "1.25rem",
  };
  const buttonStyle = {
    width: "50%",
  };
  const msgStyle = {
    mt: 1,
  };

  const [msg, setMsg] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const clearMessage = () => {
    setMsg({});
  };

  const handleUpdate = async (user) => {
    setMsg({ type: "success", msg: constants.FRM_USER_SUCCESS });
    setIsDisabled(false);
    setIsLoading(false);
    setTimeout(clearMessage, 10000);
    onChange();
  };

  const editUser = async (user) => {
    try {
      user.id = selectedUser.id;
      const result = await firebaseState.updateDashboardUser(user);
      result && handleUpdate(user);
    } catch (e) {
      setMsg({ type: "error", msg: constants.FRM_EDIT_FAIL });
      setTimeout(clearMessage, 10000);
    }
  };

  const handleAddSuccess = async (email, newID) => {
    const result = await firebaseState.inviteUser(email);
    result && setIsDisabled(false);
    setIsLoading(false);
    setMsg({ type: "success", msg: constants.FRM_ADD_SUCCESS });
    setTimeout(clearMessage, 10000);
    onChange();
  };

  const addUser = async (user) => {
    let newID;
    try {
      newID = await firebaseState.addDashboardUser(user);
    } catch (e) {
      setMsg({
        type: "error",
        msg: constants.FRM_EDIT_FAIL,
      });
      setTimeout(clearMessage, 10000);
    }
    newID && handleAddSuccess(user.email, newID);
  };

  const onSubmit = (variant) => async (data) => {
    setIsDisabled(true);
    setIsLoading(true);
    let user = {
      ...data,
      perms: {
        isDDAdmin: data.isAdmin,
        isDDBrandManager: data.isBrandManager,
        isDDViewer: data.isAdmin || data.isBrandManager ? false : true,
      },
      uidCompany: authUser?.company.id,
    };
    delete user.isAdmin;
    delete user.isBrandManager;
    switch (variant) {
      case "add":
        await addUser(user);
        break;
      default:
        await editUser(user);
        break;
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful && variant === "add") {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        isBrandManager: false,
        isViewer: false,
      });
    }
  }, [isSubmitSuccessful, reset, variant]);

  return (
    <form>
      {isLoading && <LoadingModal width={4} />}
      <TextField
        sx={fieldStyle}
        variant="standard"
        label={constants.CP_AU_MODAL_FN}
        id="fName"
        {...register("firstName", {
          required: constants.FRM_FNAME_REQUIRED,
        })}
        defaultValue={selectedUser?.firstName}
      />
      <Typography sx={errorStyle} color="error" variant="body2">
        {errors.firstName?.message}
      </Typography>
      <TextField
        sx={fieldStyle}
        variant="standard"
        label={constants.CP_AU_MODAL_LN}
        id="lName"
        {...register("lastName", {
          required: constants.FRM_LNAME_REQUIRED,
        })}
        defaultValue={selectedUser?.lastName}
      />
      <Typography sx={errorStyle} color="error" variant="body2">
        {" "}
        {errors.lastName?.message}
      </Typography>
      <TextField
        sx={fieldStyle}
        variant="standard"
        label={"Email"}
        id="email"
        {...register("email", {
          required: constants.FRM_EMAIL_REQUIRED,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: constants.FRM_EMAIL_INVALID,
          },
        })}
        type="email"
        value={selectedUser?.email}
      />
      <Typography sx={errorStyle} color="error" variant="body2">
        {errors.email?.message}
      </Typography>
      <TextField
        sx={fieldStyle}
        variant="standard"
        label={"Phone"}
        id="phoneNumber"
        {...register("phoneNumber", {
          pattern: {
            value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
            message: constants.FRM_PHONE_INVALID,
          },
        })}
        defaultValue={selectedUser?.phoneNumber}
      />
      <Typography sx={errorStyle} color="error" variant="body2">
        {errors.phoneNumber?.message}
      </Typography>
      <FormGroup sx={formGroupStyle}>
        <FormControlLabel
          control={
            <Checkbox
              {...register("isBrandManager")}
              defaultChecked={selectedUser?.perms.isDDBrandManager}
            />
          }
          label={constants.CP_AU_MODAL_BM}
        />
        {authUser?.profile?.perms.isDDAdmin && (
          <FormControlLabel
            control={
              <Checkbox
                {...register("isAdmin")}
                defaultChecked={selectedUser?.perms.isDDAdmin}
              />
            }
            label={constants.CP_AU_MODAL_ADMIN}
          />
        )}
      </FormGroup>
      <DialogActions>
        <Button
          sx={buttonStyle}
          variant="outlined"
          color="info"
          onClick={onClose}
        >
          {constants.CP_AU_MODAL_BTN_CANCEL}
        </Button>
        <Button
          sx={buttonStyle}
          type="submit"
          variant="contained"
          color="info"
          disabled={isDisabled}
          onClick={handleSubmit(onSubmit(variant))}
        >
          {constants.CP_AU_MODAL_BTN_SUBMIT}
        </Button>
      </DialogActions>
      {msg.msg && (
        <Box sx={msgStyle}>
          <Typography variant="body2" color={msg.type}>
            {msg.msg}
          </Typography>
        </Box>
      )}
    </form>
  );
};

export default UserForm;
