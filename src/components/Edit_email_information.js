import { createUsernameEmailMatcher as createUsernameEmailMatcherMutation } from '../graphql/mutations';
import { deleteUsernameEmailMatcher as deleteUsernameEmailMatcherMutation } from '../graphql/mutations';
import { createUsernameEmailMatcher } from '../graphql/mutations';

import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
import { listUsernameEmailMatchers } from '../graphql/queries';
import { If } from 'react-control-flow-components';



const initialFormState = { patientUsername: '',  patientEmail: '' }
var re;
const Edit_email_information = () => {

    // Get userid
    Promise.resolve(getUser()).then(function(result){
        re= new String(result);
    });

    // Initialize state variables and functions to set them
    const [patientEmail, setPatientEmail] = useState([]);
    const [formData, setFormData] = useState(initialFormState);

    // React Hook to allow the use of state
    useEffect(() => {
        fetchUsernameEmailMatcher();
    }, []);

    // Function to get the userid
    async function getUser() {
        const user = (await Auth.currentSession()).getIdToken().payload;
        return user["cognito:username"];
    }

    // Function to retrieve the UsernameEmailMatchers from the database and set the state variable
    async function fetchUsernameEmailMatcher() {
        const apiData = await API.graphql({ query: listUsernameEmailMatchers });
        setPatientEmail(apiData.data.listUsernameEmailMatchers.items);
    }

    // Function to create a UsernameEmailMatcher and save it in the database
    // Removes any previous entires for the current user
    async function createUsernameEmailMatcher() {
        if (!formData.patientEmail) return;

        formData.patientUsername = (await Auth.currentSession()).getIdToken().payload["cognito:username"];

        // Loop through each UsernameEmailMatcher and remove any that currently exist for the current user
        var Email;
        for (Email in patientEmail){
            var tempEmail = patientEmail.[Email];
            if(re.localeCompare(new String(tempEmail.patientUsername))==0){
                deleteUsernameEmailMatcher(tempEmail);
            }
        }

        await API.graphql({ query: createUsernameEmailMatcherMutation, variables: { input: formData }});
        setPatientEmail([...patientEmail, formData]);
        setFormData(initialFormState);
    }

    // Function to delete a UsernameEmailMatcher and remove it from the state variable
    async function deleteUsernameEmailMatcher({ id }) {
        const newEmailArray = patientEmail.filter(note => note.id !== id);
        setPatientEmail(newEmailArray);
        await API.graphql({ query: deleteUsernameEmailMatcherMutation, variables: { input: { id } }});
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
                <div class="row">
                    <h1 class="display-6">Edit Email Connection for Notifications</h1>
                </div>
                <table class="table table-striped table-bordered table-hover table-responsive">
                    <thead class="table-head">
                        <tr>
                            <th>Current Email</th>
                        </tr>
                    </thead>
                    <tbody class="">

                        {patientEmail.map(item => (
                            
                            <If test={re.localeCompare(new String(item.patientUsername))==0}>
                                <tr>
                                    <td>{item.patientEmail}</td>
                                </tr>
                            </If>

                        ))}

                    </tbody>
                </table>
                <form id="login-form" class="justify-content-center">
                        
                    <div class="row justify-content-center my-2">
                        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">
                            <input id="login-username" type="text" class="form-control custom-input" placeholder="Enter Your Email" required onChange={e => setFormData({ ...formData, 'patientEmail': e.target.value })} value={formData.patientEmail} />
                        </div>
                    </div>

                    <div class="row justify-content-center my-2">
                        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">
                            <input type="submit" class="btn btn-light form-control" onClick={createUsernameEmailMatcher} />
                        </div>
                    </div>

                </form>
                <div class="row justify-content-center my-2">
                    <div class="col-xl-2 col-lg-3 col-12">
                            <button class="menu-button btn btn-light my-2" onClick={(e) => {
                              e.preventDefault();
                              window.location.href='/edit_information';
                            }}>Back to Edit Information</button>
                        </div>
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

export default Edit_email_information;
