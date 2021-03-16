import React, {Fragment} from 'react'


const ErrorPage = (props) => {
   return (
      <Fragment>
          <p>
              <span>{props.statusCode}</span>
              <span>{props.message}</span>
          </p>)
      </Fragment>
    )
}
ErrorPage.getInitialProps = async ({ res, err }) => {
    let statusCode = null
    let message = null
    if (res) {
        ({ statusCode , message} = res)
    } else if (err) {
        ({ statusCode , message} = err)
    }
    return {
        namespacesRequired: ['common'],
        statusCode, message
    }
}


export default ErrorPage
