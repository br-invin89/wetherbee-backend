import React, { useEffect, useState } from 'react';

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionActions from "../../../actioncreators/questionActions";

// components
import Loader from "../../../components/Loader";

import { Success, Error } from '../../../components/Messages';

function AddQuestion({
  setSubpage,
  actions,
  loading,
  errorMessage,
  successMessage
}) {
  const [ category, switchCategory ] = useState('English');
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ videoLink, setVideoLink ] = useState('');
  const [ answers, setAnswers ] = useState([]);
  const [ inputAnswer, setInputAnswer ] = useState('');
  const [ correctAnswer, setCorrectAnswer ] = useState('');

  const onSubmit = () => {
    const content = {
      title, description, videoLink
    }

    actions.postQuestion({ category, content, answers, correctAnswer });
  }

  
  return (
    <div>
      {loading ? (
        <Loader text="Posting Questions..." />
      ) : (
        <React.Fragment>
          <Error msg={errorMessage} />
          <Success msg={successMessage} />
          <form>
            <div className="form-group">
              <label>Category: </label>
              <select className='form-control' onChange={e => switchCategory(e.target.value)}>
                <option value='English'>English</option>
                <option value='Math'>Math</option>
              </select>
            </div>
            <div className="form-group">
              <label>Title: </label>
              <input type='text' className='form-control' onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Description: </label>
              <textarea className='form-control' onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <div className="form-group">
              <label>Video Link: </label>
              <input type='text' className='form-control' onChange={e => setVideoLink(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Answers: </label>
              <ul className='list-inline'>
                {answers.map((answer, index) => (
                  <li key={`ans-${index}`}>
                    <span className='text-primary'>{answer}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="form-group">
              <input type='text' className='form-control'                         
                value={inputAnswer} 
                onChange={e => setInputAnswer(e.target.value)} 
                style={{
                  width: 'calc(100% - 80px)',
                  display: 'inline',
                  marginRight: '20px'
                }}     
              />
              <button type='button' className='btn btn-sm btn-primary' onClick={() => setAnswers([...answers, inputAnswer])}>
                Add
              </button>
            </div>
            <div className="form-group">
              <label>Correct Answer: </label>
              <input type='text' className='form-control' onChange={e => setCorrectAnswer(e.target.value)} />
            </div>
          </form>
          <div className='action-bar'>
            <button type='button' className='btn btn-primary' onClick={onSubmit}>Save</button>
            <a className="btn btn-default" onClick={() => setSubpage('list')}>
              Back to List
            </a>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

function mapStateToProps({ questions, auth, messages }) {
  return {
    loading: messages.loading, 
    loggedIn: auth.loggedIn,
    errorMessage: messages.errorMessage,
		successMessage: messages.successMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
