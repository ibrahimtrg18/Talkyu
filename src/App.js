import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screen
import Home from './screens/Home';
import Search from './screens/Search';
import Friend from './screens/Friend';
import Login from './screens/Login';
import LoginAccount from './screens/LoginAccount';
import Conversation from './screens/Conversation';
import Profile from './screens/Profile';
import Setting from './screens/Setting';
import EditAvatar from './screens/Setting/EditAvatar';
import EditProfile from './screens/Setting/EditProfile';
import EditPassword from './screens/Setting/EditPassword';
import Register from './screens/Register';
// actions
import { userIsSignIn } from './redux/actions';
import { fetchAccount } from './redux/actions';

const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      dispatch(userIsSignIn());
    })();
  }, []);

  useEffect(() => {
    if (auth.access_token) {
      dispatch(fetchAccount());
    }
  }, [auth]);

  return (
    <NavigationContainer>
      {auth.access_token ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Friend"
            component={Friend}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Conversation"
            component={Conversation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditAvatar"
            component={EditAvatar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditPassword"
            component={EditPassword}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginAccount"
            component={LoginAccount}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
