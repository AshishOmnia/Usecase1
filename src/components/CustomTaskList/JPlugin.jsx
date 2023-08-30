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
        details: 'Check the app version, uninstall and reinstall, clear the cache, check the phone update, if are you able to login to DE web then they should login with same credentials. ',
      },
    ],
  },
  {
    id: 2,
    title: 'Online Banking',
    subReasons: [
      {
        id: 21,
        title: 'Not able to login',
        details: 'Please try verifying credentials, resetting passwords, checking for account lockouts, trying different browsers or apps, and clearing cache/cookies, stable internet, and disabled security software.',
      },
      {
        id: 22,
        title: 'Not able to register',
        details: 'Please try enter accurate details, checking for lockouts, utilizing different browsers or apps, and clearing cache/cookies. Verifying two-factor authentication and stable internet',
      },
      {
        id: 23,
        title: 'Not able to receive the verification code',
        details: 'Please try checking entered contact details, ensuring network stability, and if you are reachable.',
      },
    ],
  },
  {
    id: 3,
    title: 'Rewards',
    subReasons: [
      {
        id: 31,
        title: 'Not able to login to rewards',
        details: 'Please conform proper login, checking transaction history filters, and refreshing the page.',
      },
      {
        id: 32,
        title: 'Missing rewards',
        details: 'Please ensure you are logged in correctly, review transaction history filters, and refresh the page.',
      },
      {
        id: 33,
        title: 'Unable to redeem',
        details: 'Please ensure you meet redemption criteria, checking for available options, and confirming your account status',
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
        details: 'Please can you confirm accurate contact information, ensuring notification settings are enabled, and checking spam folders. Verifying connectivity and settings within the banking platform is important',
      },
      {
        id: 42,
        title: 'unable to set up alerts',
        details: 'Please ensure correct notification preferences, and verifying contact information accuracy. Double-checking internet connectivity and adhering to platform guidelines is crucial',
      },
      {
        id: 43,
        title: 'Not able verify the phone number',
        details: `Can you confirm the entered number's accuracy, ensuring it's reachable, and checking for any formatting requirements. Requesting a verification code resend or trying an alternative verification method could be useful.`,
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

const [jiraTicketResponse, setJiraTicketResponse] = useState(null);


const createJiraTicket = () => {
  axios
    .post('https://ashish-5111.twil.io/jiraticket')
    .then((response) => {
      console.log('Jira ticket created:', response.data);
      setJiraTicketResponse(response.data);
    })
    .catch((error) => {
      console.error('Error creating Jira ticket:', error);
      setJiraTicketResponse('Error creating Jira ticket');
    });
};

return (
<Theme.Provider theme="default">
{customerData && (
    <div className="container">
      <div className="customer-details">
        <p>Customer Information</p>
        <div style={{ marginTop: '15px' }}/>
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
                <div style={{ marginTop: '10px' }}/>
                {jiraTicketResponse && (
                <p style={{ color: 'green' }}>{jiraTicketResponse}</p>
              )}
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
