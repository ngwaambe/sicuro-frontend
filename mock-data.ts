import express from 'express';
import {parseCookies} from "./service/common";
import { v4 as uuidv4 } from 'uuid';
const memCache = require('memory-cache');

const DIFF = 900000
const MEM: any = {expireDate: Date.now() + DIFF}
const router = express.Router();

export const address: any = {
    id: 123121,
    street: "Auf der Neide",
    houseNumber: "14",
    streetExtension: null,
    postalCode: "53424",
    city: "Remagen",
    region: "Rheinlandpflaz",
    countryIso: "de",
    phoneNumber: "12313545422"
}
export const customer: any = {
    id:21321,
    customerNumber:"2132132",
    title:"Mr",
    firstName:"Müller",
    lastName:"Wolwgang",
    gender:"Male",
    email:"ngwaambe@hotmail.com",
    language:"en",
    applyVat:false,
    organisation:"",
    address: address,
    taxNumber:"",
    identityNumber:"2132132132321"
}

router.post('/auth/check_token', (req, res) => {
    console.log("------> mock -------->"+req.url+"<mem>"+MEM.expireDate+"<mem>")
    const cookies = parseCookies(req);
    if(memCache.get(cookies.token)) {
        memCache.put(cookies.token, memCache.get(cookies.token), 5)
        return res.json({active:true, exp:5})
    } else {
        if (MEM.expireDate <= Date.now())
            MEM.expireDate = Date.now() + DIFF;
        res.json({
            active: true,
            exp: MEM.expireDate
        });
    }
});


router.post('/auth/token', (req, res) => {
    console.log("------ mock --------"+req.url)
    const sessionId = uuidv4()
    var data = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZ3dhYW1iZUBob3RtYWlsLmNvbSIsImlhdCI6MTYxMTc1Nzc2NCwiZXhwIjoxNjExODQ0MTY0fQ.P1jQlOTpGldq4vBzWlQ2d8yavSWgt1vDLIMHiVbnM2pc876tVWwLOHKzkR5oa2IoITmQft7VBsUh3dZjzL_Rmw";
    memCache.put( sessionId, data, 25300000);
    res.cookie("token",sessionId,{
        httpOnly: true,
        maxAge: 3600 * 1000,
        sameSite: "strict",
        path: "/",
    });
    res.json({loggedIn:true});
});

router.post('/auth/signup', (req, res) =>{
    console.log("1------ mock --------"+req.url)
    setTimeout( () => {
     console.log('----something is not cool here');
     res.status(501).send()
    }, 1000);

});

router.post('/auth/reset_password',(req, res) => {
   res.status(201).send();
});

router.put('/auth/activate_account/', (req, res) => {
    console.log("1------ mock --------"+req.url)
    res.status(404).send()
});

router.get("/customer/:customerId", (req, res) => {
    console.log("1------ mock --------"+req.url)
    setTimeout( () => {
        res.json(customer)
    }, 1000);
})



export default router;

