import {Link, Trans, withTranslation} from "../../i18n";
import React from "react";

const TermsPage = ({t}) => {
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
            <section className="s-space-default overlay-default banner-backgroung" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="text-center">
                                <h2 className="section-lg-title-light">
                                    <Trans>
                                        {t('banner-title')}
                                    </Trans>
                                </h2>
                                <p className="lead banner-para-light">{t('banner-description')}</p>
                                <a href="#" className="btn-ftf-rd-sm-p-dp">{t('contact-us')}</a></div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default withTranslation('common')(TermsPage);