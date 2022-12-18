import {Card, CardActions, CardContent, CircularProgress, createStyles, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {ActionButton} from "./CustomMaterialUI";
import React, {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import {BankAccount, PaymentAccount, PaymentType, PaypalAccount} from "../state";
import {deletePaymentAccount, getPaymentAccounts} from "../service/customerService";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import PaypalModal from "./PaypalModal";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteTwoTone from "@material-ui/icons/DeleteTwoTone";
import AccountBalanceTwoToneIcon from "@material-ui/icons/AccountBalanceTwoTone";
import {Paypal} from "./Icons";
import BankModal from "./BankModal";
import ConfirmModal from "./ConfirmModal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    title: {
      fontSize: '1.15rem',
      fontWeight: 500,
    },
    cardBarActions: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      padding: "16px 16px 0px 16px",
      flexWrap: "wrap",
      gap: "10px",
      width:'100%',
      [theme.breakpoints.down('sm')]: {
        '& > :not(:first-child)':{
           marginLeft:'0px'
        }
      }
    },
    action: {
      borderTop: 'solid',
      borderWidth: '1px',
      borderColor: '#0000001E'
    },
    addActionItem: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: '0px'
      },
      [theme.breakpoints.up('sm')]: {
        minWidth: '250px',
      },
      justifyContent: 'left'

    },
    actionItem: {
      width: '100%',
      justifyContent: 'left'
    }
  }),
);

enum Action {
  ADD_PAYPAL_ACCOUNT,
  ADD_BANK_ACCOUNT,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
  DO_NOTHING
}

interface Props {
  customerId: number,
}

interface LocalProps {
  accounts: PaymentAccount[],
  action: Action,
  loading: boolean
}


const PaymentAccounts = (props: Props) => {
  const classes = useStyles();
  const {t} = useTranslation(['common', 'login'])
  const [selectedPaypalAccount, selectPaypalAccount] = useState<PaypalAccount>()
  const [selectedBankAccount, selectBankAccount] = useState<BankAccount>()
  const [state, setState] = useState<LocalProps>({
    accounts: [],
    action: Action.DO_NOTHING,
    loading: true
  })

  useEffect(() => {
    fetchPaymentAccounts()
  }, [])

  const fetchPaymentAccounts = () => {
    setState({
      ...state,
      loading: true
    });
    getPaymentAccounts(props.customerId.toString()).then(result => {
      if (result.success) {
        setState({
          ...state,
          action: Action.DO_NOTHING,
          accounts: result.data,
          loading: false
        })
      }
    });
  }

  const closeModal = () => {
    setState({
      ...state,
      action: Action.DO_NOTHING
    })

  }

  const closePaypalModal = () => {
    selectPaypalAccount(undefined)
    setState({
      ...state,
      action: Action.DO_NOTHING
    })
  }

  const closeBankModal = () => {
    selectBankAccount(undefined)
    setState({
      ...state,
      action: Action.DO_NOTHING
    })
  }

  const saveAndCloseModal = () => {
    selectBankAccount(undefined)
    selectPaypalAccount(undefined)
    fetchPaymentAccounts();
    setState({
      ...state,
      action: Action.DO_NOTHING
    })
  }

  const editPaypalAccount = (account: PaypalAccount, action: Action) => {
    selectPaypalAccount(account);
    setState({
      ...state,
      action: action
    })
  }

  const editBankAccount = (account: BankAccount, action: Action) => {
    selectBankAccount(account);
    setState({
      ...state,
      action: action
    })
  }

  const addPaypalAccount = () => {
    setState({
      ...state,
      action: Action.ADD_PAYPAL_ACCOUNT
    })
  }

  const addBankAccount = () => {
    setState({
      ...state,
      action: Action.ADD_BANK_ACCOUNT
    })
  }

  const createPaypalAccount = (): PaypalAccount => {
    return {
      id: undefined,
      owner: "",
      paymentType: PaymentType.PAYPAL,
      paypalAccount: ""
    }
  }

  const createBankAccount = (): BankAccount => {
    return {
      id: undefined,
      owner: '',
      paymentType: PaymentType.PAYPAL,
      bankName: '',
      iban: '',
      swiftCode: '',
      city: '',
      postalCode: '',
      countryIso: 'DE'
    }
  }

  const deleteAccount = (customerId: number, paymentAccountId: number) => {
    deletePaymentAccount(customerId, paymentAccountId).then(response => {
      if (response.success) {
        selectPaypalAccount(undefined)
        selectBankAccount(undefined)
        fetchPaymentAccounts()
      }
    })
  }

  return (
    <>
      {state.action === Action.ADD_PAYPAL_ACCOUNT &&
          <PaypalModal
              titleText={"contact-details-add-paypal"}
              customerId={props.customerId}
              onClose={closeModal}
              onSave={saveAndCloseModal}
              account={createPaypalAccount()}/>}

      {selectedPaypalAccount && state.action === Action.EDIT_ACCOUNT &&
          <PaypalModal
              titleText={"paypal-edit"}
              customerId={props.customerId}
              onClose={closePaypalModal}
              onSave={saveAndCloseModal}
              account={selectedPaypalAccount}/>}

      {selectedPaypalAccount && state.action === Action.DELETE_ACCOUNT &&
          <ConfirmModal
              titleText={"Delete Paypal account"}
              confirmText={"Do you really want to delete this paypal account"}
              onClose={closePaypalModal}
              onConfirm={() => deleteAccount(props.customerId, selectedPaypalAccount.id)}/>}

      {state.action === Action.ADD_BANK_ACCOUNT &&
          <BankModal
              titleText={"contact-details-add-paypal"}
              customerId={props.customerId}
              onClose={closeModal}
              onSave={saveAndCloseModal}
              account={createBankAccount()}/>}

      {selectedBankAccount && state.action === Action.EDIT_ACCOUNT &&
          <BankModal
              titleText={"contact-details-add-paypal"}
              customerId={props.customerId}
              onClose={closeBankModal}
              onSave={saveAndCloseModal}
              account={selectedBankAccount}/>}

      {selectedBankAccount && state.action === Action.DELETE_ACCOUNT &&
          <ConfirmModal
              titleText={"Delete Bank account"}
              confirmText={"Do you really want to delete this bank account"}
              onClose={closeBankModal}
              onConfirm={() => deleteAccount(props.customerId, selectedBankAccount.id)}/>}

      <Card variant="outlined">
        <CardActions className={classes.cardBarActions}>
          <ActionButton
            className={classes.addActionItem}
            startIcon={<AddCircleTwoToneIcon/>}
            variant="contained"
            color="primary"
            size="medium"
            onClick={addBankAccount}>
            {t('common:contact-details-add-bank')}
          </ActionButton>
          <ActionButton
            className={classes.addActionItem}
            startIcon={<AddCircleTwoToneIcon/>}
            variant="contained"
            color="primary"
            onClick={addPaypalAccount}
            size="medium">
            {t('common:contact-details-add-paypal')}
          </ActionButton>
        </CardActions>
        <CardContent>
          {!state.loading && state.accounts.length == 0 &&
              <Typography align={"center"} component={"span"}>
                  No saved payment accounts
              </Typography>}

          {state.loading && <CircularProgress color="inherit"/>}

          {!state.loading && state.accounts.length >= 0 &&
              <Grid container spacing={3} alignItems="stretch" direction="row">
                {state.accounts.map((item) => (
                  <Grid item xs={12} sm={12} md={6} key={item.id}>
                    {item.paymentType === PaymentType.PAYPAL &&
                        <Card variant="outlined">
                            <CardContent>
                                <Typography align={"center"} component={"span"}>
                                    <Paypal/>
                                    <br/>{item.owner}
                                    <br/>{(item as PaypalAccount).paypalAccount}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <ActionButton
                                    className={classes.actionItem}
                                    startIcon={<EditTwoToneIcon/>}
                                    variant="outlined"
                                    size="medium"
                                    onClick={() => editPaypalAccount(item as PaypalAccount, Action.EDIT_ACCOUNT)}>
                                  {t('common:edit')}
                                </ActionButton>
                                <ActionButton
                                    className={classes.actionItem}
                                    startIcon={<DeleteTwoTone/>}
                                    variant="outlined"
                                    onClick={() => editPaypalAccount(item as PaypalAccount, Action.DELETE_ACCOUNT)}
                                    size="medium">
                                  {t('common:delete')}
                                </ActionButton>
                            </CardActions>
                        </Card>
                    }
                    {item.paymentType === PaymentType.BANK &&
                        <Card variant="outlined">
                            <CardContent>
                                <Typography align={"center"} component={"span"}>
                                    <AccountBalanceTwoToneIcon/>
                                    <br/>{item.owner}
                                    <br/>{`${(item as BankAccount).iban?.substr(0, 4)} **** **** **** ${(item as BankAccount).iban?.substr((item as BankAccount).iban?.length - 6, 4)} **`}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <ActionButton
                                    className={classes.actionItem}
                                    startIcon={<EditTwoToneIcon/>}
                                    variant="outlined"
                                    size="medium"
                                    onClick={() => editBankAccount(item as BankAccount, Action.EDIT_ACCOUNT)}>
                                  {t('common:edit')}
                                </ActionButton>
                                <ActionButton
                                    className={classes.actionItem}
                                    startIcon={<DeleteTwoTone/>}
                                    variant="outlined"
                                    onClick={() => editBankAccount(item as BankAccount, Action.DELETE_ACCOUNT)}
                                    size="medium">
                                  {t('common:delete')}
                                </ActionButton>
                            </CardActions>
                        </Card>
                    }
                  </Grid>
                ))}
              </Grid>
          }
        </CardContent>
      </Card>
    </>
  );
};

export default PaymentAccounts
