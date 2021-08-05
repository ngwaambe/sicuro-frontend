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
import {Customer} from "../state";
import {useTranslation} from "next-i18next";
import CommonStyles from './common.module.css'
import {updateCustomerPassword} from "../service/customerService";

interface Props {
  onClose: ()=> void,
  onSave:  ()=> void,
  customer:Customer
}

interface LocalProps {
  password: string,
  passwordError: boolean,
}

const PasswordModal =  (props:Props) => {
  const {t} = useTranslation(['common', 'login'])
  const customer = props.customer;
  const {i18n} = useTranslation()
  const [state, setState] = useState<LocalProps>({
    password: '',
    passwordError: false
  })


  const changeIsValid = () => (state.password !== '')


  const update = async () => {
    if (!changeIsValid()) {
      setState({
        ...state,
        passwordError: (state.password === '')
      });
      return;
    }
    const request = { password: state.password }

    const result =  await updateCustomerPassword(customer.id, request)
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
            id="password"
            label={t('password')}
            autoFocus={true}
            helperText={state.passwordError && t('login:password_missing')}
            type="text"
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
          {t('save')}
        </ActionButton>
      </ModalFooter>
    </Modal>
  );
};

export default PasswordModal
