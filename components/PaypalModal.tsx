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
import React, {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import CommonStyles from './common.module.css'
import {useDispatch} from "../service/Auth.context";
import {PaypalAccount} from "../state";
import {updatePaypalAccount} from "../service/customerService";

interface Props {
  onClose: ()=> void,
  onSave:  ()=> void,
  account: PaypalAccount
}

interface LocalProps {
  id: number,
  owner: string,
  ownerError: boolean,
  email: string,
  emailError: boolean,
}

const PaypalModal =  (props:Props) => {
  const {t} = useTranslation(['common', 'login'])
  const [state, setState] = useState<LocalProps>({
    id: props.account.id,
    owner: props.account.owner,
    ownerError: false,
    email: props.account.email,
    emailError: false,
  })

  const changeIsValid = () => (state.owner !== '' && state.email !== '')

  const update = async () => {
    if (!changeIsValid()) {
      setState({
        ...state,
        owner: state.owner,
        ownerError: (state.owner === ''),
        email: state.email,
        emailError: (state.email === '')
      });
      return;
    }
    const request = (state.id !== undefined) ? {
      id: state.id,
      owner: state.owner,
      email: state.email
    } : {
      owner: state.owner,
      email: state.email
    }

    const result =  await updatePaypalAccount(request)
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

  return (
    <Modal onEsc={props.onClose} >
      <ModalHeader>
        <h3>{t('change_password_label')}</h3>
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
            label={t('owner')}
            autoFocus={true}
            helperText={state.ownerError && t('payment:owner_missing')}
            type="text"
            fullWidth={true}
            error={state.ownerError}
            value={state.owner} onChange={onChange("owner")}/>

          <StyledTextField
            id="email"
            label={t('email')}
            autoFocus={true}
            helperText={state.ownerError && t('payment:email_missing')}
            type="text"
            fullWidth={true}
            error={state.emailError}
            value={state.email} onChange={onChange("email")}/>
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
