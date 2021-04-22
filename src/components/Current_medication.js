import React, { useState, useEffect } from 'react';
import { listMedications } from '../graphql/queries';
import { listCaregiverPatientMatchers } from '../graphql/queries';
import { createMedication as createMedicationMutation, deleteMedication as deleteMedicationMutation } from '../graphql/mutations';
import { Case, ForEach, If, Switch } from 'react-control-flow-components';


import { API, Auth} from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const initialFormState = { medicationName: ''}
var re;
var re2;

function compare(a, b){
    return a.name.localeCompare(b.name);
}

const Current_medication = (props) => {

  // Declare state varables and functinos to set state variables
	const [medications, setMedications] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  // Get search parameter from props
  const searc = props.location.search; 
  const params = new URLSearchParams(searc);
  const search = params.get('search'); 
 
  // Get and set userid
  Promise.resolve(getUser()).then(function(result){
    re= new String(result);
  })

  Promise.resolve(getUser2()).then(function(result){
    re2= new String(result);
  })

  // React Hook to allow use of state
  useEffect(() => {
    fetchMedications();
  }, []);

  // Function to return the current user
  async function getUser() {
    const user = (await Auth.currentSession().then(token => { return token } )).getIdToken().payload;
    return user["cognito:username"];
  }

  async function getUser2() {
    const apiData = await API.graphql({query: listCaregiverPatientMatchers});
    var array = apiData.data.listCaregiverPatientMatchers.items;
    var CPM;
    for(CPM in array){
      var tempCPM = array[CPM];
      if(tempCPM.caregiverUsername == re){
        return tempCPM.patientUsername;
      }
    }
  }

  // Function to retrieve the medicatinos and set the state variable
  async function fetchMedications() {
    const apiData = await API.graphql({ query: listMedications });
    setMedications(apiData.data.listMedications.items.sort(compare));
  }

  // Funciton to remove an entry from the database and the state variable
   async function deleteMedication({ id }) {
    const newMedicationsArray = medications.filter(note => note.id !== id);
    setMedications(newMedicationsArray);
    await API.graphql({ query: deleteMedicationMutation, variables: { input: { id } }});
  }
  

    return (
       <div>
       		<meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"/>
          
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap" rel="stylesheet"/>
          <title>Current Medication</title>
        
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
              <div class="row justify-content-center mt-5 ">
                <h1 class="display-6 mb-5">Current Medication</h1>
              </div>

             
              <form class="justify-content-center">
                <div class="row justify-content-center">
                  <div class="col-lg-3 col-md-4 col-5">
                    <input type="text" class="form-control custom-input" placeholder="Med. Name" autofocus onChange={e => setFormData({ ...formData, 'medicationName': e.target.value})}
                      value={formData.medicationName}/>
                  </div>
                  <div class="col-lg-3 col-md-4 col-5">
                    <input type="button" value="Search" class="btn btn-light form-control"  onClick={(e) => {
                      e.preventDefault();
                      window.location.href='/current_medication?search='+formData.medicationName;
                    }}/>
                		<input type="button" value="Reset Search" class="btn btn-light form-control"  onClick={(e) => {
                      e.preventDefault();
                      console.log("formdata: ", formData);
                      window.location.href='/current_medication';
                    }}/>
                  </div>
                </div>
              </form>
             
               
              <div class="row justify-content-center my-2">
                <div class="col-lg-6 col-md-8 col-10 px-1">
                  <hr/>
                </div>
              </div>
              
              <div class="row justify-content-center">
                <div class="col-lg-6 col-md-8 col-10 scroll-table">
                  <table class="table table-striped table-bordered table-hover table-responsive">
                    <thead class="table-head">
                      <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Time Slot 1</th>
                        <th>Time Slot 2</th>
                        <th>Time Slot 3</th>
                        <th>Username</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody class="">

                   		{medications.map(item => (
                   			
                      	<If test={search==null ? (re == item.userid || re2 == item.userid): (re==item.userid || re2 == item.userid) && search==item.name}>
                      	<tr>
                      	
                        <td>{item.name}</td>
                        <td>{item.start}</td>
                        <td>{item.end}</td>


                        <If test={item.slot1}>
                        <td id="true">{new String(item.slot1)}</td>
                        </If>

                        <If test={!item.slot1}>
                        <td id="false">{new String(item.slot1)}</td>
                        </If>


                        <If test={item.slot2}>
                        <td id="true">{new String(item.slot2)}</td>
                        </If>

                        <If test={!item.slot2}>
                        <td id="false">{new String(item.slot2)}</td>
                        </If>


                        <If test={item.slot3}>
                        <td id="true">{new String(item.slot3)}</td>
                        </If>

                        <If test={!item.slot3}>
                        <td id="false">{new String(item.slot3)}</td>
                        </If>


                        <td>{item.userid}</td>
                        <td>
                        	<button onClick={() => deleteMedication(item)}>Delete</button>
                        </td>

                        </tr>
                        </If>
                        
                      ))}

                      
                    </tbody>
                  </table>
                </div>
              </div>

        
              <div class="row justify-content-center">
                <div class="col-xl-2 col-lg-3 col-12">
                  <button type="button" class="btn btn-light menu-button" onClick={(e) => {
                    e.preventDefault();
                    window.location.href='/add_medication';
                  }}>Add Medication</button>
                </div>
                <div class="col-xl-2 col-lg-3 col-12">
                  <button class="menu-button btn btn-light my-2" onClick={(e) => {
                    e.preventDefault();
                    window.location.href='/pill_information';
                  }}>Pill Information</button>
                  </div>
                <div class="col-xl-2 col-lg-3 col-12">
                  <button class="menu-button btn btn-dark my-2" onClick={(e) => {
                    e.preventDefault();
                    window.location.href='/';
                  }}>Main Menu</button>
                </div>
              </div>
          </div>

          <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
      </div>
    );
}

 
export default Current_medication;