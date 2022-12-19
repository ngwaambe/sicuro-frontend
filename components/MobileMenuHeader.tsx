import React, {useEffect, useRef} from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone';
import Link from "next/link";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {useTranslation} from "next-i18next";
import styles from "./MobileMenuHeader.module.css"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MobileMenuHeader = () => {
  const {t} = useTranslation('common')
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const auth = true;

  const navRef = useRef()
  const innerNavRef = useRef()
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose= () => {
    setAnchorEl(null);
  };

  const ToggleButton = () => {
    if (navRef !== undefined && innerNavRef !== undefined){
      navRef.current.classList.toggle(styles.navOpen);
      innerNavRef.current.classList.toggle(styles.open);
    }
  };

  return (
     <div className="mobile-menu-area">
         <AppBar position="static" >
            <Toolbar>
              <div ref={navRef} className={styles.overlay}>
                {auth && (
                  <div>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem >Profile</MenuItem>
                      <MenuItem >My account</MenuItem>
                    </Menu>
                  </div>
                )}
                <div ref={innerNavRef} className={styles.App} onClick={ToggleButton}>
                  <span/>
                  <span />
                  <span />
                </div>
                <div><a onClick={ToggleButton}><MenuTwoToneIcon/></a></div>
                <nav className={styles.overlayContent}>
                  <div>
                    <Link href="/index"><a>Home</a></Link>
                    <a  href="#skills">Skills</a>
                    <a  href="#work">Work</a>
                    <a  href="#about">About</a>
                    <a  href="#contact">Contact</a>
                  </div>
                </nav>
              </div>
              <Typography variant="h6" className={classes.title}>
                Sicuro
              </Typography>
            </Toolbar>
          </AppBar>
      </div>
  )
}
export default MobileMenuHeader
