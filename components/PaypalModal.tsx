import {Modal, ModalBody, ModalFooter, ModalHeader} from "./Modal";
import {
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
  emailErrorText: string
}

const PaypalModal =  (props:Props) => {
  const {t} = useTranslation(['common', 'login'])
  const [state, setState] = useState<LocalProps>({
    id: props.account.id,
    owner: props.account.owner,
    ownerError: false,
    paypalAccount: props.account.paypalAccount,
    emailError: false,
    emailErrorText: ''
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

      console.log("Error occured:"+evaluateEmailErrorText())
      return;
    }
    const request:PaypalAccount = {
      id: state.id,
      paymentType: PaymentType.PAYPAL,
      owner: state.owner,
      paypalAccount: state.paypalAccount
    }

    console.log(JSON.stringify(request))

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
      console.log("Error occured")
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
            value={state.owner} onChange={onChange("owner")}/>
          <StyledTextField
            id="email"
            label={t('paypal-account')}
            autoFocus={true}
            helperText={state.emailError && state.emailErrorText}
            type="text"
            fullWidth={true}
            error={state.emailError}
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
          {t('save')}
        </ActionButton>
      </ModalFooter>
    </Modal>
  );
};

export default PaypalModal
