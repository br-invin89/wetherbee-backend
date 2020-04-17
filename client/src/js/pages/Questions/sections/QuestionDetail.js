import React, { useEffect, useState } from 'react';

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionActions from "../../../actioncreators/questionActions";

import { Success, Error } from '../../../components/Messages';

// components
import Loader from "../../../components/Loader";

function QuestionDetail({
  setSubpage,
  selectedQuestion,
  actions,
  errorMessage,
  successMessage,
  loading,
}) {
  const [ category, switchCategory ] = useState(selectedQuestion.category);
  const [ title, setTitle ] = useState(selectedQuestion.content.title);
  const [ description, setDescription ] = useState(selectedQuestion.content.description);
  const [ videoLink, setVideoLink ] = useState(selectedQuestion.content.videoLink);
  const [ answers, setAnswers ] = useState(selectedQuestion.answers);
  const [ inputAnswer, setInputAnswer ] = useState('');
  const [ correctAnswer, setCorrectAnswer ] = useState(selectedQuestion.correctAnswer);

  const onSubmit = () => {
    const content = {
      title, description, videoLink
    }
    const questionId = selectedQuestion._id;

    actions.updateQuestion(questionId, { category, content, answers, correctAnswer });
  }

  const removeAnswer = (index) => {
    let newAnswers = [...answers];
    newAnswers.splice(index, 1)
    setAnswers(newAnswers);
  }

  
  return (
    <div>
      {loading ? (
        <Loader text="Updating Questions..." />
      ) : (
        <React.Fragment>
          <Error msg={errorMessage} />
          <Success msg={successMessage} />
          <form>
            <div className="form-group">
              <label>Category: </label>
              <select className='form-control' value={category} onChange={e => switchCategory(e.target.value)}>
                <option value='English'>English</option>
                <option value='Math'>Math</option>
              </select>
            </div>
            <div className="form-group">
              <label>Title: </label>
              <input type='text' className='form-control' onChange={e => setTitle(e.target.value)} value={title} />
            </div>
            <div className="form-group">
              <label>Description: </label>
              <textarea className='form-control' onChange={e => setDescription(e.target.value)} value={description}></textarea>
            </div>
            <div className="form-group">
              <label>Video Link: </label>
              <input type='text' className='form-control' onChange={e => setVideoLink(e.target.value)} value={videoLink} />
            </div>
            <div className="form-group">
              <label>Answers: </label>
              <ul className='list-inline'>
                {answers.map((answer, index) => (
                  <li key={`ans-${index}`} style={{ marginRight: '10px' }}>
                    <span className='text-primary'>{answer}</span>
                    <a onClick={() => removeAnswer(index)}><span className='glyphicon glyphicon-remove-circle text-danger text-sm'></span></a>
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
              <input type='text' className='form-control' onChange={e => setCorrectAnswer(e.target.value)} value={correctAnswer} />
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
    selectedQuestion: questions.selectedQuestion,
    loading: messages.loading, 
    errorMessage: messages.errorMessage,
		successMessage: messages.successMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);
