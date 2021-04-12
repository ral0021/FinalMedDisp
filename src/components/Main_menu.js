import React, { useState, useEffect } from 'react';
import { listTimeSlotss } from '../graphql/queries';
import { createTimeSlots as createTimeSlotsMutation } from '../graphql/mutations';
import { deleteTimeSlots as deleteTimeSlotsMutation } from '../graphql/mutations';
import { If } from 'react-control-flow-components';

import { API, Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const initialFormState = { slot1: '', slot2: '', slot3: '', userid: '' };
var re;

const Home = () => {
    Promise.resolve(getUser()).then(function (result) {
        re = new String(result);
    });

    const [timeSlotss, setTimeSlots] = useState([]);
    const [formData, setFormData] = useState(initialFormState);


    useEffect(() => {
        fetchTimeSlots();
    }, []);

    async function getUser() {
        // await (await Auth.currentCredentials()).getPromise();
        //  const user = await Auth.currentUserInfo();
        const user = (await Auth.currentSession().then(token => { return token })).getIdToken().payload;
        return user["cognito:username"];
    }

    async function fetchTimeSlots() {
        const apiData = await API.graphql({ query: listTimeSlotss });
        setTimeSlots(apiData.data.listTimeSlotss.items);
    }

    async function createTimeSlots() {
        if (!formData.slot1 || !formData.slot2 || !formData.slot3) return;
        getUser()
        formData.userid = (await Auth.currentSession()).getIdToken().payload["cognito:username"];
        var timeSlots;
        console.log("timeSlotss: ", typeof timeSlotss);
        for (timeSlots in timeSlotss) {
            var tempTimeSlots = timeSlotss.[timeSlots];
            console.log("loop: ", tempTimeSlots);
            if (re.localeCompare(new String(tempTimeSlots.userid)) == 0) {
                console.log("if: ", tempTimeSlots);
                deleteTimeSlots(tempTimeSlots);
            }
        }
        await API.graphql({ query: createTimeSlotsMutation, variables: { input: formData } });
        setTimeSlots([...timeSlotss, formData]);
        setFormData(initialFormState);
    }

    async function deleteTimeSlots({ id }) {
        const newTimeSlotsArray = timeSlotss.filter(note => note.id !== id);
        setTimeSlots(newTimeSlotsArray);
        await API.graphql({ query: deleteTimeSlotsMutation, variables: { input: { id } } });
    }

    return (
        <div>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"></link>

            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap" rel="stylesheet"></link>


            <title>Main Menu</title>

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
                    <h1 class="display-6 mb-5">Main Menu</h1>
                    <div class="col-md-5 col-sm-8 col-9">
                        <div class="card">
                            <div class="card-header">Today's Schedule</div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">

                                    {timeSlotss.map(item => (
                                        <If test={re.localeCompare(new String(item.userid)) == 0}>
                                                Time 1 - {item.slot1}
                                        </If>
                                    ))}
                                 </li>
                                <li class="list-group-item">
                                    {timeSlotss.map(item => (
                                        <If test={re.localeCompare(new String(item.userid)) == 0}>
                                                Time 2 - {item.slot2}
                                        </If>
                                    ))}
                                 </li>
                                <li class="list-group-item">
                                    {timeSlotss.map(item => (
                                        <If test={re.localeCompare(new String(item.userid)) == 0}>
                                                Time 3 - {item.slot3}
                                        </If>
                                    ))}
                                    
                                 </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center pb-5">
                    <div class="col-xl-2 col-lg-3 col-12">

                        <button class="menu-button btn btn-light my-2" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/consumption_history';
                        }}>Consumption History</button>

                    </div>
                    <div class="col-xl-2 col-lg-3 col-12">
                        <button class="menu-button btn btn-light my-2" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/pill_information';
                        }}>Pill Setup</button>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-12">
                        <button class="menu-button btn btn-light my-2" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/edit_information';
                        }}>Edit Information</button>
                    </div>
                </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>

        </div>
    );
}

export default Home;