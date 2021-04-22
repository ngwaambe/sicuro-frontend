import {Trans, useTranslation} from "next-i18next";
import PageLayout from "../../components/layouts/PageLayout";
import React from "react";
import Link from "next/link"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Grid from "@material-ui/core/Grid";

const margenBottom = {
    marginBottom: '10px'
}

const imageLayout1 = {
    marginTop:'45px',
    marginBottom:'45px'
}

const imageLayout2 = {
  marginTop:'45px',
  marginBottom:'45px'
}

const imageLayout3 = {
  marginTop:'45px',
  marginBottom:'45px'
}

const SellOnlinePage = () => {
  const {t} = useTranslation(['sellonline', 'common'])
  return (
    <React.Fragment>
      <section className="inner-page-banner-area service-banner-background2">
        <div className="container">
          <div className="breadcrumbs-area">
            <h1><Trans>{t('menu-sellDomainOnline')}</Trans></h1>
            <ul>
              <li>
                <Link href="/"><a><Trans>{t('menu-home')}</Trans> - </a></Link>
              </li>
              <li>
                <Link href="/services"><a><Trans>{t('menu-service')}</Trans> - </a></Link>
              </li>
              <li><Trans>{t('menu-sellDomainOnline')}</Trans></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="s-space-top-default">
        <div className="container">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <h4><Trans>{t('question1')}</Trans></h4>
              <p><Trans>{t('answer1')}</Trans></p>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <img src="/img/img-002.jpg"/>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <div>
                <img src="/img/img-001.jpg"/>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <h4><Trans>{t('question2')}</Trans></h4>
              <p><Trans>{t('answer2')}</Trans></p>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <h4><Trans>{t('question3')}</Trans></h4>
              <p><Trans i18nKey="answer3" defaults={t('answer3')} components={{ 1: <ul/>, 2:<li/>}}>{t('answer3')}</Trans></p>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <img src="/img/img-002.jpg"/>
            </Grid>
          </Grid>
        </div>
      </section>
    </React.Fragment>
  )
}

SellOnlinePage.layout = PageLayout;

export const getStaticProps = async ({locale}) => {
  return {
    props: {
      ...( await serverSideTranslations(locale, ['sellonline', 'common'])),
    }
  }
}

export default SellOnlinePage
