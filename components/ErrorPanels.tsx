import React from "react";
import {Card, CardContent, CardHeader, FormControl, IconButton} from "@material-ui/core";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import {useTranslation} from "next-i18next";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "./Modal";
import CloseIcon from "@material-ui/icons/Close";
import {ActionButton, StyledTextField} from "./CustomMaterialUI";
import {Notification} from "../state";

const panelBody: React.CSSProperties = {
  display: "flex"
}

interface Props {
  onClose: ()=> void,
  notification: Notification
}

export const ErrorPanel = () => {
  const {t} = useTranslation(["common"])
  return (
    <form>
      <Card>
        <CardHeader
          title={t('ErrorPageHeader')}
          titleTypographyProps={{variant: 'h5'}}
        />
        <CardContent>
          <div style={panelBody}>
            <ErrorTwoToneIcon color="error" style={{fontSize: 70}}/>
            <p>{t('errorText')}</p>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

export const ErrorModal = (props: Props) => {
  const {t} = useTranslation(["common", "login"])
  return(
    <Modal onEsc={props.onClose} >
      <ModalHeader>
        <h3>{t(props.notification.title)}</h3>
        <IconButton
          onClick={props.onClose}
          data-testid="modal-close" >
          <CloseIcon  />
        </IconButton>
      </ModalHeader>
      <ModalBody>
        <div style={panelBody}>
          <ErrorTwoToneIcon color="error" style={{fontSize: 70}}/>
          <p>{t(props.notification.message)}</p>
        </div>
      </ModalBody>
      <ModalFooter divider={true} confirm={true}>
        <ActionButton
          variant="contained"
          color="primary"
          disableElevation={true}
          size="large"
          onClick={props.onClose}>
          {t('login:close')}
        </ActionButton>
      </ModalFooter>
    </Modal>
  )
}
