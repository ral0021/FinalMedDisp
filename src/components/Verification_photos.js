import React, { useState, useEffect } from 'react';
import { listVerifications } from '../graphql/queries';
// import { createMedication as createMedicationMutation, deleteMedication as deleteMedicationMutation } from '../graphql/mutations';
import { Case, ForEach, If, Switch } from 'react-control-flow-components';


import { API } from 'aws-amplify';
import { Storage } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const initialFormState = { name: '', quantity: '', refill: '' }
var re;

const Verification_photos = () => {

    const [verifications, setVerifications] = useState([]);


    Promise.resolve(getUser()).then(function (result) {
        console.log("result:", result);
        re = new String(result);
        console.log("rein", re);
    })
    console.log("reout", re);

    // console.log(Promise.resolve(getUser()).then(function(result)));

    useEffect(() => {
        fetchVerifications();
    }, []);

    async function getUser() {
        // await (await Auth.currentCredentials()).getPromise();
        //  const user = await Auth.currentUserInfo();
        const user = (await Auth.currentSession().then(token => { return token })).getIdToken().payload;
        console.log("info", user["cognito:username"]);
        return user["cognito:username"];
    }

    async function fetchVerifications() {
        const apiData = await API.graphql({ query: listVerifications });
        console.log("apiData: ", apiData);
        const verificationsFromAPI = apiData.data.listVerifications.items;
        console.log("verificationsFromAPI: ", verificationsFromAPI);
        await Promise.all(verificationsFromAPI.map(async verification => {

            console.log("verification.image: ", verification.image);

            const image = await Storage.get(verification.image);
            console.log("image ", image);
            verification.image = image;
            console.log("after verification.image: ", verification.image);
            return verification;
        }))
        setVerifications(apiData.data.listVerifications.items);
    }

    // async function createMedication() {
    //   if (!formData.name || !formData.quantity || !formData.refill) return;
    //   getUser()
    //   formData.userid = (await Auth.currentSession()).getIdToken().payload["cognito:username"];
    //   await API.graphql({ query: createMedicationMutation, variables: { input: formData } });
    //   setMedications([ ...medications, formData ]);
    //   setFormData(initialFormState);
    // }

    // async function deleteMedication({ id }) {
    //   const newMedicationsArray = medications.filter(note => note.id !== id);
    //   setMedications(newMedicationsArray);
    //   await API.graphql({ query: deleteMedicationMutation, variables: { input: { id } }});
    // }
    return (
        <div>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous" />

            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap" rel="stylesheet" />


            <title>Verification Photos</title>

            <div id="menu-banner" class="row text-center py-3">
                <div class="col">
                    <p class="display-5" id="login-title">
                        <a href="/">
                            <img id="menu-image" src="https://wchstv.com/resources/media/1f5b2909-ee90-495b-be68-68d26537cbab-large16x9_WVU.png?1518011273124" />
                        </a>
                    </p>
                </div>
            </div>

            <div class="container-fluid text-center mt-5">
                <div class="row justify-content-center my-5 ">
                    <h1 class="display-6 mb-5">Verification Photos</h1>
                    <div class="container">
                        {verifications.map(item => (


                            <If test={re.localeCompare(new String(item.userid)) == 0}>
                                <div class="row">
                                    <div class="col">
                                        {item.image && <img id="menu-image" src={item.image} />}
                                    </div>
                                    <div class="col">
                                        <div class="card">
                                            <div class="card-header">{item.title}</div>
                                            <p class="text-center">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </If>

                        ))}

                    </div>
                </div>

                <div class="row justify-content-center pb-5">
                    <div class="col-xl-2 col-lg-3 col-12">
                        <button class="menu-button btn btn-light my-2" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/consumption_history';
                        }}>Back To Consumption History</button>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-12">
                        <button class="menu-button btn btn-dark my-2" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/';
                        }}>Main Menu</button>
                    </div>
                </div>


            </div>


            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
        </div>
    );
}

export default Verification_photos;