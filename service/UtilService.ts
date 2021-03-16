import {ResponseStatus} from "../state";

export const validateEmail = (email:string):boolean => {
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
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
