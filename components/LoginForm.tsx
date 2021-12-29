import React, { useState } from "react";
import Styles from './LoginForm.module.css';
import CommonStyles from './common.module.css'
import {authenticate} from '../service/authentication'
import {
  Button,
  Card,
  CardContent, CircularProgress, Divider,
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
  const [loading, setLoadingState] = useState(false)
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
    setLoadingState(true);
    authenticate(userState.username, userState.password)
      .then(res => {
        if (!res.success) {
          setUserState({...userState, error: true})
        } else {
          const user = { loggedIn: true}
          dispatch(updateUser(user));
          dispatch(setView(AppView.DASCHBOARD)),
          router.push('/profile')
        }
      })
      .catch(error => {
        setUserState({...userState, error: true})
      }).finally(() => {
        setLoadingState(false);
      })
  };

  const registration = (): void => {
    router.push('/registration')
  }


  return (
    <>
      <form onSubmit={onLogin}>
        <Card className={CommonStyles.cardForm}>
          <CardContent className={CommonStyles.cardFormContent}>
            <h2 className={Styles.loginHeader}><Trans>{t('login_header')}</Trans></h2>
            {userState.error && <p className={Styles.loginError}>{t('login_error')}</p>}
            <div className={Styles.inputField}>
              <StyledTextField
                id="username_id"
                label={t('email_label')}
                autoFocus={true}
                helperText={userState.usernameError && t('email_missing')}
                type="text"
                fullWidth={true}
                disabled={loading}
                error={userState.usernameError}
                value={userState.username} onChange={onChange("username", "usernameError")}/>
            </div>
            <div className={Styles.inputField}>
              <StyledTextField
                id="password_id"
                label={t('password_label')}
                type="password"
                fullWidth={true}
                disabled={loading}
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
              disabled={loading}
              onClick={onLogin}>
              { loading && <CircularProgress color="primary"  size={30} thickness={4}/>}
              Sign in</ActionButton>
          </StyledCardActions>
          <Divider className={Styles.divider}/>
          <h3 className={Styles.registerHeader}>{t('signup_header')}</h3>
          <StyledCardActions>
            <ActionButton
              variant="outlined"
              size="large"
              type="submit"
              fullWidth={true}
              className={Styles.inputField}
              disableElevation={true}
              onClick={registration}>
             {t('signup_button')}
              </ActionButton>
          </StyledCardActions>
        </Card>
      </form>
    </>
  )
}

export default LoginForm;

