import React from 'react';
import { Auth } from 'aws-amplify';



var re;
const checkForUserType = () => {


    async function getUser() {
        // await (await Auth.currentCredentials()).getPromise();
        //  const user = await Auth.currentUserInfo();
        const user = (await Auth.currentSession().then(token => { return token })).getIdToken().payload;
        console.log("info", user["cognito:username"]);
        return user["cognito:username"];
    }
    Promise.resolve(getUser()).then(function (result) {
        console.log("result:", result);
        re = new String(result);
        console.log("rein", re);
    })
    console.log("reout", re);



    return ({ re });

}
export default checkForUserType;