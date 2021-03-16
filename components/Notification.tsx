import React, { ReactNode } from 'react';
import { FetchTimeoutError, Notification, ServiceError } from '../state';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';
import {Button} from "@material-ui/core";

interface Props {
  notification?: Notification;
  children?: ReactNode;
  onClose: () => any;
}

const getMessage = (notification: Notification) => {
  // Prio 1 is the message
  if (notification.message) {
    return notification.message;
  }

  const error: any = notification.error;

  // Only show ServiceError messages to the user.
  if (error && (error instanceof ServiceError || error instanceof FetchTimeoutError)) {
    return error.message;
  } else if (error) {
    return 'Unbekannter Fehler. Bitte versuche es erneut.';
  }

  throw new Error('Notifications without content are not allowed.');
};

export default (props: Props) => (
  <div data-testid="notification">
    <Modal onEsc={props.onClose} onBackgroundClick={props.onClose}>
      {props.notification && props.notification.title ? (
        <ModalHeader><h3>{props.notification.title}</h3></ModalHeader>
      ) : props.notification?.error ? (
        <ModalHeader><h3>Es sind Fehler aufgetreten</h3></ModalHeader>
      ) : ''}
      <ModalBody>
        {props.children || getMessage(props.notification!)}
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={props.onClose}
          data-testid="notification-close"
          autoFocus={true}>
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  </div>
);
