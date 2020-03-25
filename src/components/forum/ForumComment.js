import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { firestore } from "../../config/fbConfig.js";




import "./Dashboard.css";



const ForumMain = props => {
    const [comment, setComment] = useState({
        id: 0,
        threadId: '',
        comment: '',
        posterName: '',
        posterId: '',
        postTime: '',
    });

    useEffect(() => {
        firestore.collection("users").onSnapshot(querySnapshot => {
            let userArray = [];
            querySnapshot.forEach(doc => {
                userArray.push({
                    approved: doc.data().awaitingApproval,
                    name: doc.data().fullName,
                    photoURL: doc.data().photoUrl,
                    userType: doc.data().userType,
                    city: doc.data().city,
                    stateProvince: doc.data().stateProvince,
                    uid: doc.data().uid
                });
            });
            setUsers(userArray);
        });
    }, []);

    const pushToThread = uid => {
        props.history.push(``);
    };

    return (
        <Button>Start a Thread</Button>
    );
};

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        users: state.firestore.ordered.users,
        userInfo: state.firebase.profile
    };
};

export default withRouter(connect(mapStateToProps)(ForumMain));