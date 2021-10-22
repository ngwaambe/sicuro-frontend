import React from "react";
import {Trans, useTranslation, withTranslation} from "next-i18next";
import Link from "next/link";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import FrontendLayout from "../components/layouts/FrontendLayout";
import InfoSlider from "../components/InfoSlider";
import TransactionSteps from "../components/TransactionSteps";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
const marginStyle2: React.CSSProperties = {
  marginBottom:'10px'
}

const IndexPage = () => {
  const classes = useStyles()
  const {t} = useTranslation(["home"])
  return (
    <>
      <InfoSlider/>
      <TransactionSteps/>
      <section className="s-space-default">
        <div className="container">
          <Grid spacing={4} container justifyContent="center">
            <Grid item xs={12} sm={6}>
              <div style={marginStyle2}><img src="/img/img-004.jpg"/></div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h2 className="marginBottom15"><Trans>{t('security-lead')}</Trans></h2>
              <Trans>{t('security-text')}</Trans>
            </Grid>
          </Grid>
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
