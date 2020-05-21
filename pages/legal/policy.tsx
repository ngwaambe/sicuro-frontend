import React from "react"
import {Link, Trans, withTranslation} from "../../i18n";

const marginR2Style = {
    marginBottom: '8px'
}

const pStyle = {
    display:'inline'
}

const PolicyPage = ({t}) => {
    return (
        <React.Fragment>
            <section className="inner-page-banner-area legal-banner-background">
                <div className="container">
                    <div className="breadcrumbs-area">
                        <h1>Private Policy</h1>
                        <ul>
                            <li>
                                <Link href="index">Home</Link>
                                -
                            </li>
                            <li>Private Policy</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="s-space-top-default">
                <div className="container">
                    <div>
                        <ol>
                            <h3>PRIVACY POLICY STATEMENT</h3>
                            <p>In order to use sicuro.com services with an optimum level of security, the user is required to consent to the following.</p>
                            <li style={marginR2Style}>
                                <p style={pStyle}>When registered with sicuro.com, the user accepts that the user information like name, address, date of birth, telephone number, e-mail address, and any account information for payment, fax number, company information like the name of the company, the VAT number, as well as any additional information collected while using sicuro.com is memorised and processed by our systems.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>sicuro.com saves only save client data that is necessary to provide the services contractually stipulated by sicuro.com and their partners. sicuro.com and the client hereby agree to respect the regulations and laws enforced to protect the confidentiality of the information deriving  from their commercial relations, especially information regarding the client and his/her address. The client reserves the right to verify the information recorded in his/her own account, there it may be modified at any time.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>sicuro.com manages a technical system through which the buyer, during the transaction, can send payments to a fiduciary account managed by the Law Firm Bernhard H. Jansen. In order to increase security during these processes, payments will be sent to a fiduciary account in Germany dedicated to the transactions that occur on sicuro.com and administered by the Law Firm Bernhard H. Jansen (Kaiser Platz 8, DE-53113 Bonn, Germany).
                                    To this view, sicuro.com transfers all the data necessary to complete the payment and required by law to the Law Firm Bernhard H. Jansen. The Law Firm Bernhard H. Jansen ensures that this data will be used only to process payments. In this context, further information may be requested in order to fulfil legal obligations or prevent illicit operations. By using sicuro.com, the user accepts such transmission and processing of data between sicuro.com and the Law Firm Bernhard H. Jansen.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>If payment is not made, the user accepts that the relevant data be transmitted by sicuro.com to credit collection agencies or other providers of similar services. In case of suspected fraud, the competent authorities will be notified.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Only the client data necessary for bureaucratic or legal reasons will be recorded. sicuro.com hereby agrees to comply strictly with all the laws concerning the confidentiality of personal data, especially the data of clients and their addresses. If data processing and recording is denied, or if consent to process data is successively withdrawn, it will no longer be possible to use sicuro.com services.
                                    If the user wishes to close his/her own account, sicuro.com will suspend the account to prevent subsequent access. For the prevention of fraud attempts and for the reporting of accounting and financial documents, client data will be saved in compliance with legal provisions.</p>
                            </li>
                        </ol>
                        <ol>
                            <h3>NEWSLETTER</h3>
                            <li style={marginR2Style}>
                                <p  style={pStyle}>When registered with sicuro.com.com, the user accepts to be notified by sicuro.com.com on offers and news concerning sicuro.com.com or their partners by e-mail, by post, or by telephone.  It is possible to deactivate this service in the "User Account” area under the “My sicuro”. Naturally, if the newsletter is no longer desired, the subscription may be cancelled via e-mail.</p>
                            </li>
                        </ol>

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
    )
}

export default withTranslation('common')(PolicyPage);