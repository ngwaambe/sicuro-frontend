import React from "react";
import {Trans, useTranslation} from "next-i18next";
import PageLayout from "../components/layouts/PageLayout";
import Link from "next/link"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const SecurityPage = () => {
  const {t} = useTranslation(["securitypage", "common"])
  return (
    <React.Fragment>
      <section className="inner-page-banner-area service-banner-background">
        <div className="container">
          <div className="breadcrumbs-area">
            <h1><Trans>{t('menu-security')}</Trans></h1>
            <ul>
              <li><Link href="/index"><a><Trans>{t('menu-home')}</Trans> - </a></Link>
              </li>
              <li><Trans>{t('menu-security')}</Trans></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-accent s-space-layout7">
        <div className="container">
          <Trans>{t('security-text')}</Trans>
        </div>
      </section>
    </React.Fragment>
  );
}

SecurityPage.layout = PageLayout;
export const getStaticProps = async({locale}) =>(
  {
      props:{ ...(await serverSideTranslations(locale, ["securitypage", "common"]))}
  }
)
export default SecurityPage
