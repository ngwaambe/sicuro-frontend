import {Modal, ModalBody, ModalFooter, ModalHeader} from "./Modal";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {ActionButton, StyledFormControls, StyledTextField} from "./CustomMaterialUI";
import React, {useState} from "react";
import {Customer, Language, Title} from "../state";
import {useTranslation} from "next-i18next";
import CommonStyles from './common.module.css'
import {updateCustomer, useDispatch} from "../service/Auth.context";
import {validateEmail} from "../service/UtilService";

interface Props {
  onClose: ()=> void,
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
  languageError: boolean
}

const EditPersonaData = (props:Props) => {
  const {t} = useTranslation(['common', 'login'])
  const [state, dispatch] = useDispatch()
  const customer = state.customer;
  const [localState, setLocalState] = useState<LocalProps>({
    isOrganistion: ( (customer.organisation !== undefined) && (customer.organisation.trim().length >0))? true: false,
    organisationName: customer.organisation,
    organisationNameError: false,
    taxNumber: customer.taxNumber,
    taxNumberError: false,
    title: customer.title,
    titleError: false,
    firstName: customer.firstName,
    firstNameError: false,
    lastName: customer.lastName,
    lastNameError: false,
    language: customer.preferedLanguage,
    languageError:false
  })
  const update = () => {
    if (localState.organisationName && (localState.taxNumber === null || localState.taxNumber.length === 0) ||
      localState.firstName === '' ||
      localState.lastName === '' ||
      localState.language === Language.SELECT ||
      localState.title === Title.SELECT) {
      setLocalState({
        ...localState,
        titleError: (localState.title === Title.SELECT),
        firstNameError: (localState.firstName === ''),
        lastNameError: (localState.lastName === ''),
        organisationNameError: (localState.isOrganistion && localState.organisationName === ''),
        taxNumberError: (localState.isOrganistion && localState.taxNumber === ''),
        languageError: (localState.language === Language.SELECT)
      });
      return;
    }
    dispatch(updateCustomer( {
        ...customer,
        title: localState.title,
        organisationName: localState.organisationName,
        taxNumber: localState.taxNumber
      }));
    props.onClose();
  }

  const onChange = (propAttr: string, propErrorAttr: string) => (event) => {
    var isError
    if (propAttr === 'title') {
      isError = (event.target.value !== '' && event.target.value == Title.SELECT)? true: false
    } else if (propAttr === 'language') {
      isError = (event.target.value !== '' && event.target.value == Language.SELECT)? true: false
    } else {
      isError = (event.target.value !== '') ? false : true
    }
    setLocalState({
      ...localState,
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
          {localState.isOrganistion &&
          <>
              <StyledTextField
                  id="person_organisation"
                  label={t('login:organisation_name_label')}
                  autoFocus={true}
                  helperText={localState.organisationNameError && t('login:organisation_name_missing')}
                  type="text"
                  fullWidth={true}
                  error={localState.organisationNameError}
                  value={localState.organisationName}
                  onChange={onChange("organisationName", "organisationNameError")}/>

              <StyledTextField
                  id="person_taxnumber"
                  label={t('login:taxnumber_label')}
                  autoFocus={true}
                  helperText={localState.taxNumberError && t('login:taxnumber_missing')}
                  type="text"
                  fullWidth={true}
                  error={localState.taxNumberError}
                  value={localState.taxNumber} onChange={onChange("taxNumber", "taxNumberError")}/>
          </>
          }

          <StyledFormControls error={localState.titleError}>
            <InputLabel>{t('common:title')}</InputLabel>
            <Select
              MenuProps={{ disableScrollLock: true ,  style: {zIndex: 35001}}}
              labelId="title-label"
              id="person_title"
              value={localState.title}
              error={localState.titleError}
              onChange={onChange("title", "titleError")}>
              {Object.values(Title).map(
                (item) => (
                  <MenuItem value={item} key={item.valueOf()}>{t('common:' + item.valueOf())}</MenuItem>)
              )}
            </Select>
            {localState.titleError && <FormHelperText>Error</FormHelperText>}
          </StyledFormControls>

          <StyledTextField
            id="person_firstname"
            label={t('login:firstname_label')}
            autoFocus={true}
            helperText={localState.firstNameError && t('login:firstname_missing')}
            type="text"
            fullWidth={true}
            error={localState.firstNameError}
            value={localState.firstName} onChange={onChange("firstName", "firstNameError")}/>

          <StyledTextField
            id="person_lastname"
            label={t('login:lastname_label')}
            autoFocus={true}
            helperText={localState.lastNameError && t('login:lastname_missing')}
            type="text"
            fullWidth={true}
            error={localState.lastNameError}
            value={localState.lastName} onChange={onChange("lastName", "lastNameError")}/>

          <StyledFormControls error={localState.titleError}>
            <InputLabel>{t('common:chooseLanguage')}</InputLabel>
            <Select
              MenuProps={{ disableScrollLock: true ,  style: {zIndex: 35001}}}
              labelId="language-label"
              id="person_language"
              value={localState.language}
              error={localState.languageError}
              onChange={onChange("language", "languageError")}>
              {Object.values(Language).map(
                lang => (
                  <MenuItem value={lang} key={lang.valueOf()}>{t('common:' + lang.valueOf())}</MenuItem>)
              )}
            </Select>
            {localState.languageError && <FormHelperText>Error</FormHelperText>}
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
          {t('save')}
        </ActionButton>
      </ModalFooter>
    </Modal>
  )
};

export default EditPersonaData;
