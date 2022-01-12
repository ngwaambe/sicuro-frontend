import React, {useState} from "react";
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
import {isEmpty} from "../service/UtilService";

interface Props {
  customer: Customer;
}

interface State {
  currentPassword: string,
  currentPasswordError: boolean,
  currentPasswordErrorText: string,
  password: string;
  passwordError: boolean;
  passwordErrorText: string,
  password2: string;
  password2Error: boolean;
}


const UpdatePasswordForm = (props: Props) => {

  const {t} = useTranslation(['login', 'common']);
  const [_, dispatch] = useDispatch();
  const [state, setState] = useState<State>({
    currentPassword: '',
    currentPasswordError: false,
    currentPasswordErrorText: '',
    password: '',
    passwordError: false,
    passwordErrorText: '',
    password2: '',
    password2Error: false,
  });
  const router = useRouter()

  const onChange = (propAttr: string, propErrorAttr: string) => (event) => {
    setState({
      ...state,
      [propAttr]: event.target.value,
      [propErrorAttr]: (event.target.value !== '') ? false : state[propErrorAttr],
    })
  }

  const isValidPassword = (): boolean => {
    return !isEmpty(state.password) && state.password.trim().length >= 8
      && !isPasswordSame(state.currentPassword, state.password)
      && (state.password === state.password2)
  }
  const checkInput = (): boolean => isEmpty(state.password2) || isEmpty(state.currentPassword) || !isValidPassword()

  const isPasswordSame = (currentPassword: string, newpassword: string): boolean => {
    return !isEmpty(currentPassword) && !isEmpty(newpassword) && currentPassword.trim() == newpassword.trim()
  }


  const evaluateErrorMessage = (): string => {
    if (isEmpty(state.password))
      return 'password_missing'
    else if (state.password.trim().length < 8)
      return 'password_min_length'
    else if (isPasswordSame(state.currentPassword, state.password))
      return 'password_should_not_be_equal'
    else if (state.password !== state.password2)
      return 'common:password_not_match'
    else
      return ''
  }

  const onUpdatePassword = e => {
    e.preventDefault();
    if (checkInput()) {
      setState({
        ...state,
        currentPasswordError: isEmpty(state.currentPassword),
        passwordError: !isValidPassword(),
        password2Error: isEmpty(state.password2),
        currentPasswordErrorText: isEmpty(state.currentPassword) ? 'password_missing' : '',
        passwordErrorText: evaluateErrorMessage(),
      })
      return;
    }

    updateCustomerPassword(props.customer.id, {currentPassword: state.currentPassword, password: state.password})
      .then(res => {
        if (res.success) {
          router.push('/profile')
        } else {
          if (res.statusCode == 409) {
            setState({
              ...state,
              currentPasswordError: true,
              currentPasswordErrorText: 'current_password_not_correct',
              passwordError: false,
              passwordErrorText: ''
            })
          }
          if (res.statusCode == 401) {
            //redirect to login
            router.push('/authenticate')
          }
        }
      })
      .catch(error => {
        console.log("Error: "+error.message);
      });
  };

  return (
    <>
      <form onSubmit={onUpdatePassword}>
        <Card className={CommonStyles.cardForm}>
          <CardContent className={CommonStyles.cardFormContent}>
            <h2 className={Styles.loginHeader}><Trans>{t('change_password_label')}</Trans></h2>
            <StyledTextField
              id="current_password"
              label={t('current_password')}
              type="password"
              fullWidth={true}
              helperText={state.currentPasswordError && t(state.currentPasswordErrorText)}
              error={state.currentPasswordError}
              value={state.currentPassword} onChange={onChange("currentPassword", "currentPasswordError")}/>
            <StyledTextField
              id="password_id"
              label={t('common:new_password')}
              type="password"
              fullWidth={true}
              helperText={state.passwordError && t(state.passwordErrorText)}
              error={state.passwordError}
              value={state.password} onChange={onChange("password", "passwordError")}/>
            <StyledTextField
              id="password2_id"
              label={t('common:repeat_new_password')}
              type="password"
              fullWidth={true}
              helperText={state.password2Error && t('password_missing')}
              error={state.password2Error}
              value={state.password2} onChange={onChange("password2", "password2Error")}/>
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

