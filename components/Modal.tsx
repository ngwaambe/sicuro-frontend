import React, { MouseEvent, ReactNode, useCallback, useEffect } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  className?: string;
  onEsc?: () => void;
  onBackgroundClick?: () => void;
}

interface FooterProps {
  children: ReactNode;
  divider?: boolean;
  confirm?: boolean;
  className?: string;
}

interface ChildProps {
  children: ReactNode;
  className?: string;
}

const classNames = (xs: string[]) => xs.filter((x) => x).join(' ');

export const Modal = (props: ModalProps) => {
  const handleUserKeyPress = useCallback((e) => {
    if (e.keyCode === 27 && props.onEsc) {
      props.onEsc();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    document.body.classList.add('modal-open');
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
      document.body.classList.remove('modal-open');
    };
  }, [handleUserKeyPress]);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  const onBackgroundClick = (e: MouseEvent<HTMLElement>) => {
    if (props.onBackgroundClick && e.target === e.currentTarget) {
      props.onBackgroundClick();
    }
  };

  return (
    <div
      className={classNames([styles.modalContainer, props.className])}
      data-testid="modal"
      onClick={onBackgroundClick}>
      <div className={styles.modal}>
        {props.children}
      </div>
    </div>
  );
};

export const ModalHeader = (props: ChildProps) => (
  <div className={classNames([styles.modalHeader, props.className])}>
    {props.children}
  </div>
);

export const ModalBody = (props: ChildProps) => (
  <div className={classNames([styles.modalBody, props.className])} data-testid="modal-body">
    {props.children}
  </div>
);

export const ModalFooter = (props: FooterProps) => (
  <div className={classNames([
    props.divider === false ? styles.modalFooter : styles.modalFooterDivided,
    props.confirm ? styles.modalFooterConfirm : '',
    props.className,
  ])} data-testid="modal-footer">
    {props.children}
  </div>
);
