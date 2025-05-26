import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';

function UserViewPaymentReq() {

    const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .post(`/getPaymentsByCaseId/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setData(res.data.data || []);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        console.error("Error!", error);
      });
  }, [id]);

  return (
    <div className="adv_client_payment_status">
      <div className="container advocate_home_container2 pt-5 pb-5">
        {data.length > 0 ? (
          <div className="advocate_home_container2_table table-responsive">
            <table className="table align-center">
              <thead>
                <tr>
                  <th scope="col">Payment Info</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Request Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.category}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.date ? payment.date.slice(0, 10) : '-'}</td>
                    <td>
                      {payment.paymentStatus === false ? (
                        <Link to={`/user_pay_adv_req/${payment._id}`} ><button className="btn btn-outline-danger">Pay Now</button></Link>
                      ) : (
                        <p className="btn btn-outline-success">Paid</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-payment-request">
            <h2>No Payment Request Added</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserViewPaymentReq
