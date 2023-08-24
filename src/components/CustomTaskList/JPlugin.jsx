import React, { useState } from 'react';
import { withTaskContext } from '@twilio/flex-ui';
import { Theme } from '@twilio-paste/core/theme';
import './styles.css';
import axios from 'axios';

const Jplugin = (props) => {

const customerData = props?.task?.attributes?.CustomerData;
const reasonsData = [
  {
    id: 1,
    title: 'Mobile App',
    subReasons: [
      {
        id: 11,
        title: ' Not able to login with credentials',
        details: 'check the app version, uninstall and reinstall, clear the cache, check the phone update, if are you able to login to DE web then they should login with same credentials. ',
      },
    ],
  },
  {
    id: 2,
    title: 'Online Banking (DE web)',
    subReasons: [
      {
        id: 21,
        title: 'Not able to login',
        details: 'Details about Sub-Reason 2.1...',
      },
      {
        id: 22,
        title: 'Not able to register',
        details: 'Details about Sub-Reason 2.2...',
      },
      {
        id: 23,
        title: 'Not able to receive the verification code',
        details: 'Details about Sub-Reason 2.3...',
      },
    ],
  },
  {
    id: 3,
    title: 'Rewards',
    subReasons: [
      {
        id: 31,
        title: 'Rewards transaction not seen',
        details: 'Details about Sub-Reason 2.1...',
      },
      {
        id: 32,
        title: 'Missing rewards',
        details: 'Details about Sub-Reason 2.2...',
      },
      {
        id: 33,
        title: 'Unable to redeem',
        details: 'Details about Sub-Reason 2.3...',
      },
    ],
  },
  {
    id: 4,
    title: 'Alerts',
    subReasons: [
      {
        id: 41,
        title: 'Not receiving the alerts',
        details: 'Details about Sub-Reason 2.1...',
      },
      {
        id: 42,
        title: 'unable to set up alerts',
        details: 'Details about Sub-Reason 2.2...',
      },
      {
        id: 43,
        title: 'Not able verify the phone number',
        details: 'Details about Sub-Reason 2.3...',
      },
    ],
  },
];

const [selectedReason, setSelectedReason] = useState(null);
const [selectedSubReason, setSelectedSubReason] = useState(null);
const [showDetailsPopup, setShowDetailsPopup] = useState(false);

const handleReasonChange = (event) => {
  setSelectedReason(event.target.value);
  setSelectedSubReason(null);
};

const handleSubReasonChange = (event) => {
  setSelectedSubReason(event.target.value);
  setShowDetailsPopup(true);
};

const closePopup = () => {
  setShowDetailsPopup(false);
};

const [jiraTicketCreated, setJiraTicketCreated] = useState(false);


const createJiraTicket = () => {
  axios
    .post('https://jiracall-8517.twil.io/createJiraTicket.js')
    .then((response) => {
      console.log('Jira ticket created:', response.data);
      setJiraTicketCreated(true);
      // Handle success or display a message to the user
    })
    .catch((error) => {
      console.error('Error creating Jira ticket:', error);
      // Handle error or display an error message to the user
    });
};

return (
<Theme.Provider theme="default">
{customerData && (
    <div className="container">
      <div className="customer-details">
        <p>Customer Information</p>
        <p>{props?.task?.attributes?.CustomerData?.Customer[0]?.fullname}</p>
        <p>{props?.task?.attributes?.CustomerData?.Customer[0]?.emailaddress}</p>
      </div>
      <div className="dropdowns">
      <select value={selectedReason} onChange={handleReasonChange}>
        <option value="">Select Reason</option>
        {reasonsData.map((reason) => (
          <option key={reason.id} value={reason.id}>
            {reason.title}
          </option>
        ))}
      </select>
      
      {selectedReason && (
        <div>
          <select value={selectedSubReason} onChange={handleSubReasonChange}>
            <option value="">Select Sub-Reason</option>
            {reasonsData.find((reason) => reason.id === parseInt(selectedReason)).subReasons.map((subReason) => (
              <option key={subReason.id} value={subReason.id}>
                {subReason.title}
              </option>
            ))}
          </select>
          
          {showDetailsPopup && selectedSubReason && (
            <div className="popup">
              <p>{reasonsData.find((reason) => reason.id === parseInt(selectedReason)).subReasons.find((subReason) => subReason.id === parseInt(selectedSubReason)).details}</p>
              <button onClick={closePopup}>Close</button>
              <div style={{ marginTop: '20px' }}>
                <p>If issue not resolved with above recommendation. Please submit a ticket.</p>
                <button onClick={createJiraTicket}>Submit a ticket</button>
                {jiraTicketCreated && <p style={{ color: 'green' }}>Jira ticket created successfully!</p>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    <div>

    </div>
    </div>
)}
</Theme.Provider>
);
};

export default withTaskContext(Jplugin);
