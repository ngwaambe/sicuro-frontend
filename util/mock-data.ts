import express from 'express';
import {parseCookies} from "../service/common";
import {v4 as uuidv4} from 'uuid';
import {CompleteSignupRequest, Customer} from "../state";

const memCache = require('memory-cache');

const DIFF = 900000
const MEM: any = {expireDate: Date.now() + DIFF}
const router = express.Router();
const Action = {
  tempPwd: false,
  completeRegistration: false
}
router.use(express.json());

export const address: any = {
  id: 123121,
  street: "Auf der Neide",
  houseNumber: "14",
  streetExtension: undefined,
  postalCode: "53424",
  city: "Remagen",
  region: "Rheinlandpflaz",
  countryIso: "de",
  phoneNumber: "12313545422"
}

export const customer: any = {
  id: 1,
  customerNumber: "2132132",
  title: "Mr",
  firstname: "Müller",
  lastname: "Wolwgang",
  gender: "Male",
  email: "ngwaambe@hotmail.com",
  language: "en",
  applyVat: false,
  organisation:"Sicuro GmbH",
  address: address,
  taxNumber:"321321321",
  identityNumber: "2132132132321"
}

export const paymentAccounts: any = [
  {
    id: 1,
    paymentType: "PAYPAL",
    owner: "Ngwa Ambe ELvis",
    paypalAccount: "e.test@paypal.com"
  },
  {
    id: 2,
    paymentType: "PAYPAL",
    owner: "Ngwa Rogers",
    paypalAccount: "e.test2@paypal.com"
  },
]

  //export const paymentAccounts: any = []

router.post('/auth/check_token', (req, res) => {
  console.log("------> mock -------->" + req.url + "<mem>" + MEM.expireDate + "<mem>")
  return res.json({
    active: memCache.get(req.body.token) !== null,
    orphanedToken: memCache.get(req.body.token) === null,
    tempPwd: Action.tempPwd,
    completeRegistration: Action.completeRegistration,
    customerId: 1
  })
});

router.post('/api/auth/refresh_token', (req, res) => {
  console.log("------> mock -------->" + req.url + "<mem>" + MEM.expireDate + "<mem>")
  return res.json({
    "access_token": "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NDI5NjA3OTAsInN1YiI6Im5nd2FhbWJlQGdtYWlsLmNvbSIsImV4cCI6MTY0Mjk2MTY5MCwiY3VzdG9tZXJJZCI6MSwidGVtcFB3ZCI6ZmFsc2UsImhhc1NlY3VyaXR5UXVlc3Rpb24iOnRydWV9.tpmWc8Ghn5fld4D05TpSzWtyHahfq0SIaAI8b4pbmqRgbQySdTJHlTE4xoGvZBTfC-Zf-cwZQ4tpO44sW_x1kQ",
    "expires_in": 1624683325,
    "type": "JWT",
    "refresh_token": "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NDI5NjA3OTAsInN1YiI6Im5nd2FhbWJlQGdtYWlsLmNvbSIsImV4cCI6MTY0Mjk2MTA5MCwiY3VzdG9tZXJJZCI6MSwidGVtcFB3ZCI6ZmFsc2UsImhhc1NlY3VyaXR5UXVlc3Rpb24iOnRydWV9.tpMGZ-ib4EJ9zQflVxzrNIzwe0l8ZD__UQhabBM_dkvjtfqj_Qwf8Zvfj4jh_F4lvTR5o7fBZLSq7soUXjiT0Q"
  })
});

router.post('/auth/token', (req, res) => {
  console.log("------ mock --------" + JSON.stringify(req.body))
  const sessionId = uuidv4()
  var data = {
    "access_token": "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NDI5NjA3OTAsInN1YiI6Im5nd2FhbWJlQGdtYWlsLmNvbSIsImV4cCI6MTY0Mjk2MTY5MCwiY3VzdG9tZXJJZCI6MSwidGVtcFB3ZCI6ZmFsc2UsImhhc1NlY3VyaXR5UXVlc3Rpb24iOnRydWV9.tpmWc8Ghn5fld4D05TpSzWtyHahfq0SIaAI8b4pbmqRgbQySdTJHlTE4xoGvZBTfC-Zf-cwZQ4tpO44sW_x1kQ",
    "expires_in": 1624683325,
    "type": "JWT",
    "refresh_token": "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NDI5NjA3OTAsInN1YiI6Im5nd2FhbWJlQGdtYWlsLmNvbSIsImV4cCI6MTY0Mjk2MTA5MCwiY3VzdG9tZXJJZCI6MSwidGVtcFB3ZCI6ZmFsc2UsImhhc1NlY3VyaXR5UXVlc3Rpb24iOnRydWV9.tpMGZ-ib4EJ9zQflVxzrNIzwe0l8ZD__UQhabBM_dkvjtfqj_Qwf8Zvfj4jh_F4lvTR5o7fBZLSq7soUXjiT0Q"
  };
  memCache.put(sessionId, data);
  //console.log("-setting-payload:" + JSON.stringify(memCache.get(sessionId)) + " token:" + sessionId)
  res.cookie("token", sessionId, {
    httpOnly: true,
    maxAge: 3600 * 1000,
    sameSite: "strict",
    path: "/",
  });

  res.status(200).json({
    active: true,
    orphanedToken:false,
    tempPwd: false,
    hasSecurityQuestion: true,
    customerId: 1
  })
  setTimeout(() => {
      res.status(200).json({
          active: true,
          orphanedToken: false,
          tempPwd: false,
          hasSecurityQuestion: true,
          customerId: 1
        }
      );
    },
    1000)
});

router.post('/auth/signup', (req, res) => {
  console.log("1------ mock --------" + req.url)
  setTimeout(() => {
    console.log('----something is not cool here');
    res.status(409).send()
  }, 200);
});

router.put('/auth/complete_signup', (req, res) => {
  console.log("1------ mock --------" + req.url)
  setTimeout(() => {
    console.log('----something is not cool here'+JSON.stringify(req.body));
    Action.completeRegistration = false
    address.street = req.body.address.street
    address.streetExtension = req.body.address.streetExtension
    address.houseNumber  = req.body.address.houseNumber
    address.city = req.body.address.city
    address.postalCode = req.body.address.postalCode
    address.countryIso  = req.body.address.countryIso
    address.phoneNumber = req.body.address.phoneNumber
    customer.address = address
    res.status(200).send()
  }, 200);
});

router.post('/auth/init_reset_password', (req, res) => {
  console.log("2#####------ mock --------" + req.url)
  setTimeout( () => { res.status(500).send(); }, 2500)
});

router.post('/auth/reset_password', (req, res) => {
  console.log("2#####------ mock --------" + req.url)
  if (req.body.questionAnswer === 'angela') {
    setTimeout( () => { res.status(200).send(); }, 2500)
  } else {
    setTimeout( () => { res.status(409).send(); }, 2500)
  }
});

router.get('/auth/reset_password/:resetPasswordId', (req, res) => {
  console.log("3#####------ mock --------" + req.url)
  setTimeout( () => {
    res.status(200).json({question: 'GRAND_MOTHERS_MAIDEN_NAME', activationId:req.params.resetPasswordId})
  }, 100)
});

router.get('/auth/activate_account/:activationCode', (req, res) => {
  console.log("3#####------ mock --------" + req.url)
  res.status(404).send()
});

router.get("/customers/:customerId", (req, res) => {
  console.log("2------ mock --------" + req.url)

  setTimeout(() => {
    res.json(customer)
  }, 2);
})

router.put("/customers/:customerId", (req, res) => {
  console.log("1------ mock --------" + req.url + " <" + JSON.stringify(req.body) + ">")
  // var data = JSON.parse(req.body);
  customer.firstname = req.body.firstname
  customer.lastname = req.body.lastname
  customer.title = req.body.title
  customer.organisation = req.body.organisation.name
  customer.taxNumber = req.body.organisation.taxNumber
  customer.language = req.body.language
  setTimeout(() => {
    res.status(200).json(customer)
  }, 2000);
})

router.put("/customers/:customerId/address", (req, res) => {
  console.log("1------ mock --------" + req.url + " <" + JSON.stringify(req.body) + ">")
  // var data = JSON.parse(req.body);
  if (customer.address != undefined) {
    customer.address.street = req.body.street
    customer.address.streetExtension = req.body.streetExtension
    customer.address.houseNumber = req.body.houseNumber
    customer.address.city = req.body.city
    customer.address.postalCode = req.body.postalCode
    customer.address.countryIso = req.body.countryIso
  } else {
    customer.address = req.body
  }
  setTimeout(() => {
    res.status(200).json(customer)
  }, 1500);
})

router.put("/customers/:customerId/change_email", (req, res) => {
  console.log("1------ mock --------" + req.url + " <" + JSON.stringify(req.body) + ">")
  customer.email = req.body.email
  setTimeout(() => {
    res.status(500).send();
  }, 2000)
})

router.put("/customers/:customerId/change_password", (req, res) => {
  console.log("1------ mock --------" + req.url + " <" + JSON.stringify(req.body) + ">")
  setTimeout(() => {
    Action.tempPwd = false;
    res.status(500).send();
  }, 2000)
})

router.get("/customers/:customerId/payment_accounts", (req, res) => {
  setTimeout(() => {
    res.status(200).json(paymentAccounts);
  }, 2)
})

router.post("/customers/:customerId/paypal_accounts",  ( req, res ) => {
  const account = req.body
  account.id = paymentAccounts.length + 1
  paymentAccounts.push(account)
  console.log(JSON.stringify(paymentAccounts))
  setTimeout(() => {
    res.status(200).send();
  }, 2000)
});

router.put("/customers/:customerId/paypal_accounts/:paypalId",  ( req, res ) => {
  const index = paymentAccounts.findIndex(it => it.id === req.body.id)
  paymentAccounts[index] = req.body
  console.log(JSON.stringify(paymentAccounts))
  setTimeout(() => {
    res.status(200).send();
  }, 2000)
});

router.post("/customers/:customerId/payment_accounts",  ( req, res ) => {
  const account = req.body
  account.id = paymentAccounts.length + 1
  paymentAccounts.push(account)
  console.log(JSON.stringify(paymentAccounts))
  setTimeout(() => {
    res.status(200).send();
  }, 2)
});

router.put("/customers/:customerId/payment_accounts",  ( req, res ) => {
  const index = paymentAccounts.findIndex(it => it.id === req.body.id)
  paymentAccounts[index] = req.body
  console.log(JSON.stringify(paymentAccounts))
  setTimeout(() => {
    res.status(200).send();
  }, 2000)
});

router.delete("/customers/:customerId/payment_accounts/:paymentAccountId",  ( req, res ) => {
  const index = paymentAccounts.findIndex(it => it.id === parseInt(req.params.paymentAccountId))
  console.log("<<<"+index+">>><<<"+req.params.paymentAccountId+">>")
  if (index !== -1) {
    paymentAccounts.splice(index, 1)
  }
  console.log("<<"+JSON.stringify(paymentAccounts)+">>")
  setTimeout(() => {
    res.status(200).send();
  }, 2000)
});


export default router;

