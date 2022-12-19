import {Modal, ModalBody, ModalFooter, ModalHeader} from "./Modal";
import {
  CircularProgress,
  FormControl, FormHelperText,
  IconButton, Input,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {ActionButton, StyledFormControls, StyledTextField} from "./CustomMaterialUI";
import React, {useState} from "react";
import {Customer} from "../state";
import {useTranslation} from "next-i18next";
import CommonStyles from './common.module.css'
import {updateCustomerPassword} from "../service/customerService";
import {isEmpty} from "../service/UtilService";
import {redirectTo} from "../service/common";
import {Notify, useDispatch} from "../service/Auth.context";
interface Props {
  onClose: ()=> void,
  onSave:  ()=> void,
  customer:Customer
}

interface LocalProps {
  currentPassword: string,
  currentPasswordError: boolean,
  currentPasswordErrorText: string,
  password: string,
  passwordError: boolean,
  passwordErrorText: string,
  loading: boolean
}

const PasswordModal =  (props:Props) => {
  const {t} = useTranslation(['login','common'])
  const [, dispatch] = useDispatch()
  const customer = props.customer;
  const [state, setState] = useState<LocalProps>({
    currentPassword: '',
    currentPasswordError: false,
    currentPasswordErrorText:'password_missing',
    password: '',
    passwordError: false,
    passwordErrorText: '',
    loading: false
  })


  const isPasswordSame = (currentPassword : string, newpassword: string): boolean => {
     return !isEmpty(currentPassword) && !isEmpty(newpassword) && currentPassword.trim() == newpassword.trim()
  }

  const isValidPassword = (password: string): boolean => {
    return !isEmpty(password) && password.trim().length >=8 && !isPasswordSame(state.currentPassword, state.password)
  }

  const evaluateErrorMessage = (): string => {
    if (isEmpty(state.password))
      return 'password_missing'
    else if(state.password.trim().length < 8)
      return 'password_min_length'
    else if (isPasswordSame(state.currentPassword, state.password))
      return 'password_should_not_be_equal'
    else
      return ''
  }

  const update = async () => {
    if (isEmpty(state.currentPassword) || !isValidPassword(state.password)) {
      setState({
        ...state,
        passwordError: !isValidPassword(state.password),
        currentPasswordError: isEmpty(state.currentPassword),
        currentPasswordErrorText: isEmpty(state.currentPassword) ? 'password_missing' : '',
        passwordErrorText: evaluateErrorMessage(),
      });
      return;
    }
    const request = {currentPassword: state.currentPassword, password: state.password}

    try {
      setState({...state, loading: true})
      const result = await updateCustomerPassword(customer.id, request)
      if (result.success) {
        props.onSave();
      } else {
        if (result.statusCode == 409) {
          setState({
            ...state,
            currentPasswordError: true,
            currentPasswordErrorText: 'current_password_not_correct',
            passwordError: false,
            passwordErrorText: ''
          })
        }
        if (result.statusCode == 401) {
          //redirect to login
          redirectTo(`/authenticate?redirect${window.location.href}`)
        }
      }
    } catch (error) {
      props.onSave();
      dispatch(Notify({message: 'errorText', title: 'ErrorPageHeader'}));
    }
  }

  const onChange = (propAttr: string) => (event) => {
    setState({
      ...state,
      [propAttr]: event.target.value,
    })
  }

  return (
    <Modal onEsc={props.onClose} >
      <ModalHeader>
        <h3>{t('common:change_password_label')}</h3>
        <IconButton
          onClick={props.onClose}
          data-testid="modal-close" >
          <CloseIcon  />
        </IconButton>
      </ModalHeader>
      <ModalBody>
        <FormControl className={CommonStyles.formControl}>
          <StyledTextField
            id="current_password"
            label={t('current_password')}
            autoFocus={true}
            helperText={state.currentPasswordError && t(state.currentPasswordErrorText)}
            type="password"
            disabled={state.loading}
            fullWidth={true}
            error={state.currentPasswordError}
            value={state.currentPassword} onChange={onChange("currentPassword")}/>

          <StyledTextField
            id="password"
            label={t('password_label')}
            autoFocus={true}
            helperText={state.passwordError && t(state.passwordErrorText)}
            type="password"
            disabled={state.loading}
            fullWidth={true}
            error={state.passwordError}
            value={state.password} onChange={onChange("password")}/>
        </FormControl>
      </ModalBody>
      <ModalFooter divider={true} confirm={true}>
        <ActionButton
          variant="contained"
          color="primary"
          disableElevation={true}
          size="large"
          onClick={update}>
          {state.loading && <CircularProgress color="inherit" size={30} thickness={4}/>}
          {!state.loading && t('save')}
        </ActionButton>
      </ModalFooter>
    </Modal>
  );
};

export default PasswordModal
