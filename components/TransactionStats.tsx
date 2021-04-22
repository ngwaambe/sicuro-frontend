import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {CircularProgress, Card, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useTranslation} from "next-i18next";

const useStyles = makeStyles({
  root:{
    textAlign:'center',
    padding: '8px',
    '&:last-child': {
      paddingBottom:'8px'
    },
  },
  title:{
    fontSize: '1.7rem',
    fontWeight: 900,
    textAlign:'center',
  },
  subtitle: {
    fontWeight: 600,
  }

});

interface Props {
  customerId: number,
}

interface TransactionStats {
  loading: boolean,
  completed: number,
  inProgress: number,
  timedOut: number,
  aborted: number
}

interface StatsProps {
  title: string,
  value: number
}

const TransactionStats = (props: Props) => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [state, setState] = useState<TransactionStats>({
    loading: true,
    completed: 0,
    inProgress: 0,
    timedOut: 0,
    aborted: 0
  })

  useEffect(() => {
    console.log("loading");
    setTimeout( () => {
      setState({
        loading: false,
        completed:300,
        inProgress:40,
        timedOut:10,
        aborted:30
      })
    },1000)
  }, [state.loading]);

  const Stats = (statsProps: StatsProps) => (
    <Card variant="outlined">
      <CardContent className={classes.root}>
        {state.loading === true && <CircularProgress size={50}/>}
        {state.loading === false &&
        <>
            <Typography className={classes.title} align={"center"} variant="h5" component="h1"> {statsProps.value}</Typography>
            <Typography className={classes.subtitle} align={"center"} variant="caption" display="block" gutterBottom>{statsProps.title}</Typography>
        </>}

      </CardContent>
    </Card>
  )

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Stats title={t('transactionsInprogress')} value={state.inProgress}/>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Stats title={t('completedTransactions')} value={state.completed}/>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Stats title={t('abortedTransactions')} value={state.timedOut}/>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Stats title={t('timedOutTransactions')} value={state.aborted}/>
      </Grid>
    </Grid>
  )
}

export default TransactionStats;
