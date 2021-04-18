import React, { useState, useEffect } from 'react';
import { Case, ForEach, If, Switch } from 'react-control-flow-components';

import { API, Auth} from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';


const initialFormState = {};

const Username = () => {

  // Initialize state variables and functions to set them
  const [username, setUsername] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  // React Hook to allow use of state
  useEffect(() => {
    getUser();
  }, []);

  // Function to get userid and set state variable
  async function getUser() {
   formData.name = (await Auth.currentSession()).getIdToken().payload["cognito:username"];
   setUsername([ ...username, formData ]);
  }

  return(
    <div>
      {username.map(item => (
        <p>Logged in as: {item.name}</p>
      ))}
    </div>
  );
}

export default Username;