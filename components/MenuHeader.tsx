import {default as BaseLink} from 'next/link';
import React, { useState, useEffect } from "react";
import classnames from "classnames";
import PropTypes from 'prop-types'
import {useTranslation} from "next-i18next";
import Link from "next/link";

const MenuHeader = () => {
  const {t} = useTranslation('common')
  const [scrollPosition, setScrollposition] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  },[scrollPosition]);

  const handleScroll = () => {
    if (window.innerWidth > 991) {
      const currentScrollPos = ((window).pageYOffset<0)? 0: (window).pageYOffset;
      const currentVisible = currentScrollPos <= 18 || scrollPosition<=15;
      setScrollposition(currentScrollPos);
      setVisible(currentVisible);
    }
  }

  return (
    <div className={classnames("main-menu-area", {"stick": !visible})}>
      <div className="container">
        <div className="row no-gutters d-flex align-items-center">
          <div className="col-lg-3 col-md-3">
            <div className="logo-area">
              <BaseLink href="/">
                <img src="/img/logo.png" alt="logo"/>
              </BaseLink>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 possition-static" id="main-nav-wrap">
            <div className="elv-main-menu">
              <nav id="main-nav">
                <ul>
                  <li className="#{view.viewId eq '/index.xhtml' ? 'menu-justify current' : ''}">
                    <Link href="/"><a>{t('menu-home')}</a></Link>
                  </li>
                  <li className="#{ fn:startsWith(view.viewId, '/services') ? 'menu-justify current' : ''}">
                    <Link href="/services"><a>{t('menu-service')}</a></Link>
                    <ul className="rt-dropdown-menu">
                      <li>
                        <Link
                          href="/services/transfer"><a>{t('menu-secureDomainTransfer')}</a></Link>
                      </li>
                      <li>
                        <Link
                          href="/services/sellonline"><a>{t('menu-sellDomainOnline')}</a></Link>
                      </li>
                      <li>
                        <Link
                          href="/services/buyonline"><a>{t('menu-buyDomainOnline')}</a></Link>
                      </li>
                      <li>
                        <Link
                          href="/services/buynowlink"><a>{t('menu-buyNowLink')}</a></Link>
                      </li>
                      <li>
                        <Link
                          href="/services/broker"><a>{t('menu-broker')}</a></Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link href="/howitworks"><a>{t('menu-howItWorks')}</a></Link>
                  </li>
                  <li>
                    <Link href="/pricesandfees"><a>{t('menu-howMuchWillItCost')}</a></Link>
                  </li>
                  <li>
                    <Link href="/contact"><a>{t('menu-contact')}</a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
/*
MenuHeader.propTypes = {
  t: PropTypes.func.isRequired,
}

MenuHeader.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})
*/

export default MenuHeader
