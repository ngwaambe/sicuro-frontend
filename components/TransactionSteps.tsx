import {Trans, useTranslation} from "next-i18next";
import React, {ReactNode} from "react";
import styles from "./TransactionSteps.module.css"

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
    return (
        <>
            <section className={styles.transactionSteps}>
                <div className={styles.transactionStepsContainer}>
                    <h1 className={styles.transactionStepHeader}>
                        <Trans>{t('slider-lead')}</Trans>
                    </h1>
                    <div className={styles.transactionStepsRow}>
                        <TransactionStep imageSource="/img/step-1.png">
                            <Trans>{t('step1-label')}</Trans>
                        </TransactionStep>
                        <TransactionStep imageSource="/img/step-2.png">
                            <Trans>{t('step2-label')}</Trans>
                        </TransactionStep>
                        <TransactionStep imageSource="/img/step-3.png">
                            <Trans>{t('step3-label')}</Trans>
                        </TransactionStep>
                        <TransactionStep imageSource="/img/step-4.png">
                            <Trans>{t('step4-label')}</Trans>
                        </TransactionStep>
                        <TransactionStep imageSource="/img/step-5.png">
                            <Trans>{t('step5-label')}</Trans>
                        </TransactionStep>
                    </div>
                </div>
            </section>
        </>
        );
}
export default TransactionSteps;
