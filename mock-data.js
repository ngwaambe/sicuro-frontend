import express from 'express';
import cookie from "cookie";

const expireDate = Date.now() + 2400000
const router = express.Router();

router.post('/auth/check_token', (req, res) => {
    console.log("------> mock -------->"+req.url)
    res.json({
        active: true,
        exp: expireDate
    });
});


router.post('/auth/token', (req, res) => {
    console.log("------ mock --------"+req.url)
    res.json({
        access_token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZ3dhYW1iZUBob3RtYWlsLmNvbSIsImlhdCI6MTYxMTc1Nzc2NCwiZXhwIjoxNjExODQ0MTY0fQ.P1jQlOTpGldq4vBzWlQ2d8yavSWgt1vDLIMHiVbnM2pc876tVWwLOHKzkR5oa2IoITmQft7VBsUh3dZjzL_Rmw',
        token_type: 'bearer',
        expires_in: expireDate,
        scope: 'read write',
    });
});

router.post('/auth/signup', (req, res) =>{
    console.log("1------ mock --------"+req.url)
    setTimeout( () => {
     console.log('----something is not cool here');
     res.status(501).send()
    }, 14000);

});

router.post('/auth/reset_password',(req, res) => {
   res.status(201).send();
});

router.put('/auth/activate_account/', (req, res) => {
    console.log("1------ mock --------"+req.url)
    res.status(404).send()
});


export default router;

