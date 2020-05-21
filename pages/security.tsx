import React from "react";
import {Link, Trans, withTranslation} from "../i18n";


const positionStyle = {
    position:'realtive'
}
const SecurityPage = ({t}) => {
    return (
        <React.Fragment>
            <section className="inner-page-banner-area service-banner-background">
                <div className="container">
                    <div className="breadcrumbs-area">
                        <h1>Security</h1>
                        <ul>
                            <li><Link href="/index">Home</Link>
                                -
                            </li>
                            <li>Sicurity</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="bg-accent s-space-layout7" style={positionStyle}>
                <div className="container">
                    <div className="box-simple-text">
                        <p>On the web you can find great offers and deals. Using the Internet, we are able to find and
                            buy rare and
                            exotic goods from all corners of the world with just a few clicks. Thanks to the World Wide
                            Web, we are no
                            longer limited by geography.</p> <p>Despite this, you have to be very careful when buying
                        online, especially
                        if you buy on foreign websites. The risk of being defrauded is everpresent\: from phishing and
                        personal
                        data theft (such as credit card data) to the delivery of fake goods, or simply failure to send
                        the purchased goods.
                    </p>
                        <p>Thanks to the escrow service provided by sicuro.com, in collaboration with the Legal Office
                            of
                            Bernhard H. Jansen, buying goods on the Internet becomes safe and the risk of fraud is
                            reduced to a minimum.
                            With just a few clicks, you can start a transaction in a few easy steps\: sicuro.com
                            provides a contract of
                            sale, your payment is sent to the escrow account of the Legal Office of Bernhard H. Jansen,
                            which offers
                            you all the safeguards prescribed by German law. Only after receiving your payment will
                            sicuro.com tell
                            the seller to send you your goods. When you receive it, you will also have an inspection
                            period (the
                            length of which can be agreed with the seller), and only after you have verified that the
                            goods
                            correspond to the description given before the purchase will sicuro.com send your payment to
                            the seller.</p>
                        <p> To ensure complete security and confidentiality of transmitted data, sicuro.com uses 256-bit
                            SSL encryption technology. Your payment details and any other information entered by the
                            user is automatically encrypted and protected during transmission.</p>
                        <p> For more informations, please contact us at contact@sicuro.com.</p>
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

export default withTranslation('common')(SecurityPage)