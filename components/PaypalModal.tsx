import {Modal, ModalBody, ModalFooter, ModalHeader} from "./Modal";
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {ActionButton, StyledFormControls, StyledTextField} from "./CustomMaterialUI";
import React, { useState} from "react";
import {useTranslation} from "next-i18next";
import CommonStyles from './common.module.css'
import {PaymentType, PaypalAccount} from "../state";
import {createPaymentAccount, updatePaymentAccount} from "../service/customerService";
import {isValidEmail} from "../service/UtilService";
import {Notify, useDispatch} from "../service/Auth.context";
import {redirectTo} from "../service/common";

interface Props {
  titleText: string,
  customerId: number,
  onClose: ()=> void,
  onSave:  ()=> void,
  account: PaypalAccount
}

interface LocalProps {
  id: number,
  owner: string,
  ownerError: boolean,
  paypalAccount: string,
  emailError: boolean,
  emailErrorText: string,
  loading: boolean
}

const PaypalModal =  (props:Props) => {
  const {t} = useTranslation(['common', 'login'])
  const [, dispatch] = useDispatch();
  const [state, setState] = useState<LocalProps>({
    id: props.account.id,
    owner: props.account.owner,
    ownerError: false,
    paypalAccount: props.account.paypalAccount,
    emailError: false,
    emailErrorText: '',
    loading: false
  })

  const changeIsValid = () => (state.owner !== '' && state.paypalAccount !== '' && isValidEmail(state.paypalAccount))

  const update = async () => {
    if (!changeIsValid()) {
      setState({
        ...state,
        owner: state.owner,
        ownerError: (state.owner === ''),
        paypalAccount: state.paypalAccount,
        emailError: (state.paypalAccount === '' || !isValidEmail(state.paypalAccount)),
        emailErrorText: evaluateEmailErrorText()
      });

      return;
    }
    const request:PaypalAccount = {
      id: state.id,
      paymentType: PaymentType.PAYPAL,
      owner: state.owner,
      paypalAccount: state.paypalAccount
    }

    try {
      setState({...state, loading: true})
      let result;
      if (request.id === undefined)  {
        result = await createPaymentAccount(props.customerId, request);
      } else {
        //put => update
        result = await updatePaymentAccount(props.customerId, request);
      }
      if (result.success) {
        props.onSave();
      } else {
        if (result.statusCode === 401) {
          redirectTo(`/authenticate?redirect${window.location.href}`)
        }
        props.onSave();
        dispatch(Notify({ message: 'errorText', title:'ErrorPageHeader' }));
      }
    } catch(error) {
      props.onSave();
      dispatch(Notify({ message: 'errorText', title:'ErrorPageHeader' }));
    }


  }

  const onChange = (propAttr: string) => (event) => {
    setState({
      ...state,
      [propAttr]: event.target.value,
    })
  }

  const evaluateEmailErrorText = (): string => {
    if (state.paypalAccount === '') {
      return t('paypal-required')
    } else if (!isValidEmail(state.paypalAccount)) {
      return t('login:invalid_email_text')
    } else
      return ''
  }

  return (
    <Modal onEsc={props.onClose} >
      <ModalHeader>
        <h3>{t(props.titleText)}</h3>
        <IconButton
          onClick={props.onClose}
          data-testid="modal-close" >
          <CloseIcon  />
        </IconButton>
      </ModalHeader>
      <ModalBody>
        <FormControl className={CommonStyles.formControl}>
          <StyledTextField
            id="owner"
            label={t('paypal-owner')}
            autoFocus={true}
            helperText={state.ownerError && t('owner-required')}
            type="text"
            fullWidth={true}
            error={state.ownerError}
            disabled={state.loading}
            value={state.owner} onChange={onChange("owner")}/>
          <StyledTextField
            id="email"
            label={t('paypal-account')}
            autoFocus={true}
            helperText={state.emailError && state.emailErrorText}
            type="text"
            fullWidth={true}
            error={state.emailError}
            disabled={state.loading}
            value={state.paypalAccount} onChange={onChange("paypalAccount")}/>
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

export default PaypalModal
