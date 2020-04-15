import React, { useEffect } from 'react';

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../actioncreators/userActions";

// components
import Loader from "../components/Loader";

function UserList({
  actions,
  users,
  loggedIn,
  loading,
}) {
  if (!loggedIn) {
    return (
      <p>
        Please login first.
      </p>
    )
  }
  useEffect(() => {
    actions.fetchUsers();
  }, [])
  
  return (
    <div>
      {loading ? (
        <Loader text="Loading Users..." />
      ) : (
        <table className='table'>
          <thead>
            <th>No.</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>School Name</th>
            <th>Grade</th>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr key={'tr-'+index}>
                  <td>{index+1}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.schoolName}</td>
                  <td>{user.grade}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )}
    </div>
  )
}

function mapStateToProps({ users, auth, messages }) {
  return {
    users: users.users,
    loading: messages.loading, 
    loggedIn: auth.loggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
