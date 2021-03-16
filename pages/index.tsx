import React from "react";
import {Trans, useTranslation, withTranslation} from "next-i18next";
import Link from "next/link";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import FrontendLayout from "../components/layouts/FrontendLayout";
import InfoSlider from "../components/InfoSlider";
import TransactionSteps from "../components/TransactionSteps";

const marginStyle1 : React.CSSProperties = {
  marginTop:'45px',
  marginBottom:'45px'
}
const marginStyle2: React.CSSProperties = {
  marginBottom:'10px'
}

const IndexPage = () => {
  const {t} = useTranslation(["home"])
  return (
    <>
      <InfoSlider/>
      <TransactionSteps/>
      <section className="s-space-default">
        <div className="rowContainer">
          <div className="column50">
            <div style={marginStyle2}><img src="/img/img-004.jpg"/></div>
          </div>
          <div className="column50">
              <h2 className="marginBottom30"><Trans>{t('security-lead')}</Trans></h2>
              <Trans>{t('security-text')}</Trans>
            </div>
        </div>
      </section>
    </>
  );
};

IndexPage.layout = FrontendLayout;

export const getStaticProps = async ({locale}) => (
  {
    props:{ ...( await serverSideTranslations(locale, ["home", "common","slider"]))}
  }
)
export default IndexPage;
