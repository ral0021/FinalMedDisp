import React, { useState, useEffect } from 'react';
import { listMedications } from '../graphql/queries';
import { createMedication as createMedicationMutation, deleteMedication as deleteMedicationMutation } from '../graphql/mutations';


import { API, Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';


const initialFormState = { name: '', start: '', end: '', slot1: false, slot2: false, slot3: false };


const Add_medication = () => {
    const [medications, setMedications] = useState([]);
    const [formData, setFormData] = useState(initialFormState);


    useEffect(() => {
        fetchMedications();
    }, []);

    async function getUser() {
        // await (await Auth.currentCredentials()).getPromise();
        //  const user = await Auth.currentUserInfo();
        const user = (await Auth.currentSession()).getIdToken().payload;
        console.log("info:", user["cognito:username"]);
    }

    async function fetchMedications() {
        const apiData = await API.graphql({ query: listMedications });
        setMedications(apiData.data.listMedications.items);
    }

    async function createMedication() {
        if (!formData.name || !formData.start || !formData.end) return;
        getUser()
        formData.userid = (await Auth.currentSession()).getIdToken().payload["cognito:username"];
        await API.graphql({ query: createMedicationMutation, variables: { input: formData } });
        setMedications([...medications, formData]);
        setFormData(initialFormState);
    }

    async function deleteMedication({ id }) {
        const newMedicationsArray = medications.filter(note => note.id !== id);
        setMedications(newMedicationsArray);
        await API.graphql({ query: deleteMedicationMutation, variables: { input: { id } } });
    }

    return (
        <div>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous" />

            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap" rel="stylesheet" />
            <title>Add Medication</title>

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

                <form class="justify-content-center">
                    <div class="row">
                        <div class="col">
                            <h1 class="display-6">Add Medication</h1>
                        </div>
                    </div>

                    <div class="row justify-content-center my-2">
                        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-7 px-1">
                            <input type="text" class="form-control custom-input" placeholder="Medication Name" required onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                                value={formData.name} />
                        </div>
                    </div>
                    <div class="row justify-content-center my-2">
                        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-7 px-1">
                            <input type="date" class="form-control custom-input" placeholder="Start Date" onChange={e => setFormData({ ...formData, 'start': e.target.value })}
                                value={formData.start} required />
                        </div>
                    </div>
                    <div class="row justify-content-center my-2">
                        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-7 px-1">
                            <input type="date" class="form-control custom-input" placeholder="End Date" required onChange={e => setFormData({ ...formData, 'end': e.target.value })}
                                value={formData.end} />
                        </div>
                    </div>
                    <div class="row justify-content-center my-2">
                        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-7 px-1">
                            <input type="checkbox" id="slot1" name="slot1" onChange={e => setFormData({ ...formData, 'slot1': e.target.checked })} />
                            <label for="slot1"> Time Slot 1</label>
                        </div>
                    </div>
                    <div class="row justify-content-center my-2">
                        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-7 px-1">
                            <input type="checkbox" id="slot2" name="slot2" onChange={e => setFormData({ ...formData, 'slot2': e.target.checked })} />
                            <label for="slot1"> Time Slot 2</label>
                        </div>
                    </div>
                    <div class="row justify-content-center my-2">
                        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-7 px-1">
                            <input type="checkbox" id="slot3" name="slot3" onChange={e => setFormData({ ...formData, 'slot3': e.target.checked })} />
                            <label for="slot3"> Time Slot 3</label>
                        </div>
                    </div>
                    <div class="row justify-content-center my-4">
                        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-7">
                            <input type="submit" class="btn btn-light form-control" onClick={createMedication} />
                        </div>
                    </div>
                </form>


                <div class="row justify-content-center pb-5">
                    <div class="col-xl-2 col-lg-3 col-12">
                        <button class="menu-button btn btn-light my-2" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/current_medication';
                        }} >Current Medication</button>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-12">
                        <button class="menu-button btn btn-light my-2" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/pill_information';
                        }} >Pill Information</button>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-12">
                        <button class="menu-button btn btn-dark my-2" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/';
                        }} > Main Menu</button>
                    </div>
                </div>
            </div>

            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
        </div>
    );
}

export default Add_medication;