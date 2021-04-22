import {Trans, useTranslation} from "next-i18next";
import React, {ReactNode} from "react";
import styles from "./TransactionSteps.module.css"
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

interface TransactionStepProps {
    imageSource: string;
    children: ReactNode;
}

const TransactionStep = (props: TransactionStepProps) => (
      <div className={styles.transactionStep}>
        <img src={props.imageSource}/>
        <br/>
        {props.children}
    </div>
);

const TransactionSteps = (props) => {
    const { t } = useTranslation('slider');
    const classes = useStyles();
    return (
        <>
            <section className="container">
                <div className={styles.transactionStepsContainer}>
                    <Grid container spacing={4} justify="center">
                        <Grid item xs={12}>
                            <h1 className={styles.transactionStepHeader}>
                                <Trans>{t('slider-lead')}</Trans>
                            </h1>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <TransactionStep imageSource="/img/step-1.png">
                                <Trans>{t('step1-label')}</Trans>
                            </TransactionStep>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <TransactionStep imageSource="/img/step-2.png">
                                <Trans>{t('step2-label')}</Trans>
                            </TransactionStep>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <TransactionStep imageSource="/img/step-3.png">
                                <Trans>{t('step3-label')}</Trans>
                            </TransactionStep>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <TransactionStep imageSource="/img/step-4.png">
                                <Trans>{t('step4-label')}</Trans>
                            </TransactionStep>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <TransactionStep imageSource="/img/step-5.png">
                                <Trans>{t('step5-label')}</Trans>
                            </TransactionStep>
                        </Grid>
                    </Grid>
                </div>
            </section>
        </>
        );
}
export default TransactionSteps;
