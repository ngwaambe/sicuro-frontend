import {Modal, ModalBody, ModalFooter, ModalHeader} from "./Modal";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {ActionButton, StyledFormControls, StyledSelect, StyledSelectLabel, StyledTextField} from "./CustomMaterialUI";
import React, { useState} from "react";
import {useTranslation} from "next-i18next";
import CommonStyles from './common.module.css'
import {BankAccount, PaymentType} from "../state";
import { createPaymentAccount, updatePaymentAccount } from "../service/customerService";
import {getCountries, isEmpty, isNotEmpty } from "../service/UtilService";
import InputMask from 'react-input-mask';
import {isValidBIC, isValidIBAN} from "ibantools";
import {redirectTo} from "../service/common";
import Router from "next/router";


interface Props {
  titleText: string,
  customerId: number,
  onClose: ()=> void,
  onSave:  ()=> void,
  account: BankAccount
}

interface LocalProps {
  id: number,
  owner: string,
  ownerError: boolean,
  bankName: string,
  bankNameError: boolean,
  iban: string,
  ibanError: boolean,
  ibanErrorText: string,
  swiftCode: string,
  swiftCodeError: boolean,
  swiftCodeErrorText: string,
  city: string,
  cityError: boolean,
  postalCode: string,
  postalCodeError: boolean
}

const BankModal =  (props:Props) => {
  const {t} = useTranslation(['common', 'login'])
  const {i18n} = useTranslation()
  const countries = getCountries(i18n.language)
  const [state, setState] = useState<LocalProps>({
    id: props.account.id,
    owner: props.account.owner,
    ownerError: false,
    bankName: props.account.bankName,
    bankNameError: false,
    iban: props.account.iban,
    ibanError: false,
    ibanErrorText: '',
    swiftCode: props.account.swiftCode,
    swiftCodeError: false,
    swiftCodeErrorText: '',
    city: props.account.city,
    cityError: false,
    postalCode: props.account.postalCode,
    postalCodeError: false,
  })

  const isValid = () => (
    isNotEmpty(state.owner ) &&
    isNotEmpty(state.bankName) &&
    isNotEmpty(state.iban) && isValidIBAN(state.iban) &&
    isNotEmpty(state.swiftCode) && isValidBIC( state.swiftCode) &&
    isNotEmpty(state.city) &&
    isNotEmpty(state.postalCode)
  )

  const resolveIbanErrorMessage = () => {
    if (isEmpty(state.iban))
      return 'bankdata-iban-required'
    else if(!isValidIBAN(state.iban))
      return 'bankdata-iban-invalid'
    else
      return ''
  }

  const resolveSwiftBicErrorMessage = () => {
    if (isEmpty(state.iban))
      return 'bankdata-swift-code-required'
    else if (!isValidIBAN(state.iban))
      return 'bankdata-swift-code-invalid'
    else return ''
  }

  const update = async () => {
    if (!isValid()) {
      setState({
        ...state,
        owner: state.owner,
        ownerError: isEmpty(state.owner),
        bankName: state.bankName,
        bankNameError: isEmpty(state.bankName),
        iban: state.iban,
        ibanError: isEmpty(state.iban) || !isValidIBAN(state.iban),
        ibanErrorText: resolveIbanErrorMessage(),
        swiftCode : state.swiftCode,
        swiftCodeError: isEmpty(state.swiftCode) || !isValidBIC( state.swiftCode),
        swiftCodeErrorText: resolveSwiftBicErrorMessage(),
        city: state.city,
        cityError: isEmpty(state.city) ,
        postalCode: state.postalCode,
        postalCodeError: isEmpty(state.postalCode)
      });

      return;
    }

    const request:BankAccount =  {
      id: (state.id !== undefined) ? state.id :undefined,
      paymentType: PaymentType.BANK,
      owner: state.owner,
      bankName: state.bankName,
      iban: state.iban,
      swiftCode: state.swiftCode,
      city: state.city,
      postalCode: state.postalCode,
      countryIso: state.iban.substr(0,2)
    }
    let result;
    if (request.id === undefined)  {
      result = await createPaymentAccount(props.customerId, request)
    } else {
      //put => update
      result = await updatePaymentAccount(props.customerId, request)
    }

    if (result.success) {
      props.onSave();
    } else {
      if(result.statusCode == 401) {
        await Router.push("/authenticate");
      }
      console.log("Error occured")
    }

  }

  const onChange = (propAttr: string) => (event) => {
    const value = (propAttr==='iban') ?  event.target.value.replace(/ /g, '').trim() :  event.target.value
    setState({
      ...state,
      [propAttr]: value,
    })
  }


  return (
    <Modal onEsc={props.onClose} >
      <ModalHeader>
        <h3>{t(props.titleText)}</h3>
        <IconButton
          onClick={props.onClose}
          data-testid="modal-close" >
          <CloseIcon  />
        </IconButton>
      </ModalHeader>
      <ModalBody>
        <FormControl className={CommonStyles.formControl}>

          <StyledTextField
            id="owner"
            label={t('bankdata-owner')}
            autoFocus={true}
            helperText={state.ownerError && t('owner-required')}
            type="text"
            fullWidth={true}
            error={state.ownerError}
            value={state.owner} onChange={onChange("owner")}/>

          <StyledTextField
            id="bank_name"
            label={t('bankdata-bankname')}
            autoFocus={true}
            helperText={state.bankNameError && t('bankdata-bankname-required')}
            type="text"
            fullWidth={true}
            error={state.bankNameError}
            value={state.bankName} onChange={onChange("bankName")}/>

          <InputMask
            mask="aa99 9999 9999 9999 9999 9999 9999 9999 99" {...({maskChar: ''})}
            onChange={onChange('iban')}
            alwaysShowMask={true}
            value={state.iban}>
            {() => <StyledTextField
              id="iban"
              label={t('bankdata-iban')}
              helperText={state.ibanError && t(state.ibanErrorText)}
              name="iban"
              fullWidth={true}
              error={state.ibanError}
            />}
          </InputMask>

          <StyledTextField
            id="swift_bic"
            label={t('bankdata-swift-code')}
            autoFocus={true}
            helperText={state.swiftCodeError && t(state.swiftCodeErrorText)}
            type="text"
            fullWidth={true}
            error={state.swiftCodeError}
            value={state.swiftCode} onChange={onChange("swiftCode")}/>

          <StyledTextField
            id="postalCode"
            label={t('postal_code')}
            autoFocus={true}
            helperText={state.postalCodeError && t('postal_code_required')}
            type="text"
            fullWidth={true}
            error={state.postalCodeError}
            value={state.postalCode} onChange={onChange("postalCode")}/>

          <StyledTextField
            id="city"
            label={t('city')}
            autoFocus={true}
            helperText={state.swiftCodeError && t('city_required')}
            type="text"
            fullWidth={true}
            error={state.cityError}
            value={state.city} onChange={onChange("city")}/>
        </FormControl>
      </ModalBody>
      <ModalFooter divider={true} confirm={true}>
        <ActionButton
          variant="contained"
          color="primary"
          disableElevation={true}
          size="large"
          onClick={update}>
          {t('save')}
        </ActionButton>
      </ModalFooter>
    </Modal>
  );
};

export default BankModal
