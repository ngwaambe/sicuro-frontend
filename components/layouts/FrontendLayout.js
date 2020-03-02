import Link from 'next/link'

const marginR2Style = {
    marginRight: '2px'
}

const FrontendLayout = props => (
    <div id="wrapper">
        {/* Header Area Start Here */}
        <header>
            <div className="header-area header-fixed header-style-four">
                <div className="main-menu-area-top">
                    <div className="container">
                        <div className="col-lg-5 col-md-5">
                            <span style={marginR2Style}><img src="/img/ico-tel.png"/>+49 (0) 228 38759255</span>
                            <span className="ClearDisplayMobile">
                                    <img src="/img/email-ico.png"/>
                                    <a href="mailto:contact@sicuro.com">contact[at]sicuro.com</a>
                                </span>
                        </div>
                        <div>
                            <form prependId="false">
                                <Link href="/index">
                                    <a>Sicuro</a>
                                </Link>

                                <Link href="/login">
                                        <a>Login</a>
                                </Link>

                                <Link href=""><a>ITA</a></Link> |
                                <Link href=""><a>ENG</a></Link> |
                                <Link href=""><a>ES</a></Link>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="main-menu-area" id="sticker">
                    <div className="container">
                        <div className="row no-gutters d-flex align-items-center">
                            <div className="col-lg-3 col-md-3">
                                <div className="logo-area">
                                    <Link href="/index">
                                        <img src="/img/logo.png" alt="logo"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-8 possition-static" id="main-nav-wrap">
                                <div className="elv-main-menu">
                                    <nav id="main-nav">

                                    </nav>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Menu Area Start */}
            {/*<div className="mobile-menu-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mobile-menu">
                                <nav id="dropdown">
                                    <ul>
                                        <li>
                                            <Link href="/index" value="#{msgs['menu.home']}"/>
                                        </li>
                                        <li className="#{ fn:startsWith(view.viewId, '/services') ? 'menu-justify current' : ''}">
                                            <Link href="/services/index" value="#{msgs['menu.service']}"/>
                                            <ul>
                                                <li>
                                                    <Link href="/services/transfer"
                                                          value="#{msgs['menu.secureDomainTransfer']}"/>
                                                </li>
                                                <li>
                                                    <Link href="/services/sellonline"
                                                          value="#{msgs['menu.sellDomainOnline']}"/>
                                                </li>
                                                <li>
                                                    <Link href="/services/buyonline"
                                                          value="#{msgs['menu.buyDomainOnline']}"/>
                                                </li>
                                                <li>
                                                    <Link href="/services/buynowlink"
                                                          value="#{msgs['menu.buyNowLink']}"/>
                                                </li>
                                                <li>
                                                    <Link href="/services/broker"
                                                          value="#{msgs['menu.broker']}"/>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link href="/terms" value="#{msgs['menu.howItWorks']}"/>
                                        </li>
                                        <li>
                                            <Link href="/terms" value="#{msgs['menu.howMuchWillItCost']}"/>
                                        </li>
                                        <li>
                                            <Link href="/terms" value="#{msgs['menu.contact']}"/>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>*/}
            {/* Mobile Menu Area End */}
        </header>
        {/* Header Area End Here */}

        {/* Content Area Start  Here */}
        {props.children}
        {/* Content Area End  Here */}
        {/* Footer Area Start Here */}
        {/*<footer
            className="#{view.viewId eq '/index.xhtml' ? 'footer_extra_style' : ''}">
            <div className="footer-area-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="footer-box">
                                <h3 className="title-bar-footer">About us</h3>
                                <ul className="recent-post-link">
                                    <li>
                                        <link outcome="/contact" value="#{msgs['menu.contact']}"/>
                                        >
                                    </li>
                                    <li>
                                        <link outcome="/security" value="#{msgs['menu.security']}"/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="footer-box">
                                <h3 className="title-bar-footer">Services</h3>
                                <ul className="recent-post-link">
                                    <li>
                                        <link outcome="/services/index" value="#{msgs['menu.service']}"/>
                                    </li>
                                    <li>
                                        <link outcome="/pricesAndFees" value="#{msgs['menu.prices_and_fees']}"/>
                                    </li>
                                    <li>
                                        <link outcome="/services/transfer"
                                              value="#{msgs['menu.secureDomainTransfer']}"/>
                                    </li>
                                    <li>
                                        <link outcome="/services/sellonline"
                                              value="#{msgs['menu.sellDomainOnline']}"/>
                                    </li>
                                    <li>
                                        <link outcome="/services/buyonline"
                                              value="#{msgs['menu.buyDomainOnline']}"/>
                                    </li>
                                    <li>
                                        <link outcome="/services/buynowlink" value="#{msgs['menu.buyNowLink']}"/>
                                    </li>
                                    <li>
                                        <link outcome="/services/broker" value="#{msgs['menu.broker']}"/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="footer-box">
                                <h3 className="title-bar-footer">Support</h3>
                                <ul className="recent-post-link">
                                    <li>
                                        <link outcome="/faq" value="#{msgs['menu.faq']}"/>
                                    </li>
                                    <li>
                                        <link outcome="/contact" value="#{msgs['menu.ask_a_question']}"/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="footer-box">
                                <h3 className="title-bar-footer">Legal</h3>
                                <ul className="recent-post-link">
                                    <li>
                                        <link outcome="/terms" value="#{msgs['menu.terms_and_conditions']}"/>
                                    </li>
                                    <li>
                                        <link outcome="/policy" value="#{msgs['menu.privacy_policy']}"/>
                                    </li>
                                    <li>
                                        <link outcome="/rules" value="#{msgs['menu.transaction_rules']}"/>
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
        </footer>*/}
        {/* Footer Area End Here */}
    </div>
);

export default FrontendLayout;