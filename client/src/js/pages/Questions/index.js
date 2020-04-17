import React, { useEffect, useState } from 'react';
import QuestionList from './sections/QuestionList'
import AddQuestion from './sections/AddQuestion'
import QuestionDetail from './sections/QuestionDetail'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionActions from "../../actioncreators/questionActions";

const Questions = ({
  loggedIn
}) => {
  const [ subpage, setSubpage ] = useState('list')

  if (!loggedIn) {
    return (
      <p>
        Please login first.
      </p>
    )
  }

  return (
    <React.Fragment>
      {subpage=='list' && 
        <QuestionList setSubpage={setSubpage}/>  
      }
      {subpage=='add' && 
        <AddQuestion setSubpage={setSubpage} />  
      }
      {subpage=='detail' && 
        <QuestionDetail setSubpage={setSubpage} />  
      }
    </React.Fragment>
  )
}

function mapStateToProps({ questions, auth, messages }) {
  return {
    loading: messages.loading, 
    loggedIn: auth.loggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
