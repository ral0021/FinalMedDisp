import React, { useState, useEffect } from 'react';
import { listUsernameMachineMatchers } from '../graphql/queries';
import { createUsernameMachineMatcher as createUsernameMachineMatcherMutation } from '../graphql/mutations';
import { deleteUsernameMachineMatcher as deleteUsernameMachineMatcherMutation } from '../graphql/mutations';
import { If } from 'react-control-flow-components';

import { API, Auth} from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const initialFormState = { machineCode:'', patientUsername:''};
var re;
 
const Edit_machine_information = () => {
    Promise.resolve(getUser()).then(function(result){
                        re= new String(result);
                    });

    const [UsernameMachineMatchers, setUsernameMachineMatcher] = useState([]);
  const [formData, setFormData] = useState(initialFormState);


  useEffect(() => {
    fetchUsernameMachineMatcher();
  }, []);

  async function getUser() {
    // await (await Auth.currentCredentials()).getPromise();
   //  const user = await Auth.currentUserInfo();
  const user = (await Auth.currentSession().then(token => { return token } )).getIdToken().payload;
    return user["cognito:username"];
  }

  async function fetchUsernameMachineMatcher() {
    const apiData = await API.graphql({ query: listUsernameMachineMatchers });
    console.log("apiData: ", apiData);
    console.log("items ", apiData.data.listUsernameMachineMatchers.items);
    setUsernameMachineMatcher(apiData.data.listUsernameMachineMatchers.items);
    console.log("matcher: ", UsernameMachineMatchers);
    console.log("re: ", re);
  }

  async function createUsernameMachineMatcher() {
    console.log("test");
    if (!formData.machineCode) return;
    console.log("test2");
    getUser()
    console.log("test3");
    formData.patientUsername = (await Auth.currentSession()).getIdToken().payload["cognito:username"];
    var UsernameMachineMatcher;
    console.log("timeSlotss: ", typeof timeSlotss);
    for (UsernameMachineMatcher in UsernameMachineMatchers){
        var tempUsernameMachineMatcher = UsernameMachineMatchers.[UsernameMachineMatcher];
        console.log("loop: ", tempUsernameMachineMatcher);
        if(re.localeCompare(new String(tempUsernameMachineMatcher.patientUsername))==0){
            console.log("if: ", tempUsernameMachineMatcher);
            deleteUsernameMachineMatcher(tempUsernameMachineMatcher);
        }
    }
    await API.graphql({ query: createUsernameMachineMatcherMutation, variables: { input: formData } });
    setUsernameMachineMatcher([ ...UsernameMachineMatchers, formData ]);
    setFormData(initialFormState);
  }

  async function deleteUsernameMachineMatcher({ id }) {
    const newUsernameMachineMacherArray = UsernameMachineMatchers.filter(note => note.id !== id);
    setUsernameMachineMatcher(newUsernameMachineMacherArray);
    await API.graphql({ query: deleteUsernameMachineMatcherMutation, variables: { input: { id } }});
  }

    return (
       <div>
       		<meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"/>
    
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap" rel="stylesheet"/>
    <title>Machine Info</title>
 
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
        <form id="machine-info-form" class="justify-content-center">
            <div class="row">
                <h1 class="display-6">Machine Info</h1>
            </div>
            
            <table class="table table-striped table-bordered table-hover table-responsive">
              <thead class="table-head">
                <tr>
                  
                  <th>Current Machine Code</th>
                  
                
                </tr>
              </thead>
              <tbody class="">

                {UsernameMachineMatchers.map(item => (
                    

                <If test={re.localeCompare(new String(item.patientUsername))==0}>
                <tr>
                
              <td>{item.machineCode}</td>
              
              </tr>
              </If>
              
         
              ))}

                
              </tbody>
            </table>
            <div class="row justify-content-center my-2">
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">
                    <input id="machine-info-code" type="text" class="form-control" placeholder="Machine Code" autofocus onChange={e => setFormData({ ...formData, 'machineCode': e.target.value})}
        value={formData.machineCode} required/>
                </div>
            </div>
            <div class="row justify-content-center my-2">
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6 pb-5">
                    <input type="submit" class="btn btn-light form-control" onClick={createUsernameMachineMatcher }/>
                </div>
            </div>
        </form>

    <div class="row justify-content-center my-2">
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
 
export default Edit_machine_information;