import {
  SerializedError,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { IUserView } from "../../modules/users/models/IUserView";
import { IAddressView } from "../../modules/addresses/models/IAddressView";
import * as userActions from "./user.action";
import { ToastUtil } from "../../util/ToastUtil";
import { TokenUtil } from "../../util/TokenUtil";

export const userFeatureKey = "userFeatureKey";

export interface InitialState {
  loading: boolean;
  errorMessage: SerializedError;
  user: IUserView;
  address: IAddressView;
  token: string;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  loading: false,
  errorMessage: {} as SerializedError,
  user: {} as IUserView,
  address: {} as IAddressView,
  token: "",
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    logOffAction: (state, action) => {
      TokenUtil.deleteTokenFromSession();
      state.token = "";
      state.isAuthenticated = false;
      state.user = {} as IUserView;
      ToastUtil.displayInfoMessage("LogOff is success");
    },
  },
  extraReducers: (builder) => {
    //  register user
    builder
      .addCase(userActions.registerUserAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userActions.registerUserAction.fulfilled, (state, action) => {
        state.loading = false;
        ToastUtil.displaySuccessMessage(action.payload.msg);
      })
      .addCase(userActions.registerUserAction.rejected, (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("Registration is Failed");
        }
      });

    //  login user
    builder
      .addCase(userActions.loginUserAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userActions.loginUserAction.fulfilled, (state, action) => {
        state.loading = false;
        ToastUtil.displaySuccessMessage(action.payload.msg);
        TokenUtil.saveTokenToSession(action.payload.data.token);
        state.token = action.payload.data.token;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
      })
      .addCase(userActions.loginUserAction.rejected, (state, action) => {
        state.loading = false;
        TokenUtil.deleteTokenFromSession();
        state.token = "";
        state.isAuthenticated = false;
        state.user = {} as IUserView;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("Login is Failed");
        }
      });

    //   get users Info
    builder
      .addCase(userActions.getUserInfoAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userActions.getUserInfoAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(userActions.getUserInfoAction.rejected, (state, action) => {
        state.loading = false;
        state.user = {} as IUserView;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("get users Info is Failed");
        }
      });

    //   update profile Picture
    builder
      .addCase(
        userActions.updateProfilePictureAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        userActions.updateProfilePictureAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.user = action.payload.data;
          ToastUtil.displaySuccessMessage(action.payload.msg);
        }
      )
      .addCase(
        userActions.updateProfilePictureAction.rejected,
        (state, action) => {
          state.loading = false;
          state.user = {} as IUserView;
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.payload;
            ToastUtil.displayErrorMessage("update Profile Picture is Failed");
          }
        }
      );

    //   change the password
    builder
      .addCase(userActions.changePasswordAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userActions.changePasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        ToastUtil.displaySuccessMessage(action.payload.msg);
      })
      .addCase(userActions.changePasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.user = {} as IUserView;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("change  password is Failed");
        }
      });

    //   create address
    builder
      .addCase(userActions.createAddressAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userActions.createAddressAction.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload.data;
        ToastUtil.displaySuccessMessage(action.payload.msg);
      })
      .addCase(userActions.createAddressAction.rejected, (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("create address is Failed");
        }
      });

    //   update address
    builder
      .addCase(userActions.updateAddressAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userActions.updateAddressAction.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload.data;
        ToastUtil.displaySuccessMessage(action.payload.msg);
      })
      .addCase(userActions.updateAddressAction.rejected, (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("update address is Failed");
        }
      });

    //   get my address
    builder
      .addCase(userActions.getMyAddressAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userActions.getMyAddressAction.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload.data;
      })
      .addCase(userActions.getMyAddressAction.rejected, (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("get address address is Failed");
        }
      });

    //   delete address
    builder
      .addCase(userActions.deleteAddressAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userActions.deleteAddressAction.fulfilled, (state, action) => {
        state.loading = false;
        state.address = {} as IAddressView;

        ToastUtil.displayInfoMessage(action.payload.msg);
      })
      .addCase(userActions.deleteAddressAction.rejected, (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("delete address is Failed");
        }
      });
  },
});

export const { logOffAction } = userSlice.actions;
