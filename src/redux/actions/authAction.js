import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AuthAPI from '../../apis/AuthAPI';
import { googleSigninConfig } from '../../utils/googleSigninConfig';
import { storeData, getData, clearData } from '../../utils/storage';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const signInGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    return await GoogleSignin.signIn();
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User Cancelled the Login Flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Signing In');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play Services Not Available or Outdated');
    } else {
      console.log('Some Other Error Happened');
    }
  }
};

export const userLoginGoogle = () => async (dispatch) => {
  try {
    GoogleSignin.configure(googleSigninConfig);
    const user = await signInGoogle();

    const res = await AuthAPI.googleLogin(user.idToken);

    await storeData({ key: 'access_token', value: res.data.access_token });
    await storeData({ key: 'id', value: res.data.id });

    const auth = {
      id: res.data.id,
      access_token: res.data.access_token,
    };

    dispatch({ type: LOGIN, payload: auth });
  } catch (e) {
    console.error(e);
  }
};

const signOutGoogle = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const userIsSignIn = () => async (dispatch) => {
  try {
    if (await getData('access_token')) {
      const auth = {
        id: await getData('id'),
        access_token: await getData('access_token'),
      };

      dispatch({ type: LOGIN, payload: auth });
    } else {
      dispatch(userLogout());
    }
  } catch (e) {
    console.error(e);
  }
};

export const userLoginAccount = (payload) => async (dispatch, getState) => {
  try {
    const res = await AuthAPI.accountLogin(payload);
    await storeData({ key: 'access_token', value: res.data.access_token });
    await storeData({ key: 'id', value: res.data.id });

    const auth = {
      id: res.data.id,
      access_token: res.data.access_token,
    };

    dispatch({ type: LOGIN, payload: auth });
    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    if ((await getData('login_with')) === 'google') {
      await signOutGoogle();
    }
    await clearData();

    dispatch({ type: LOGOUT });
  } catch (e) {
    console.error(e);
  }
};