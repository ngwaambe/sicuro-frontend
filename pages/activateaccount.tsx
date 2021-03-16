import React, {useState} from "react";
import LoginLayout from "../components/layouts/LoginLayout";
import {NextPageContext} from "next";
import {activateAccount} from "../service/createAccount";
import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

enum Step{
  SUCCESS,
  FAILED
}
interface LocalState {
  step: Step;
}
const Activateaccount = (props) => {
  const [state, setState] = useState<LocalState>({
      step: props.step
  })


  return (
    <React.Fragment>
      <div className="s-space-login">
        {state.step === Step.SUCCESS &&
        <>
            <div>SUCCESSS</div>
        </>
        }
        {state.step === Step.FAILED &&
        <>
            <div>FAILURE</div>
        </>
        }
      </div>
    </React.Fragment>
  )
}

export const getServerSideProps = async(context)=>{
  console.log(context.query)
  const  code = context.query.code
  if (code !== undefined) {
    const result = await activateAccount(code as string)
    console.log(result.success)
    return {props:{...await serverSideTranslations(context.locale, ["home", "common","slider"]), step:(result.success)?Step.SUCCESS : Step.FAILED}}
  }
  return {props:{...await serverSideTranslations(context.locale, ["home", "common","slider"]), step:Step.SUCCESS}}
}

Activateaccount.layout = LoginLayout

export default Activateaccount
