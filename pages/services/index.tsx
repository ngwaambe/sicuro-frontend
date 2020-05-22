import React from 'react'
import {Link, Trans, withTranslation} from "../../i18n";
import PropTypes from "prop-types";

const ServiceIndexPage = ({t}) => (
    <React.Fragment>
        {/* Inner Page Banner Area Start Here */}
        <section className="inner-page-banner-area service-banner-background" >
            <div className="container">
                <div className="breadcrumbs-area">
                    <h1>Service</h1>
                    <ul>
                        <li><a href="/index">Home</a></li>
                        <li>Services</li>
                    </ul>
                </div>
            </div>
        </section>
        {/*Inner Page Banner Area End Here */}
        {/*About Area Start Here*/}
        <section className="s-space-top-default">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-title-dark">
                        <Trans>
                            {t('banner-title')}
                        </Trans>
                    </h2>
                    <p className="lead section-sub-title-dark">{t('banner-description')}</p>
                </div>
            </div>
        </section>
        {/*About Area End Here */}
        {/*Service Area Start Here */}
        <section className="bg-accent s-space-layout7">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="media mb-30">
                            <div className="aligneImage"><img src="/img/ico-001.png"/></div>
                            <div className="media-body">
                                <h3 className="service-title-dark">
                                    <Link href="/services/transfer"><a>Secured domain transfer</a></Link>
                                </h3>
                                <p>A special class of transactions you can make with sicuro.com is domain names. To transfer a domain name you need some specific technical skills, mostly if you are buying foreign domain extensions (ie. .es, .fr, .de…). For that matter sicuro.com has partnered with <strong className="nameCaseColor">Namecase</strong> to guarantee their users a more simple conduct of domains name transactions.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="media mb-30">
                            <div className="aligneImage"><img src="/img/ico-002.png"/></div>
                            <div className="media-body">
                                <h3 className="service-title-dark">
                                    <Link href="/services/transfer"><a>Sell online</a></Link>
                                </h3>
                                <p>Do you occasionally sell online or have made a sell at distance? Do you have doubts about how to carry out the transaction or may not offer sufficient guarantees to your customers? With <strong className="sicuroColor">sicuro.com</strong> you can give the best security to your buyers without the risk of being subject to scams. </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="media mb-30">
                            <div className="aligneImage"><img src="/img/ico-003.png"/></div>
                            <div className="media-body">
                                <h3 className="service-title-dark">
                                    <Link href="/services/transfer"><a>Buy online</a></Link>
                                </h3>
                                <p>Would you like to buy an item from a private seller or company but, for any reason, you don’t feel guaranteed enough? Try sicuro.com! After you have started a transaction and with just a few clicks, we will ask you to make your payment on our deposits account instead of paying the seller directly. We will then notify the seller when we receive your payment so he will be asked to send you the goods or service you required, that you can inspect within the time limits which you agreed.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="media mb-30">
                            <div className="aligneImage"><img src="/img/ico-001.png"/></div>
                            <div className="media-body">
                                <h3 className="service-title-dark"><Link href="/services/buynowlink"><a>{t('menu-buyNowLink')}</a></Link></h3>
                                <p>With the link "buy it now" of sicuro.com you can offer more guarantees to your customers who want to buy domains and at the same time have a quick and fast sales tool. You can in fact create a link that contains pre-determined data, such as the domain name and the price you want to sell it to. By placing the link in your promotional emails or on the site where you promote your domains, you will offer the possibility to your buyers to buy your domain in an easy , sicure and fast way</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="media mb-30">
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="media mb-30">
                            <div className="aligneImage"><img src="/img/ico-003.png"/></div>
                            <div className="media-body">
                                <h3 className="service-title-dark"><Link href="/services/broker"><a>Broker</a></Link></h3>
                                <p>sicuro.com has created a flexible and optimal tool designed specifically for domain brokers. If you are a broker and you need to give guarantees to your customers, buyer and seller, in the transaction management of a domain name, sicuro.com provides you with everything you need.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*Service Area End Here */}
        {/*About Area Start Here */}
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
        {/*About Area End Here */}
    </React.Fragment>
);

ServiceIndexPage.propTypes = {
    t: PropTypes.func.isRequired,
}

ServiceIndexPage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
export default withTranslation("common")(ServiceIndexPage);