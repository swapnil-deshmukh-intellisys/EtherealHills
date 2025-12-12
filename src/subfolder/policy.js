import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Policy.css";

function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <h1 className="heading">Privacy Policy</h1>
      <p>Welcome to the Privacy Policy page of Pawna Lake Camps. Please read the following terms and conditions carefully:</p>

      <h2>Refund Policy</h2>
      <p>
        You are eligible for a refund (after 50% deduction as service tax) if cancellations are made 24 hours prior to the check-in time.
      </p>

      <h2>Accommodation Terms</h2>
      <ul>
        <li>The tent is provided to the customer once accommodated; no changes will be made to shift the tent.</li>
        <li>In the case of late check-out, you may have to pay extra money.</li>
        <li>Smoking is strictly prohibited inside the tents.</li>
      </ul>

      <h2>Conditions</h2>
      <ul>
        <li>
          In case of weather forecasting or government restrictions, certain activities may be cancelled, but the team will try to provide you with the other best services.
        </li>
        <li>
          The staff of Pawna Lake Camps will give you proper guidance for the activities carried out. During any activity, if any minor injury takes place, we will provide you with a First Aid kit.
        </li>
        <li>
          The client’s participation is voluntary in any activity they want to perform. "Pawna Lake Camping" is not responsible under any circumstances for injury, accidents, or loss of personal property.
        </li>
        <li>
          The conduct and behaviour of the client should not cause any harm to other members. Strict actions will be taken against them by Pawna Lake Camps, and they might be asked to leave immediately. Under such circumstances, no refund can be processed.
        </li>
      </ul>
    </div>
  );
}

export default PrivacyPolicy;
