import React from "react";
import "./AdvocateViewAllCaseReq.css";

function AdvocateViewAllCaseReq() {
  return (
    <div>
      <div className="adv_view_all_req">
        <table class="table table-striped ">
          <thead>
            <tr>
              <th scope="col">Case Title</th>
              <th scope="col">Client Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Case Type</th>
              <th scope="col">Date of Incident</th>
              <th scope="col">Opponent Name</th>
              <th scope="col">Case Location</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
           
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdvocateViewAllCaseReq;
