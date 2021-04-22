import React, { useState, useEffect } from 'react';
import { listDispenses } from '../graphql/queries';
import { listCaregiverPatientMatchers } from '../graphql/queries';

import { If } from 'react-control-flow-components';


import { API, Auth} from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';


var re;
var re2;

function compare(a, b){
    return b.createdAt.localeCompare(a.createdAt);
}

const Consumption_history = () => {

    // Declare state varables and functinos to set state variables
    const [dispense, setDispense] = useState([]);
 
    // Get and set userid
    Promise.resolve(getUser()).then(function(result){
        re= new String(result);
    })

    Promise.resolve(getUser2()).then(function(result){
        re2= new String(result);
    })

    // React Hook to allow use of state
    useEffect(() => {
        fetchDispense();
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
  async function fetchDispense() {
    const apiData = await API.graphql({ query: listDispenses });
    setDispense(apiData.data.listDispenses.items.sort(compare));
  }

    return (
    	<div>
    		<meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
   
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"/>
    
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap" rel="stylesheet"/>
   
            <title>Consumption History</title>
  
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
                    <h1 class="display-6 mb-5">Consumption History</h1>
                </div>
                <div class="row justify-content-center mt-5 ">
                    <p>yellow = missed, green = taken</p>
                </div>
                <div class="row justify-content-center">
                <div class="col-lg-6 col-md-8 col-10 scroll-table">
                  <table class="table table-striped table-bordered table-hover table-responsive">
                    <thead class="table-head">
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Description</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody class="">

                        {dispense.map(item => (
                            
                        <If test={re == item.userid || re2 == item.userid}>

                        <If test={item.took}>
                        <tr id="green">

                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.discription}</td>
                        <td>{item.userid}</td>
                        
                        </tr>
                        </If>

                        <If test={!item.took}>
                        <tr id="yellow">

                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.discription}</td>
                        <td>{item.userid}</td>
                        
                        </tr>
                        </If>
                        
                        </If>
                        
                      ))}

                      
                    </tbody>
                  </table>
                </div>
              </div>

                <div class="row justify-content-center pb-5">
                    <div class="col-xl-2 col-lg-3 col-12">
                        <button class="menu-button btn btn-light my-2" onClick={(e) => {
                            e.preventDefault();
                            window.location.href='/verification_photos';
                        }}>Verification Photos</button>
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
 
export default Consumption_history;