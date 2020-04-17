import React, { useEffect, useState } from 'react';

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionActions from "../../../actioncreators/questionActions";

// components
import Loader from "../../../components/Loader";
import { Success, Error } from '../../../components/Messages';

function QuestionList({
  setSubpage,
  actions,
  questions,
  loading,
  errorMessage,
  successMessage,
}) {
  const [ category, switchCategory ] = useState('English');
  const [ includingClosed, setIncludingClosed ] = useState(false);
  useEffect(() => {
    actions.fetchQuestions(category, includingClosed);
  }, [])
  useEffect(() => {
    actions.fetchQuestions(category, includingClosed);
  }, [category, includingClosed])
  const goDetail = (question) => {    
    actions.selectQuestion(question)
    setSubpage('detail')
  }
  const closeQuestion = (questionId) => {
    actions.closeQuestion(questionId)
  }
  const makePresentOnHome = (questionId, showable) => {
    actions.makePresentOnHome(questionId, showable)
  }
  
  return (
    <div>
      {loading ? (
        <Loader text="Loading Questions..." />
      ) : (
        <React.Fragment>
          <Error msg={errorMessage} />
          <Success msg={successMessage} />

          <div className='topbar'>
            <div className='pull-left'>
              <div className='btn-group pull-left' role='group'>
                <a onClick={() => setSubpage('add')} className="btn btn-sm btn-danger">
                  <span className='glyphicon glyphicon-plus'></span>&nbsp;
                  Add New
                </a>
              </div>              
            </div>
            <div className='pull-right'>
              <div className='btn-group pull-left' role='group'>
                <button 
                  type='button'
                  className={`btn btn-sm ${category=='English'?'btn-primary':''}`}  
                  onClick={() => switchCategory('English')}
                >
                  English
                </button>
                <button 
                  type='button'
                  className={`btn btn-sm ${category=='Math'?'btn-primary':''}`}  
                  onClick={() => switchCategory('Math')}
                >
                  Math
                </button>
              </div>
              <div className="checkbox pull-left">
                <label>
                  <input type="checkbox" onClick={() => setIncludingClosed(!includingClosed)} checked={includingClosed}/> Including Closed
                </label>
              </div>
            </div>
          </div>          
          <table className='table'>
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Description</th>
                <th>Answers</th>
                <th>Correct Answer</th>
                <th>Today's Topic</th>
                <th>Answers<br/>(Correct/Incorrect)</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {
                questions.map((question, index) => (
                  <tr key={'tr-'+index}>
                    <td>{index+1}</td>
                    <td>
                      {question.status!='closed' &&
                        <a className='btn btn-sm' onClick={() => goDetail(question)}>
                          <span className='glyphicon glyphicon-edit'></span>
                        </a>
                      }                      
                      {question.content.title}
                    </td>
                    <td>{question.content.description}</td>
                    <td>
                      <ul className="list-inline" style={{ marginBottom: '0px' }}>
                      {question.answers.map((answer, index_2) => (
                        <li key={`ans-${index}-${index_2}`}>
                          <span>
                            [{answer}]
                          </span>
                        </li>
                      ))}
                      </ul>
                    </td>
                    <td>
                      {question.correctAnswer}
                    </td>
                    <td>
                      {question.status!='closed' &&
                        <React.Fragment>
                          {question.presentation.status=='active' ?
                            <span className='glyphicon glyphicon-unchecked text-success'></span>
                          :
                            <span className='glyphicon glyphicon-unchecked text-danger'></span>
                          }
                          {question.presentation.status!='active' ?
                            <button type='button' className='btn btn-xs'
                              onClick={() => makePresentOnHome(question._id, true)}
                            >
                              <span className='glyphicon glyphicon-play text-success'></span>
                            </button>
                          :
                            <button type='button' className='btn btn-xs'
                              onClick={() => makePresentOnHome(question._id, false)}
                            >
                              <span className='glyphicon glyphicon-stop text-danger'></span>
                            </button>
                          }
                        </React.Fragment>                        
                      }
                    </td>
                    <td>
                      <span className='text-success'>
                        {question.stats.correctAnswersCount}
                      </span>
                      <span className='text-default'>/</span>
                      <span className='text-danger'>
                        {question.stats.incorrectAnswersCount}
                      </span>
                    </td>
                    <td>
                      {question.status!='closed' &&
                        <a type='button' className='btn btn-xs btn-danger' 
                          onClick={() => closeQuestion(question._id)}
                        >
                          Close
                        </a>
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </React.Fragment>
      )}
    </div>
  )
}

function mapStateToProps({ questions, auth, messages }) {
  return {
    questions: questions.questions,
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
