import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput
} from 'mdbreact';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const MeetingModal = props => {
  const [startDate, changeStartDate] = useState(Date.now());
  const [endDate, changeEndDate] = useState(Date.now());
  const [title, changeTitle] = useState('');
  const [participants, changeParticipants] = useState('');

  function handleStartDateChange(date) {
    // console.log('date', date);
    // console.log('get Hours', date._d.getHours());
    // console.log('get milliseconds', date._d.getMilliseconds());

    changeStartDate(date._d);
  }

  // function handleEndDateChange(date) {
  //   changeEndDate(date._d);
  // }

  const submitMeeting = e => {
    e.preventDefault();
    //* Formatting data to work with Calendar
    const newMeeting = {
      title: title,
      start: startDate
      //! Still need to add participants and end time.
      // end: endDate
    };
    //* Adding Event to Calendar
    props.addMeeting(newMeeting);
    //* Turning off the Modal
    props.toggle();
  };

  //! Using useEffect to update the date picker with the day selected from Calendar component
  useEffect(() => {
    changeStartDate(props.clickedDate);
  }, [props.clickedDate]);

  return (
    <MDBContainer>
      <MDBModal isOpen={props.showModal} toggle={props.toggle} centered>
        <MDBModalHeader toggle={props.toggle}>Create Meeting</MDBModalHeader>
        <MDBModalBody>
          <MDBInput
            label='Add title'
            //   icon='envelope'
            //   group
            size='lg'
            type='text'
            validate
            value={title}
            onChange={e => changeTitle(e.target.value)}
          />
          {/* //! Now that the date is updating should we change this to just a time picker? */}
          <DateTimePicker
            value={startDate}
            disablePast
            onChange={handleStartDateChange}
            label='Start time'
            showTodayButton
          />
          {/* //! Removing end datetime picker for now. Needs to auto-populate based on start time. Might not need picker at all, just a length drop down, then parse the end date.
          <DateTimePicker
            value={endDate}
            disablePast
            onChange={handleEndDateChange}
            label='End time'
            showTodayButton
          /> */}
          <MDBInput
            label='Select Participants'
            type='text'
            value={participants}
            onChange={e => changeParticipants(e.target.value)}
          />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color='secondary' onClick={e => props.toggle()}>
            Close
          </MDBBtn>
          <MDBBtn color='primary' onClick={e => submitMeeting(e)}>
            Save changes
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

export default MeetingModal;