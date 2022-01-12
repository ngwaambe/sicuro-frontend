import {Modal, ModalBody, ModalFooter, ModalHeader} from "./Modal";
import {
  FormControl,
  FormHelperText,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {
  ActionButton,
  StyledFormControls,
  StyledTextField,
  StyledSelectLabel,
  StyledSelect } from "./CustomMaterialUI";
import React, {useState} from "react";
import {Address, Customer, Language, Title} from "../state";
import {useTranslation} from "next-i18next";
import CommonStyles from './common.module.css'
import {updateCustomer, useDispatch} from "../service/Auth.context";
import {updateCustomerAddress} from "../service/customerService";
import {getCountries, isEmpty} from "../service/UtilService";

interface Props {
  onClose: ()=> void,
  onSave:  ()=> void,
  customer:Customer
}

interface LocalProps {
  id: number,
  street: string,
  streetError: boolean,
  streetExtension: string,
  houseNumber: string,
  houseNumberError: boolean,
  postalCode: string,
  postalCodeError: boolean,
  city: string,
  cityError: boolean,
  countryIso: string,
  countryIsoError: boolean
  phoneNumber: string
  phoneNumberError: boolean
}

const EditAdressModal =  (props:Props) => {

  const {t} = useTranslation(['common', 'login'])
  const [, dispatch] = useDispatch()
  const customer = props.customer;
  const {i18n} = useTranslation()
  const countries = getCountries(i18n.language)
  const getInitailAddress = (customer:Customer) => {
    return (customer.address !== null ) ? customer.address : {
      id:0,
      street: '',
      streetExtension: undefined,
      houseNumber:'',
      postalCode:'',
      city:'',
      countryIso:'DE',
      phoneNumber: ''
    }
  }
  const address =  getInitailAddress(customer)

  const [state, setState] = useState<LocalProps>({
    id: address.id,
    street: address.street,
    streetError: false,
    streetExtension: address.streetExtension,
    houseNumber: address.houseNumber,
    houseNumberError: false,
    postalCode: address.postalCode,
    postalCodeError: false,
    city: address.city,
    cityError: false,
    countryIso: address.countryIso,
    countryIsoError: false,
    phoneNumber: address.phoneNumber,
    phoneNumberError: false
  })



  const changeIsValid = () => (isEmpty(state.street)  || isEmpty(state.houseNumber) ||
    isEmpty(state.postalCode) || isEmpty(state.city) ||  isEmpty(state.countryIso) || isEmpty(state.phoneNumber))

  const update = async () => {
    if (changeIsValid()) {
      setState({
        ...state,
        streetError: isEmpty(state.street),
        houseNumberError: isEmpty(state.houseNumber),
        postalCodeError: isEmpty(state.postalCode),
        cityError: isEmpty(state.city),
        countryIsoError: isEmpty(state.countryIso),
        phoneNumberError: isEmpty(state.phoneNumber)
      });
      return;
    }
    const request:Address = {
      id: state.id,
      street: state.street,
      streetExtension: state.streetExtension,
      houseNumber: state.houseNumber,
      postalCode: state.postalCode,
      city: state.city,
      countryIso: state.countryIso,
      phoneNumber: state.phoneNumber
   }

    const result =  await updateCustomerAddress(customer.id, request)
    if (result.success) {
      updateLocalState();
      updateGlobalState;
      props.onSave();
    }
  }

  const updateLocalState = () => setState({
    ...state,
    street: state.street,
    streetExtension: state.streetExtension,
    houseNumber: state.houseNumber,
    postalCode: state.postalCode,
    city: state.city,
    countryIso: state.countryIso,
    phoneNumber: state.phoneNumber
  })

  const updateGlobalState = () => dispatch(updateCustomer({
    ...customer,
    address: {
      ...customer.address,
      id: state.id,
      street:state.street,
      streetExtension:state.streetExtension,
      houseNumber: state.houseNumber,
      city: state.city,
      countryIso: state.countryIso,
      phoneNumber: state.phoneNumber
    },
  }));

  const onChange = (propAttr: string) => (event) => {
    setState({
      ...state,
      [propAttr]: event.target.value
    })
  }

  return (
    <Modal onEsc={props.onClose} >
      <ModalHeader>
        <h3>{t('address-details-edit')}</h3>
        <IconButton
          onClick={props.onClose}
          data-testid="modal-close" >
          <CloseIcon  />
        </IconButton>
      </ModalHeader>
      <ModalBody>
        <FormControl className={CommonStyles.formControl}>
          <StyledTextField
            id="address_street"
            label={t('street')}
            autoFocus={true}
            helperText={state.streetError && t('street_required')}
            type="text"
            fullWidth={true}
            error={state.streetError}
            value={state.street} onChange={onChange("street")}/>

          <StyledTextField
            id="address_house_nr"
            label={t('house_number')}
            autoFocus={false}
            helperText={state.houseNumberError && t('house_number_required')}
            type="text"
            fullWidth={true}
            error={state.houseNumberError}
            value={state.houseNumber} onChange={onChange("houseNumber")}/>

          <StyledTextField
            id="address_street_ext"
            label={t('streetExtension')}
            autoFocus={false}
            type="text"
            fullWidth={true}
            value={state.streetExtension} onChange={onChange("streetExtension")}/>


          <StyledTextField
            id="address_postalcode"
            label={t('postal_code')}
            autoFocus={false}
            helperText={state.postalCodeError && t('postal_code_required')}
            type="text"
            fullWidth={true}
            error={state.postalCodeError}
            value={state.postalCode} onChange={onChange("postalCode")}/>

          <StyledTextField
            id="address_city"
            label={t('city')}
            helperText={state.cityError && t('city_required')}
            autoFocus={false}
            type="text"
            fullWidth={true}
            error={state.cityError}
            value={state.city} onChange={onChange("city")}/>

          <StyledFormControls error={state.countryIsoError}>
            <StyledSelectLabel>{t('common:country')}</StyledSelectLabel>
            <StyledSelect
              MenuProps={{ disableScrollLock: true ,  style: {zIndex: 35001}}}
              labelId="country-label"
              autoFocus={false}
              id="address_country"
              value={state.countryIso.toUpperCase()}
              error={state.countryIsoError}
              onChange={onChange("countryIso")}
              disableUnderline>
              {
                Object.keys(countries).map(
                  (key) => (<MenuItem value={key} key={key}>{countries[key]}</MenuItem>))
              }
            </StyledSelect>
            {state.countryIsoError && <FormHelperText>{t('country_required')}</FormHelperText>}
          </StyledFormControls>

          <StyledTextField
            id="address_phoneNumber"
            label={t('phoneNumber')}
            helperText={state.cityError && t('phoneNumber_required')}
            autoFocus={false}
            type="text"
            fullWidth={true}
            error={state.phoneNumberError}
            value={state.phoneNumber} onChange={onChange("phoneNumber")}/>

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

export default EditAdressModal
