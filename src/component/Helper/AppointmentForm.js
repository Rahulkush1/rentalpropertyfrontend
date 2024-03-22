import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../../Action/appointmentAction";



const AppointmentForm = ({data, id}) => {
    const dispatch = useDispatch()
    const [appointment, setAppointment] = useState({
        name: data.attributes.full_name,
        email:  data.attributes.email,
        phone:  data.attributes.phone,
        property_id: id
        
    });
    const HadnleAppointment = (e) => {
        setAppointment({...appointment, [e.target.name] : e.target.value})
    }
    const date = new Date()

    const SubmitAppointment = (e) => {
        e.preventDefault();
        dispatch(createAppointment(appointment));

    }

  return (
    <div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 grey" id="exampleModalLabel">
               Schedule Appointment
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={SubmitAppointment}>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label grey">
                    Full Name
                  </label>
                  <input type="text" class="form-control" name="name" value={appointment.name}  onChange={HadnleAppointment} />
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label grey">
                    Email
                  </label>
                  <input type="text" class="form-control"  name="email" value={appointment.email}  onChange={HadnleAppointment} />
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label grey">
                    Phone Number
                  </label>
                  <input type="text" class="form-control" name="phone" value={appointment.phone} onChange={HadnleAppointment} />
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label grey">
                    Date
                  </label>
                  <input type="date" class="form-control" min={date.toLocaleDateString} name="date" value={appointment.date}  onChange={HadnleAppointment} />
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label grey">
                    Message:
                  </label>
                  <textarea class="form-control" id="message-text" name="message" value={appointment.message} onChange={HadnleAppointment}></textarea>
                </div>
                <div className="mb-3 text-center">
                    <input type="submit" class="btn btn-primary  " value='Submit' data-bs-dismiss="modal" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              
                
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;