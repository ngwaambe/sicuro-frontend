import {Modal, ModalBody, ModalFooter, ModalHeader} from "./Modal";
import {
  Backdrop, Card, CardContent, CardHeader, CircularProgress, createStyles,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select, Theme
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import {ActionButton, StyledFormControls, StyledTextField} from "./CustomMaterialUI";
import React, {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import CommonStyles from './common.module.css'
import {useDispatch} from "../service/Auth.context";
import {PaymentAccount, PaypalAccount, ResponseData} from "../state";
import {getPaymentAccounts, updatePaypalAccount} from "../service/customerService";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    title: {
      fontSize:'1.15rem',
      fontWeight:500,
    },
  }),
);

interface Props {
  customerId: number
}

interface LocalProps {
  accounts: PaymentAccount[],
  loading: boolean
}


const PaymentAccounts =  (props:Props) => {
  const classes = useStyles();
  const {t} = useTranslation(['common', 'login'])
  const [state, setState] = useState<LocalProps>({
    accounts: [],
    loading: true
  })

  useEffect(() => {
    fetchPaymentAccounts()
  }, [])

  const fetchPaymentAccounts = async () => {
    const result = await getPaymentAccounts(props.customerId.toString())
    if (result.success) {
      setState({
        ...state,
        accounts: result.data,
        loading: false
      })
    }
  }

  return (
    <>
      {state.loading &&
      <CircularProgress color="inherit"/>
      }
      {!state.loading && state.accounts.length == 0 &&
      <Card variant="outlined">
          <CardContent>
              <Typography align={"center"} component={"span"}>
                  No saved payment accounts
              </Typography>
          </CardContent>
      </Card>
      }
      {!state.loading && state.accounts.length >= 0 &&
      <Grid container spacing={3} alignItems="stretch" direction="row">
        {state.accounts.map((item) => (
          <Grid item xs={12} sm={12} md={6} key={item.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography align={"center"} component={"span"}>
                  {state.accounts.length} saved payment accounts
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      }
    </>
  );
};

export default PaymentAccounts
