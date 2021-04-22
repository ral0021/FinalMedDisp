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
import Edit_email_information from './components/Edit_email_information'




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
                        
                        <Route path="/verification_photos" component={Verification_photos} />
                        
                        <Route path="/current_medication" component={Current_medication} />
                        <Route path="/add_medication" component={Add_medication} />
                        <Route path="/edit_information" component={Edit_information} />
                        <Route path="/edit_user_information" component={Edit_user_information} />
                        <Route path="/edit_email_information" component={Edit_email_information} />
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