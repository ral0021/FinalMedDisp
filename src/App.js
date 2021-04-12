import React, { useState, useEffect, Component } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Main_menu';
import Consumption_history from './components/Consumption_history'
import Pill_information from './components/Pill_information'
import Detailed_dispense_history from './components/Detailed_dispense_history'
import Verification_photos from './components/Verification_photos'
import Dispense_schedule from './components/Dispense_schedule'
import Current_medication from './components/Current_medication'
import Add_medication from './components/Add_medication'
import Edit_information from './components/Edit_information'
import Edit_user_information from './components/Edit_user_information'
import Edit_time_slots from './components/Edit_time_slots'
import Edit_caregiver_information from './components/Edit_caregiver_information'
import Edit_machine_information from './components/Edit_machine_information'
import Error from './components/Error';
import Navigation from './components/Navigation';
import Username from './components/Username'





class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Username />
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/consumption_history" component={Consumption_history} />
                        <Route path="/pill_information" component={Pill_information} />
                        <Route path="/detailed_dispense_history" component={Detailed_dispense_history} />
                        <Route path="/verification_photos" component={Verification_photos} />
                        <Route path="/dispense_schedule" component={Dispense_schedule} />
                        <Route path="/current_medication" component={Current_medication} />
                        <Route path="/add_medication" component={Add_medication} />
                        <Route path="/edit_information" component={Edit_information} />
                        <Route path="/edit_user_information" component={Edit_user_information} />
                        <Route path="/edit_time_slots" component={Edit_time_slots} />
                        <Route path="/edit_caregiver_information" component={Edit_caregiver_information} />
                        <Route path="/edit_machine_information" component={Edit_machine_information} />
                        <Route component={Error} />
                    </Switch>
                    <AmplifySignOut />
                </div>
            </BrowserRouter>

        );
    }
}

export default withAuthenticator(App);

// Remember this for how to add more routes
// import About from './components/About';
// import Contact from './components/Contact';
// <Route path="/about" component={About}/>
// <Route path="/contact" component={Contact}/>

// const initialFormState = { name: '', description: '' }

// function App() {
//   const [notes, setNotes] = useState([]);
//   const [formData, setFormData] = useState(initialFormState);

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   async function fetchNotes() {
//     const apiData = await API.graphql({ query: listNotes });
//     setNotes(apiData.data.listNotes.items);
//   }

//   async function createNote() {
//     if (!formData.name || !formData.description) return;
//     await API.graphql({ query: createNoteMutation, variables: { input: formData } });
//     setNotes([ ...notes, formData ]);
//     setFormData(initialFormState);
//   }

//   async function deleteNote({ id }) {
//     const newNotesArray = notes.filter(note => note.id !== id);
//     setNotes(newNotesArray);
//     await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
//   }

//   return (
//     <div className="App">

//     <meta charset="utf-8"/>
//     <meta name="viewport" content="width=device-width, initial-scale=1"/>

//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"></link>

//     <link rel="preconnect" href="https://fonts.gstatic.com"></link>
//     <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap" rel="stylesheet"></link>


//     <title>Main Menu</title>

//     <div id="menu-banner" class="row text-center py-3">
//         <div class="col">
//             <p class="display-5" id="login-title">
//                 <a href="./main_menu.html">                    
//                   <img id="menu-image" src="https://wchstv.com/resources/media/1f5b2909-ee90-495b-be68-68d26537cbab-large16x9_WVU.png?1518011273124"/>
//                 </a>
//             </p>
//         </div>
//     </div>

//     <div class="container-fluid text-center mt-5">
//         <div class="row justify-content-center my-5 ">
//             <h1 class="display-6 mb-5">Main Menu</h1>
//             <div class="col-md-5 col-sm-8 col-9">
//                 <div class="card">
//                     <div class="card-header">Today's Schedule</div>
//                     <ul class="list-group list-group-flush">
//                         <li id="list-item-1" class="list-group-item"> 
//                             Time 1 - 9:00 A.M.
//                         </li>
//                         <li id="list-item-2" class="list-group-item"> 
//                             Time 2 - 12:00 P.M.
//                         </li>
//                         <li id="list-item-3" class="list-group-item"> 
//                             Time 3 - 5:00 P.M.
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>

//         <div class="row justify-content-center pb-5">
//             <div class="col-xl-2 col-lg-3 col-12">
//                 <button class="menu-button btn btn-light my-2" onclick="window.location.href='./consumption_history.html'">Consumption History</button>
//             </div>
//             <div class="col-xl-2 col-lg-3 col-12">
//                 <button class="menu-button btn btn-light my-2" onclick="window.location.href='./Pill_Information.html'">Pill Setup</button>
//             </div>
//             <div class="col-xl-2 col-lg-3 col-12">
//                 <button class="menu-button btn btn-light my-2" onclick="window.location.href='./edit_information.html'">Edit Information</button>
//             </div>
//         </div>
//     </div>


//     <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
//     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
//     <AmplifySignOut />
//     </div>
//   );
// }

// export default withAuthenticator(App);