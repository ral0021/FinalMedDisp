import { createCaregiverPatientMatcher as createCaregiverPatientMatcherMutation } from '../graphql/mutations';
import { createCaregiverPatientMatcher } from '../graphql/mutations';

import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
import { listCaregiverPatientMatchers } from '../graphql/queries';



const initialFormState = { patientUsername: '',  caregiverUsername: '' }

const Edit_caregiver_information = () => {

    const [caregiverUsername, setCaregiverUsername] = useState([]);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchCaregiverPatientMatcher();
    }, []);
    async function getUser() {
        // await (await Auth.currentCredentials()).getPromise();
        //  const user = await Auth.currentUserInfo();
        const user = (await Auth.currentSession()).getIdToken().payload;
        console.log("info:", user["cognito:username"]);
    }

    async function fetchCaregiverPatientMatcher() {
        const apiData = await API.graphql({ query: listCaregiverPatientMatchers });
        setCaregiverUsername(apiData.data.listCaregiverPatientMatchers.caregiverUsername);
    }

    async function createCaregiverPatientMatcher() {
        if (!formData.caregiverUsername) return;
        getUser()
        formData.patientUsername = (await Auth.currentSession()).getIdToken().payload["cognito:username"];
        await API.graphql({ query: createCaregiverPatientMatcherMutation, variables: { input: formData }});
        setCaregiverUsername([...caregiverUsername, formData]);
        setFormData(initialFormState);
    }



    return (
       <div>
       		<meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"/>
    
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap" rel="stylesheet"/>
    <title>Edit User Information</title>
 
    <div id="menu-banner" class="row text-center py-3">
        <div class="col">
            <p class="display-5" id="login-title">
                <a href="/">
                    <img id="menu-image" src="https://wchstv.com/resources/media/1f5b2909-ee90-495b-be68-68d26537cbab-large16x9_WVU.png?1518011273124"/>
                </a>
            </p>
        </div>
    </div>
    
    <div class="container-fluid text-center mt-5">
        <div class="container-fluid text-center mt-5">
            
            <form id="login-form" class="justify-content-center">
                <div class="row">
                    <h1 class="display-6">Edit Caregiver Information</h1>
                </div>
                <div class="row justify-content-center my-2">
                            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">
                                <input id="login-username" type="text" class="form-control custom-input" placeholder="Caregiver Username" required onChange={e => setFormData({ ...formData, 'caregiverUsername': e.target.value })} value={formData.caregiverUsername} /> />
                            </div>
                </div>

                <div class="row justify-content-center my-2">
                            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">
                                <input type="submit" class="btn btn-light form-control" onClick={createCaregiverPatientMatcher} />
                </div>
                </div>
                
            </form>
            <div class="row justify-content-center my-2">
                <div class="col-xl-2 col-lg-3 col-12">
                    <button class="menu-button btn btn-dark my-2" onClick={(e) => {
      e.preventDefault();
      window.location.href = '/';



      }}>Main Menu</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
    </div>
    );
}
 
export default Edit_caregiver_information;