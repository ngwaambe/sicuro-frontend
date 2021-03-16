import React from "react"
import {Trans, useTranslation} from "next-i18next";
import PageLayout from "../../components/layouts/PageLayout";
import Link from "next/link"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const marginR2Style = {
  marginBottom: '8px'
}

const pStyle = {
  display: 'inline'
}

const PolicyPage = () =>{
  const {t} = useTranslation(["policypage", "common"])
  return (
    <React.Fragment>
      <section className="inner-page-banner-area legal-banner-background">
        <div className="container">
          <div className="breadcrumbs-area">
            <h1><Trans>{t('menu-privacy_policy')}</Trans></h1>
            <ul>
              <li>
                <Link href="index"><Trans>{t('menu-home')}</Trans></Link>
                -
              </li>
              <li><Trans>{t('menu-privacy_policy')}</Trans></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="s-space-top-default">
        <div className="container">
          <div>
            <h3>{t("privacy_policy_statement_title")}</h3>
            <p>{t("privacy_policy_statement_text")}</p>
            <p>
              <ol>
                <li style={marginR2Style}>
                  <p style={pStyle}>{t("privacy_policy_statement_item1")}</p>
                </li>
                <li style={marginR2Style}>
                  <p style={pStyle}>{t("privacy_policy_statement_item2")}</p>
                </li>
                <li style={marginR2Style}>
                  <p style={pStyle}>{t("privacy_policy_statement_item3")}</p>
                </li>
                <li style={marginR2Style}>
                  <p style={pStyle}>{t("privacy_policy_statement_item4")}</p>
                </li>
                <li style={marginR2Style}>
                  <p style={pStyle}>{t("privacy_policy_statement_item5")}</p>
                </li>
              </ol>
            </p>
            <h3>{t("newsletter_title")}</h3>
            <p>
              <ol>
                <li style={marginR2Style}>
                  <p style={pStyle}>{t("newsletter_item1")}</p>
                </li>
              </ol>
            </p>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

PolicyPage.layout = PageLayout;

export const getStaticProps = async ({locale}) => ({
  props: {...(await serverSideTranslations(locale, ["policypage", "common"]))}
})

export default PolicyPage
