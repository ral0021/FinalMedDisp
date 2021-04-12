import React, { useState, useEffect } from 'react';
import { listTimeSlotss } from '../graphql/queries';
import { createTimeSlots as createTimeSlotsMutation } from '../graphql/mutations';
import {deleteTimeSlots as deleteTimeSlotsMutation } from '../graphql/mutations';
import { If } from 'react-control-flow-components';

import { API, Auth} from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const initialFormState = { slot1: '', slot2: '', slot3: '', userid: '' };
var re;
const Edit_time_slots = () => {
     Promise.resolve(getUser()).then(function(result){
                        re= new String(result);
                    });

    const [timeSlotss, setTimeSlots] = useState([]);
  const [formData, setFormData] = useState(initialFormState);


  useEffect(() => {
    fetchTimeSlots();
  }, []);

  async function getUser() {
    // await (await Auth.currentCredentials()).getPromise();
   //  const user = await Auth.currentUserInfo();
  const user = (await Auth.currentSession().then(token => { return token } )).getIdToken().payload;
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
    for (timeSlots in timeSlotss){
        var tempTimeSlots = timeSlotss.[timeSlots];
        console.log("loop: ", tempTimeSlots);
        if(re.localeCompare(new String(tempTimeSlots.userid))==0){
            console.log("if: ", tempTimeSlots);
            deleteTimeSlots(tempTimeSlots);
        }
    }
    await API.graphql({ query: createTimeSlotsMutation, variables: { input: formData } });
    setTimeSlots([ ...timeSlotss, formData ]);
    setFormData(initialFormState);
  }

  async function deleteTimeSlots({ id }) {
    const newTimeSlotsArray = timeSlotss.filter(note => note.id !== id);
    setTimeSlots(newTimeSlotsArray);
    await API.graphql({ query: deleteTimeSlotsMutation, variables: { input: { id } }});
  }

    return (
       <div>
       		<meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"/>
    
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap" rel="stylesheet"/>
    <title>Edit Time Slots</title>
  
    <div id="menu-banner" class="row text-center py-3">
        <div class="col">
            <p class="display-5" id="login-title">
                <a href="./main_menu.html">
                    <img id="menu-image" src="https://wchstv.com/resources/media/1f5b2909-ee90-495b-be68-68d26537cbab-large16x9_WVU.png?1518011273124"/>
                </a>
            </p>
        </div>
    </div>
    
    <div class="container-fluid text-center mt-5">
        <div class="container-fluid text-center mt-5">
        <div class="row">
                    <h1 class="display-6">Edit Time Slots</h1>
                </div>
        <table class="table table-striped table-bordered table-hover table-responsive">
              <thead class="table-head">
                <tr>
                  
                  <th>Time Slot 1</th>
                  <th>Time Slot 2</th>
                  <th>Time Slot 3</th>
                </tr>
              </thead>
              <tbody class="">

                {timeSlotss.map(item => (
                    

                <If test={re.localeCompare(new String(item.userid))==0}>
                <tr>
                
              <td>{item.slot1}</td>
              <td>{item.slot2}</td>
              <td>{item.slot3}</td>
              </tr>
              </If>
              
         
              ))}

                
              </tbody>
            </table>
           
            <form id="time-Slots-form" class="justify-content-center">
                
                <div class="row justify-content-center my-2">
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">
                        <p>Time Slot 1 (00:00 AM/PM)</p>
                        <input id="time_slot1" type="time" class="form-control" placeholder="Time Slot 1" autofocus onChange={e => setFormData({ ...formData, 'slot1': e.target.value})}
        value={formData.slot1} required/>
                    </div>
                </div>
                <div class="row justify-content-center my-2">
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">
                        <p>Time Slot 2</p>
                        <input id="time_slot2" type="time" class="form-control" placeholder="Time Slot 2" onChange={e => setFormData({ ...formData, 'slot2': e.target.value})}
        value={formData.slot2} required/>
                    </div>
                </div>
                <div class="row justify-content-center my-2">
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">
                        <p>Time Slot 3</p>
                        <input id="time_slot3" type="time" class="form-control" placeholder="Time Slot 3" onChange={e => setFormData({ ...formData, 'slot3': e.target.value})}
        value={formData.slot3} required/>
                    </div>
                </div>
                <div class="row justify-content-center my-2">
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">
                        <input type="submit" class="btn btn-light form-control"  onClick={createTimeSlots }/>
                    </div>
                    
                </div>

                <div class="row justify-content-center my-2">
                    <div class="col-xl-2 col-lg-3 col-12">
                        <button class="menu-button btn btn-dark my-2" onClick={(e) => {
      e.preventDefault();
      window.location.href='/';
      }}>Main Menu</button>
                    </div>
                </div>

            </form>
        </div>
    </div>



    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
    </div>
    );
}
 
export default Edit_time_slots;