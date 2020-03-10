import React from "react"
import Link from 'next/link'
import {withTranslation} from "../../i18n";

class MainLayout extends React.Component {

    render() {
        return (
            <div id="wrapper">
                <div className="content-wrapper">{this.props.children}</div>
                <section className="s-space-default overlay-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="text-center">
                                    <h2 className="section-lg-title-light">UNO STAFF DI PROFESSIONISTI A TUA
                                        DISPOSIZIONE</h2>
                                    <p className="lead banner-para-light">Rimply dummy text of the printing and
                                        typesetting
                                        industry. Lorem Ipsum has been the industry's standard dummy text ever since
                                        printer
                                        took a galley.</p>
                                    <a href="#" className="btn-ftf-rd-sm-p-dp">Contattaci ora</a></div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="footer_extra_style">     {/*-- missing class for home --*/}
                    <div className="footer-area-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div className="footer-box">
                                        <h3 className="title-bar-footer">{this.props.t('menu.about_us')}</h3>
                                        <ul className="recent-post-link">
                                            <li>
                                                <Link href="/contact"><a>{this.props.t('menu.contact')}</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/security"><a>{this.props.t('menu.security')}</a></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div className="footer-box">
                                        <h3 className="title-bar-footer">menu.service</h3>
                                        <ul className="recent-post-link">
                                            <li>
                                                <Link href="/services/index"><a>menu.service</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/pricesAndFees"><a>menu.prices_and_fees</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/services/transfer"><a>menu.secureDomainTransfer</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/services/sellonline"><a>menu.sellDomainOnline</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/services/buyonline"><a>menu.buyDomainOnline</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/services/buynowlink"><a>menu.buyNowLink</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/services/broker"><a>menu.broker</a></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div className="footer-box">
                                        <h3 className="title-bar-footer">menu.support</h3>
                                        <ul className="recent-post-link">
                                            <li>
                                                <Link href="/faq"><a>menu.faq</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/terms"><a>menu.ask_a_question</a></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div className="footer-box">
                                        <h3 className="title-bar-footer">menu.legal</h3>
                                        <ul className="recent-post-link">
                                            <li>
                                                <Link href="/terms"><a>menu.terms_and_conditions</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/policy"><a>menu.privacy_policy</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/rules"><a>menu.transaction_rules</a></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-area-bottom">
                        <div className="container">
                            <div className="col-lg-10 col-md-10">
                                <p>&copy; 2017 SICURO.COM - Tutti i diritti sono riservati.</p>
                            </div>
                            <div className="col-lg-2 col-md-2">
                                <p>Powered by <a target="_blank" href="https://www.exagonlab.com">Exagon</a></p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default withTranslation("common")(MainLayout);