import {Link, withTranslation, i18n} from "../i18n";
import React from "react";
import classnames from "classnames";
import PropTypes from 'prop-types'

const marginR2Style = {
    marginRight: '2px'
}
interface HeaderState {
    prevScrollpos: number,
    visible: boolean,
    prevDirection: number
}

class Header extends React.Component<{}, HeaderState>{
    constructor(props) {
        super(props);
        this.state = {
            prevScrollpos: window.pageYOffset,
            visible: true,
            prevDirection: window.scrollY
        };
    }
    static propTypes = {
        t: PropTypes.func.isRequired
    }

    static async getInitialProps (){
        return {namespacesRequired: ['common']}
    }

    handleScroll =  (event:Event) => {
        const {prevScrollpos, prevDirection} = this.state;

        if (window.innerWidth > 991) {
            const currentScrollPos = (window.pageYOffset<0)? 0: window.pageYOffset;
            const viewDiff = prevScrollpos - currentScrollPos;
            const direction = (prevDirection > window.scrollY) ? true : false;
            const visible = viewDiff > 0 && viewDiff ? false : viewDiff >= 0;
            console.log("visibile: "+visible+" diff: "+viewDiff+" dire: "+direction);
            this.setState({
                prevScrollpos: currentScrollPos,
                visible: visible
            });
        }
    }

    changeLanguage = (language:string) => {
        i18n.changeLanguage(language);
    }

    // Adds an event listener when the component is mount.
    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }

    // Remove the event listener when the component is unmount.
    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }
    render() {
        return (
            <header>
                <div className="header-area header-fixed header-style-four">
                    <div className="main-menu-area-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-5 col-md-5">
                                            <span style={marginR2Style}>
                                                <img src="/img/ico-tel.png"/>+49 (0) 228 38759255
                                            </span>
                                    <span className="ClearDisplayMobile">
                                                <img src="/img/email-ico.png"/>
                                                <a href="mailto:contact@sicuro.com">contact[at]sicuro.com</a>
                                            </span>
                                </div>
                                <div className="col-lg-7 col-md-4 TextAlignRightMobile TextAlignLeftMobile">
                                    <a href="/index">
                                            Sicuro
                                        </a>

                                        <Link href="/login">
                                            <a>Login</a>
                                        </Link>

                                        <a type='link' onClick={() => this.changeLanguage('it')}>
                                            <img src="/img/it.png"/>
                                        </a> |
                                        <a type='link' onClick={() => this.changeLanguage('en')}>
                                            <img src="/img/en.png"/>
                                        </a> |
                                        <a type='link' onClick={() => this.changeLanguage('es')}>
                                            <img src="/img/es.png"/>
                                        </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classnames("main-menu-area", {"stick": !this.state.visible})}>
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
                                            <ul>
                                                <li className="#{view.viewId eq '/index.xhtml' ? 'menu-justify current' : ''}">
                                                    <a href="/index">{this.props.t('menu-home')}</a>
                                                </li>
                                                <li className="#{ fn:startsWith(view.viewId, '/services') ? 'menu-justify current' : ''}">
                                                    <Link
                                                        href="/services/index"><a>{this.props.t('menu-service')}</a></Link>
                                                    <ul className="rt-dropdown-menu">
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
                                                                href="/services/sellonline"><a>{this.props.t('menu-buyDomainOnline')}</a></Link>
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
                                                </li>
                                                <li className="#{view.viewId eq '/howitworks.xhtml' ? 'menu-justify current' : ''}">
                                                    <Link
                                                        href="/howitworks"><a>{this.props.t('menu-howItWorks')}</a></Link>
                                                </li>
                                                <li className="#{view.viewId eq '/pricesAndFees.xhtml' ? 'menu-justify current' : ''}">
                                                    <Link
                                                        href="/pricesAndFees"><a>{this.props.t('menu-howMuchWillItCost')}</a></Link>
                                                </li>
                                                <li className="#{view.viewId eq '/contact.xhtml' ? 'menu-justify current' : ''}">
                                                    <Link href="/contact">
                                                        <a>{this.props.t('menu-contact')}
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default withTranslation('common')(Header)