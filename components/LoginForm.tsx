import React, { useState } from "react";
import Styles from './LoginForm.module.css';
import CommonStyles from './common.module.css'
import {authenticate} from '../service/authentication'
import {
  Card,
  CardContent,
  Link
} from '@material-ui/core';
import {StyledCardActions, StyledTextField, ActionButton} from "./CustomMaterialUI";
import {useRouter} from 'next/router';
import {setView, updateUser, useDispatch} from "../service/Auth.context";
import {useTranslation, Trans} from "next-i18next";
import {AppView} from "../state";

interface Props {
  resetPassword: () => void;
}

interface UserState {
  username: string;
  usernameError: boolean;
  password: string;
  passwordError: boolean;
  error: boolean;
  resetPassword: boolean
}


const LoginForm : React.FC<Props> = (props) => {
  const {t} = useTranslation(['login','common']);
  const [ _ , dispatch] = useDispatch();
  const [userState, setUserState] = useState<UserState>({
    username: '',
    usernameError: false,
    password: '',
    passwordError: false,
    error: false,
    resetPassword: false
  });
  const router = useRouter()

  const onChange = (propAttr: string, propErrorAttr: string) => (event) => {
    setUserState({
      ...userState,
      [propAttr]: event.target.value,
      [propErrorAttr]: (event.target.value !== '') ? false : userState[propErrorAttr],
    })
  }

  const isLogin = (): boolean => {
    return (userState.password === '') || (userState.username === '')
  }

  const onLogin = e => {
    e.preventDefault();
    if (isLogin()) {
      setUserState({
        ...userState,
        usernameError: (userState.username === ''),
        passwordError: (userState.password === '')
      })
      return;
    }
    authenticate(userState.username, userState.password)
      .then(res => {
        if (!res.success) {
          setUserState({...userState, error: true})
        } else {
          const user = { username: '',loggedIn: true}
          dispatch(updateUser(user));
          dispatch(setView(AppView.DASCHBOARD)),
          router.push('/profile')
        }
      })
      .catch(error => {
         setUserState({...userState, error: true})
         console.log(+error.message);
      });
  };

  return (
    <>
      <form onSubmit={onLogin}>
        <Card className={CommonStyles.cardForm}>
          <CardContent className={CommonStyles.cardFormContent}>
            <h2 className={Styles.loginHeader}><Trans>{t('login_header')}</Trans></h2>
            {userState.error && <p className={Styles.loginError}>Wrong Credentials</p>}
            <div className={Styles.inputField}>
              <StyledTextField
                id="username_id"
                label={t('email_label')}
                autoFocus={true}
                helperText={userState.usernameError && t('email_missing')}
                type="text"
                fullWidth={true}
                error={userState.usernameError}
                value={userState.username} onChange={onChange("username", "usernameError")}/>
            </div>
            <div className={Styles.inputField}>
              <StyledTextField
                id="password_id"
                label={t('password_label')}
                type="password"
                fullWidth={true}
                helperText={userState.passwordError && t('password_missing')}
                error={userState.passwordError}
                value={userState.password} onChange={onChange("password", "passwordError")}/>
            </div>
            <div className={Styles.resetButton}>
              <Link href="#" onClick={props.resetPassword}>{t('forgotten_password')}</Link>
            </div>
          </CardContent>
          <StyledCardActions>
            <ActionButton
              variant="contained"
              fullWidth={true}
              size={"large"}
              color="primary"
              disableElevation={true}
              onClick={onLogin}>Sign in</ActionButton>
          </StyledCardActions>
        </Card>
      </form>
    </>
  )
}

export default LoginForm;

