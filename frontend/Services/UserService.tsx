// @ts-ignore
import { LOCAL_URL } from 'react-native-dotenv';

interface ISignInRes {
  user: {
    userName: string
    email: string
  } 
}

interface IUserInfo {
  userName: string,
  email: string,
  password: string,
}

interface IUserService {
  signUp: Function
  signIn: Function
  signOut: Function
}

const UserService: IUserService = {
  signUp: () => {},
  signIn: () => {},
  signOut: () => {},
};


UserService.signUp = async (body: IUserInfo) => {
  const response = await fetch(`${LOCAL_URL}user`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

UserService.signIn = async (body: IUserInfo) => {
  const res = await fetch(`${LOCAL_URL}signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

export default UserService;
