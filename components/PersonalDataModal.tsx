import {Modal, ModalBody, ModalFooter, ModalHeader} from "./Modal";
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {ActionButton, StyledFormControls, StyledSelect, StyledSelectLabel, StyledTextField} from "./CustomMaterialUI";
import React, {useState} from "react";
import {Customer, Language, Title} from "../state";
import {useTranslation} from "next-i18next";
import CommonStyles from './common.module.css'
import {Notify, updateCustomer, useDispatch} from "../service/Auth.context";
import {updateCustomerPersonalData} from "../service/customerService";
import {languageToString, redirectTo, titleToString} from "../service/common";
import {isEmpty} from "../service/UtilService";

interface Props {
  onClose: ()=> void,
  onSave:  ()=> void,
  customer:Customer
}

interface LocalProps {
  isOrganistion: boolean,
  organisationName?: string,
  organisationNameError: boolean
  taxNumber?: string,
  taxNumberError: boolean,
  title: Title,
  titleError: boolean,
  firstName: string,
  firstNameError: boolean,
  lastName: string,
  lastNameError: boolean,
  language: Language,
  languageError: boolean,
  loading: boolean
}

const EditPersonaData =  (props:Props) => {
  const {t} = useTranslation(['common', 'login'])
  const [, dispatch] = useDispatch()
  const customer = props.customer;
  const checkOrganisation = (customer:Customer):boolean => {
    return ( !(customer.organisation === undefined) && customer.organisation !== null )? true: false;
  }

  const [state, setState] = useState<LocalProps>({
    isOrganistion: checkOrganisation(customer),
    organisationName: customer.organisation,
    organisationNameError: false,
    taxNumber: customer.taxNumber,
    taxNumberError: false,
    title: customer.title,
    titleError: false,
    firstName: customer.firstname,
    firstNameError: false,
    lastName: customer.lastname,
    lastNameError: false,
    language: customer.language,
    languageError:false,
    loading: false
  })

  const changeIsValid = () => {
    return (state.organisationName && (isEmpty(state.taxNumber)) ||
      isEmpty(state.firstName) ||
      isEmpty(state.lastName) ||
      state.language === Language.SELECT ||
      state.title === Title.SELECT);
  }

  const update = async () => {
    if (changeIsValid()) {
      setState({
        ...state,
        titleError: (state.title === Title.SELECT),
        firstNameError: isEmpty(state.firstName),
        lastNameError: isEmpty(state.lastName),
        organisationNameError: (state.isOrganistion && isEmpty(state.organisationName)),
        taxNumberError: (state.isOrganistion && state.taxNumber === ''),
        languageError: (state.language === Language.SELECT)
      });
      return;
    }
    const request = {
      title: titleToString(state.title),
      firstname: state.firstName,
      lastname: state.lastName,
      language: languageToString(state.language),
    }
    if (state.isOrganistion) {
      request['organisation'] = {
        name: state.organisationName,
        taxNumber: state.taxNumber
      }
    }

    try{
      setState({...state, loading: true})
      const result =  await updateCustomerPersonalData(customer.id, request)
      if (result.success) {
        updateLocalState();
        updateGlobalState;
        props.onSave();
      } else {
        if (result.statusCode == 401) {
          //redirect to login
          redirectTo(`/authenticate?redirect${window.location.href}`)
        }
      }
    }catch(error){
      props.onSave();
      dispatch(Notify({message: 'errorText', title: 'ErrorPageHeader'}));
    }

  }

  const updateLocalState = () => setState({
    ...state,
    title: state.title,
    organisationName: state.organisationName,
    taxNumber: state.taxNumber,
    language: state.language,
    firstName: state.firstName,
    lastName: state.lastName
  })

  const updateGlobalState = () => dispatch(updateCustomer({
    ...customer,
    title: state.title,
    organisation: state.organisationName,
    taxNumber: state.taxNumber,
    language: state.language,
    firstname: state.firstName,
    lastname: state.lastName
  }));

  const onChange = (propAttr: string, propErrorAttr: string) => (event) => {
    var isError
    if (propAttr === 'title') {
      isError = (event.target.value !== '' && event.target.value == Title.SELECT)? true: false
    } else if (propAttr === 'language') {
      isError = (event.target.value !== '' && event.target.value == Language.SELECT)? true: false
    } else {
      isError = (event.target.value !== '') ? false : true
    }
    setState({
      ...state,
      [propAttr]: event.target.value,
      [propErrorAttr]: isError,
    })
  }

  return (
    <Modal onEsc={props.onClose} >
      <ModalHeader>
        <h3>{t('person-details-edit-title')}</h3>
        <IconButton
          onClick={props.onClose}
          data-testid="modal-close" >
          <CloseIcon  />
        </IconButton>
      </ModalHeader>
      <ModalBody>
        <FormControl className={CommonStyles.formControl}>
          {state.isOrganistion &&
          <>
              <StyledTextField
                  id="person_organisation"
                  label={t('login:organisation_name_label')}
                  autoFocus={true}
                  helperText={state.organisationNameError && t('login:organisation_name_missing')}
                  type="text"
                  fullWidth={true}
                  disabled={state.loading}
                  error={state.organisationNameError}
                  value={state.organisationName}
                  onChange={onChange("organisationName", "organisationNameError")}/>

              <StyledTextField
                  id="person_taxnumber"
                  label={t('login:taxnumber_label')}
                  autoFocus={true}
                  helperText={state.taxNumberError && t('login:taxnumber_missing')}
                  type="text"
                  fullWidth={true}
                  disabled={state.loading}
                  error={state.taxNumberError}
                  value={state.taxNumber} onChange={onChange("taxNumber", "taxNumberError")}/>
          </>
          }

          <StyledFormControls error={state.titleError}>
            <StyledSelectLabel>{t('common:title')}</StyledSelectLabel>
            <StyledSelect
              MenuProps={{ disableScrollLock: true ,  style: {zIndex: 35001}}}
              labelId="title-label"
              id="person_title"
              value={state.title}
              error={state.titleError}
              disabled={state.loading}
              disableUnderline
              onChange={onChange("title", "titleError")}>
              {Object.values(Title).map(
                (item) => (
                  <MenuItem value={item} key={item.valueOf()}>{t('common:' + item.valueOf())}</MenuItem>)
              )}
            </StyledSelect>
            {state.titleError && <FormHelperText>Error</FormHelperText>}
          </StyledFormControls>

          <StyledTextField
            id="person_firstname"
            label={t('login:firstname_label')}
            autoFocus={true}
            helperText={state.firstNameError && t('login:firstname_missing')}
            type="text"
            fullWidth={true}
            error={state.firstNameError}
            disabled={state.loading}
            value={state.firstName} onChange={onChange("firstName", "firstNameError")}/>

          <StyledTextField
            id="person_lastname"
            label={t('login:lastname_label')}
            autoFocus={true}
            helperText={state.lastNameError && t('login:lastname_missing')}
            type="text"
            fullWidth={true}
            error={state.lastNameError}
            disabled={state.loading}
            value={state.lastName} onChange={onChange("lastName", "lastNameError")}/>

           <StyledFormControls error={state.titleError}>
            <StyledSelectLabel>{t('common:chooseLanguage')}</StyledSelectLabel>
            <StyledSelect
              MenuProps={{ disableScrollLock: true ,  style: {zIndex: 35001}}}
              labelId="language-label"
              id="person_language"
              value={state.language}
              error={state.languageError}
              disabled={state.loading}
              disableUnderline
              onChange={onChange("language", "languageError")}>
              {Object.values(Language).map(
                lang => (
                  <MenuItem value={lang} key={lang.valueOf()}>{t('common:' + lang.valueOf())}</MenuItem>)
              )}
            </StyledSelect>
            {state.languageError && <FormHelperText>Error</FormHelperText>}
          </StyledFormControls>


        </FormControl>
      </ModalBody>
      <ModalFooter divider={true} confirm={true}>
        <ActionButton
          variant="contained"
          color="primary"
          disableElevation={true}
          size="large"
          onClick={update}>
          {state.loading && <CircularProgress color="inherit" size={30} thickness={4}/>}
          {!state.loading && t('save')}
        </ActionButton>
      </ModalFooter>
    </Modal>
  );
};

export default EditPersonaData
