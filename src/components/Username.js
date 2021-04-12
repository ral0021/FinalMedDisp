import React, { useState, useEffect } from 'react';
import { Case, ForEach, If, Switch } from 'react-control-flow-components';

import { API, Auth} from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';


const initialFormState = {};

const Username = () => {

  const [username, setUsername] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    getUser();
  }, []);

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