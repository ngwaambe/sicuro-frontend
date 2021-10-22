import React, { useState } from "react";
import Styles from './LoginForm.module.css';
import CommonStyles from './common.module.css'
import {
  Card,
  CardContent,
} from '@material-ui/core';
import {StyledCardActions, StyledTextField, ActionButton} from "./CustomMaterialUI";
import {useRouter} from 'next/router';
import {useDispatch} from "../service/Auth.context";
import {useTranslation, Trans} from "next-i18next";
import {Customer} from "../state";
import {updateCustomerPassword} from "../service/customerService";

interface Props {
  customer:Customer;
}

interface PasswordState {
  password: string;
  passwordError: boolean;
  password2: string;
  password2Error: boolean;
  error: boolean;
}


const UpdatePasswordForm : React.FC<Props> = (props) => {
  const {t} = useTranslation(['login','common']);
  const [ _ , dispatch] = useDispatch();
  const [passwordState, setPasswordState] = useState<PasswordState>({
    password: '',
    passwordError: false,
    password2: '',
    password2Error: false,
    error: false
  });
  const router = useRouter()

  const onChange = (propAttr: string, propErrorAttr: string) => (event) => {
    setPasswordState({
      ...passwordState,
      [propAttr]: event.target.value,
      [propErrorAttr]: (event.target.value !== '') ? false : passwordState[propErrorAttr],
    })
  }

  const checkInput = (): boolean => {
    return (passwordState.password === '') || (passwordState.password2 === '')
  }

  const onUpdatePassword = e => {
    e.preventDefault();
    if (checkInput()) {
      setPasswordState({
        ...passwordState,
        passwordError: (passwordState.password === ''),
        password2Error: (passwordState.password2 === '')
      })
      return;
    }

    if (passwordState.password !== passwordState.password2) {
      setPasswordState({
        ...passwordState,
        error: true,
      })
      return;

    }

    updateCustomerPassword(props.customer.id, {password:passwordState.password})
      .then(res => {
        if (!res.success) {
          setPasswordState({...passwordState, error: true})
        } else {
          router.push('/profile')
        }
      })
      .catch(error => {
        setPasswordState({...passwordState, error: true})
        console.log(+error.message);
      });
  };

  return (
    <>
      <form onSubmit={onUpdatePassword}>
        <Card className={CommonStyles.cardForm}>
          <CardContent className={CommonStyles.cardFormContent}>
            <h2 className={Styles.loginHeader}><Trans>{t('change_password_label')}</Trans></h2>
           <div className={Styles.inputField}>
              <StyledTextField
                id="password_id"
                label={t('common:new_password')}
                type="password"
                fullWidth={true}
                helperText={passwordState.passwordError && t('password_missing')}
                error={passwordState.passwordError}
                value={passwordState.password} onChange={onChange("password", "passwordError")}/>
            </div>
            <div className={Styles.inputField}>
              <StyledTextField
                id="password2_id"
                label={t('common:repeat_new_password')}
                type="password"
                fullWidth={true}
                helperText={passwordState.password2Error && t('password_missing')}
                error={passwordState.password2Error}
                value={passwordState.password2} onChange={onChange("password2", "password2Error")}/>
            </div>
            {passwordState.error && <p className={Styles.loginError}>{t('common:password_not_match')}</p>}
          </CardContent>
          <StyledCardActions>
            <ActionButton
              variant="contained"
              fullWidth={true}
              size={"large"}
              color="primary"
              disableElevation={true}
              onClick={onUpdatePassword}>Change Password</ActionButton>
          </StyledCardActions>
        </Card>
      </form>
    </>
  )
}

export default UpdatePasswordForm;

