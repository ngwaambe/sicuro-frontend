import PropTypes from "prop-types";
import {withTranslation, Trans, useTranslation} from "../i18n";
import React, {ReactNode} from "react";

interface TransactionStepProps {
    imageSource: string;
    children: ReactNode;
}

const TransactionStep = (props: TransactionStepProps) => (
    <div className="transactionStep">
        <img src={props.imageSource}/>
        <br/>
        {props.children}
    </div>
);

const TransactionSteps = (props) => {
    const { t } = useTranslation('slider');
    return (
        <>
            <section className="transactionSteps">
                <div className="container">
                    <h1 className="transactionStepHeader">
                        <Trans>{props.t('slider-lead')}</Trans>
                    </h1>
                    <div className="transactionStepsRow">
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

TransactionSteps.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('slider')(TransactionSteps);
