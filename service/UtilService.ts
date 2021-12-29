import {ResponseStatus} from "../state";
var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/it.json"));
countries.registerLocale(require("i18n-iso-countries/langs/es.json"));

export const isValidEmail = (email:string):boolean => {
  var pattern = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  if (!pattern.test(email)){
    return false;
  }
  return true;
}

export const defaultSuccessResponse = (data:unknown): ResponseStatus =>({success: true});
export const defaultFailedResponsse = (data:unknown): ResponseStatus =>({success: false});

export const  getEnumKey = <T extends string, EnumValue extends string>( enumVariable:{ [key in T]: EnumValue}, value:EnumValue): string => {
  return  Object.entries(enumVariable).filter(t => t[1] === value).map(t =>t[0])[0]
}

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getCountries = (locale: string):Map<string,string> =>{
  return countries.getNames(locale, {select: "official"})
}

export const getCountry = (countryIso: string, locale:string):string => {
  return countries.getName(countryIso, locale)
}

export const isNotEmpty = (value : string ): boolean => (value !== undefined && value.trim() !== '')
export const isEmpty = (value: string): boolean => !isNotEmpty(value)
