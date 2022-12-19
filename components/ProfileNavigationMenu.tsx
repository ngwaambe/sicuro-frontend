import {Card, CardContent, CardHeader, MenuItem, MenuList} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import {Customer} from "../state";
import Link from "next/link";
import Router from 'next/router';
import {useTranslation} from "next-i18next";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {deepOrange} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    fontSize:'1.15rem',
    fontWeight:800,
    width: '48px',
    height: '48px'
  }

}));

interface Props{
   customer:Customer
}

const ProfileNaviagtionMenu = ({customer}) => {
  const classes = useStyles()
  const {t} = useTranslation('common')

  const formatName = ():string => {
    return `${t(customer.title)} ${customer.firstname} ${customer.lastname}`
  }

  const navigateToProfile = () => {
    Router.push("/profile")
  }

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.orange}>
            {customer.lastname.trim().charAt(0)}{customer.firstname.trim().charAt(0)}
          </Avatar>
        }
        title={formatName()}/>
      <CardContent>
        <MenuList>
          <MenuItem onClick={ () => {Router.push("/profile")}}>My Sicuro</MenuItem>
          <MenuItem onClick={ () => {Router.push("/profile")}}>{t('StartTransaction')}</MenuItem>
          <MenuItem onClick={ () => {Router.push("/profile/account")}}>{t('UserAccount')}</MenuItem>
          <MenuItem onClick={ () => {Router.push("/profile/account")}}>{t('MyTransactions')}</MenuItem>
          <MenuItem onClick={ () => {Router.push("/profile/account")}}>{t('PaymentDocumentation')}</MenuItem>
        </MenuList>
      </CardContent>
    </Card>
  )
}

export default ProfileNaviagtionMenu;
