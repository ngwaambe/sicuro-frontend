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
import {createPaypalAccount, updatePaypalAccount} from "../service/customerService";
import {isValidEmail} from "../service/UtilService";

interface Props {
  titleText: string,
  confirmText: string,
  onClose: ()=> void,
  onConfirm:  ()=> void
}

const ConfirmModal =  (props:Props) => {
  const {t} = useTranslation(['common', 'login'])
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
        <p>{t(props.confirmText)}</p>
      </ModalBody>
      <ModalFooter divider={true} confirm={true}>
        <ActionButton
          variant="contained"
          color="primary"
          disableElevation={true}
          size="large"
          onClick={props.onClose}>
          {t('cancel')}
        </ActionButton>
        <ActionButton
          variant="contained"
          color="primary"
          disableElevation={true}
          size="large"
          onClick={props.onConfirm}>
          {t('continue')}
        </ActionButton>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal
