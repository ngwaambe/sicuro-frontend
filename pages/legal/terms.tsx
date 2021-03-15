import {Trans, useTranslation} from "next-i18next";
import React from "react";
import PageLayout from "../../components/layouts/PageLayout";
import PropTypes from "prop-types";
import Link from "next/link"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const TermsPage = () => {
    const {t} = useTranslation(["termspage", "common"])
    return(
        <React.Fragment>
            <section className="inner-page-banner-area legal-banner-background">
                <div className="container">
                    <div className="breadcrumbs-area">
                        <h1>Terms and Conditions</h1>
                        <ul>
                            <li>
                                <Link href="/index">Home</Link>
                                -
                            </li>
                            <li>Terms and Conditions</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="s-space-top-default">
                <div className="container">

                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="fontsize15px color414042 text-justify">

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
TermsPage.layout = PageLayout;


export const getStaticProps = async ({locale}) => ({
    props: {...(await serverSideTranslations(locale, ["termspage", "common"]))}
})

export default TermsPage;
