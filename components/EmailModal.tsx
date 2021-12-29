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
import React, {useState} from "react";
import {Address, Customer, Language, Title} from "../state";
import {useTranslation} from "next-i18next";
import CommonStyles from './common.module.css'
import {updateCustomer, useDispatch} from "../service/Auth.context";
import {updateCustomerEmail} from "../service/customerService";
import {isValidEmail, isEmpty} from "../service/UtilService";
import Typography from "@material-ui/core/Typography";

interface Props {
  onClose: ()=> void,
  onSave:  ()=> void,
  customer:Customer
}

interface LocalProps {
  email: string,
  currentEmail: string,
  emailError: boolean,
}

const EmailModal =  (props:Props) => {
  const {t} = useTranslation(['common', 'login'])
  const [, dispatch] = useDispatch()
  const customer = props.customer;
  const [state, setState] = useState<LocalProps>({
    email: '',
    currentEmail: customer.email,
    emailError: false
  })

  const update = async () => {
    if (isEmpty(state.email) || !isValidEmail(state.email)) {
      setState({
        ...state,
        emailError: isEmpty(state.email) || !isValidEmail(state.email)
      });
      return;
    }
    const request = {email: state.email}

    const result = await updateCustomerEmail(customer.id, request)
    if (result.success) {
      setState({...state, email: state.email})
      dispatch(updateCustomer({...customer, email: state.email}));
      props.onSave();
    }
  }


  const onChange = (propAttr: string, propErrorAttr: string) => (event) => {
    setState({
      ...state,
      [propAttr]: event.target.value,
    })
  }

  return (
    <Modal onEsc={props.onClose} >
      <ModalHeader>
        <h3>{t('email_address_edit')}</h3>
        <IconButton
          onClick={props.onClose}
          data-testid="modal-close" >
          <CloseIcon  />
        </IconButton>
      </ModalHeader>
      <ModalBody>
        <FormControl className={CommonStyles.formControl}>
          <Typography variant="h6" gutterBottom>Current email</Typography>
          <Typography variant="subtitle1" gutterBottom>{state.currentEmail}</Typography>
          <StyledTextField
            id="email"
            label={t('email_address')}
            autoFocus={true}
            helperText={state.emailError && t('login:email_missing')}
            type="text"
            fullWidth={true}
            error={state.emailError}
            value={state.email} onChange={onChange("email", "emailError")}/>
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

export default EmailModal
