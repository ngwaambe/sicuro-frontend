import React from "react"
import {withTranslation, Link} from "../../i18n";
import {PropTypes} from "prop-types";

class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        t: PropTypes.func.isRequired,
    }

    static getInitialProps = async () => ({
        namespacesRequired: ['common'],
    })

    render() {
        return (
            <div id="wrapper">
                <div className="content-wrapper">{this.props.children}</div>

                <footer>
                    {/*-- missing class for home --*/}
                    <div className="footer-area-top">
                        <div className="container">

                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div className="footer-box">
                                        <h3 className="title-bar-footer">{this.props.t('menu-about_us')}</h3>
                                        <ul className="recent-post-link">
                                            <li>
                                                <Link href="/contact"><a>{this.props.t('menu-contact')}</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/security"><a>{this.props.t('menu-security')}</a></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div className="footer-box">
                                        <h3 className="title-bar-footer">{this.props.t('menu-service')}</h3>
                                        <ul className="recent-post-link">
                                            <li>
                                                <Link
                                                    href="/services/index"><a>{this.props.t('menu-service')}</a></Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/pricesAndFees"><a>{this.props.t('menu-prices_and_fees')}</a></Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/services/transfer"><a>{this.props.t('menu-secureDomainTransfer')}</a></Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/services/sellonline"><a>{this.props.t('menu-sellDomainOnline')}</a></Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/services/buyonline"><a>{this.props.t('menu-buyDomainOnline')}</a></Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/services/buynowlink"><a>{this.props.t('menu-buyNowLink')}</a></Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/services/broker"><a>{this.props.t('menu-broker')}</a></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div className="footer-box">
                                        <h3 className="title-bar-footer">{this.props.t('menu-support')}</h3>
                                        <ul className="recent-post-link">
                                            <li>
                                                <Link href="/faq"><a>{this.props.t('menu-faq')}</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/terms"><a>{this.props.t('menu-ask_a_question')}</a></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div className="footer-box">
                                        <h3 className="title-bar-footer">{this.props.t('menu-legal')}</h3>
                                        <ul className="recent-post-link">
                                            <li>
                                                <Link
                                                    href="/legal/terms"><a>{this.props.t('menu-terms_and_conditions')}</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/legal/policy"><a>{this.props.t('menu-privacy_policy')}</a></Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/legal/rules"><a>{this.props.t('menu-transaction_rules')}</a></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-area-bottom">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-md-10">
                                    <p>&copy; 2017 SICURO.COM - All rights reserved.</p>
                                </div>
                                <div className="col-lg-2 col-md-2">
                                    <p>Powered by <a target="_blank" href="https://www.exagonlab.com">Exagon</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default withTranslation('common')(MainLayout);