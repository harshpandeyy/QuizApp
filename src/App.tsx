import React, { Component } from "react";
import "./App.css";
import "./data.js";
import { QuizData } from "./data.js";

const totalQuestions = 21;
const length = QuizData.length;
let question = 0;
export class App extends Component {
  state: {
    questionNumber: number;
    answered: number;
    unanswered: number;
    isClicked: boolean;
    isVisited: false;
    quizFullData: any;
    quizSingleShowData: any;
    counter: number;
    selectedOption:boolean;
    quizSingleData:any;
    visibleCounter:number;
    optionNumber:number;
    answerState:any;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      questionNumber:0,
      answered: 0,
      unanswered: 21,
      isClicked: false,
      isVisited: false,
      quizFullData: QuizData,
      selectedOption:false,
      quizSingleShowData: [],
      quizSingleData:QuizData[0],
      counter:0,
      visibleCounter:0,
      answerState:null,
      optionNumber:8

    };
  }

  componentDidMount() {
    this.setState({ quizSingleShowData: this.state.quizFullData[this.state.counter] })
  }

  nextQuestion = () => {
    if(this.state.counter<length-1){
      this.setState({ counter: this.state.counter + 1, isVisited: true }, () => {
        this.setState({ quizSingleShowData: this.state.quizFullData[this.state.counter] })   
    })
      this.state.questionNumber = this.state.counter+1
      this.state.optionNumber=8;
    }
  };

  previousQuestion = () => {
    if (this.state.counter>0) {
      this.setState({ counter: this.state.counter - 1}, () => {
        this.setState({ quizSingleShowData: this.state.quizFullData[this.state.counter] })
      })
      this.state.questionNumber = this.state.counter-1
      this.state.optionNumber = 8;

    }
  };

  handleClick = (e:any , index:any) => {
    this.setState({
      quizSingleShowData: this.state.quizFullData[index], counter: index, isVisited: true
    })
    this.state.questionNumber=index
  };

  onSubmit = () => { 
      this.setState({ answered: this.state.answered + 1 });
  };

  selectOption = (singleDataIndex:any) => {
    this.state.quizFullData.map((item:any)=>{
      if(singleDataIndex==item.correct_answer){
        console.log('correct answer')
      }
    })
    this.setState({
      optionNumber: singleDataIndex,
      answerState:true
    })
  };

  visitedQuestion = () => {
    this.setState({
      
    })
  }

  renderHeader = () => {
    return (
      <>
        <div className="action-bar">
          {this.state.quizFullData.map((item:any, index: any) => {
            return (
              <>
                <div
                  key={index}
                  id={index}
                  className={this.state.questionNumber===index?'active-ques-circle':'ques-circle'}
                  onClick={(e)=>this.handleClick(e,index)}
                >
                  {index+1}
                  {/* {item.status===this.state.isVisited?'visited-ques-circle':'ques-circle'}              */}

                </div>
              </>
            );
          })}
        </div>

        <div className="question-score">
          <div className="total-questions">Total Questions:{length}</div>

          <div className="answered">Answered:{this.state.answered}</div>

          <div className="unanswered">
            Unanswered:{totalQuestions - this.state.answered}
          </div>
        </div>
      </>
    );
  };

  renderBody = () => {
    // const selectedOption = this.state.isClicked ? "active-option-box" : "option-box";
    return (
      <>
        <div className="body-container">
          <div>
            <div className="question-container">
              <p>Question {this.state.quizSingleShowData.question_id + 1}</p>
              <p className="question">{this.state.quizSingleShowData.question}</p>
              <div className="option-container">
                {
                  this.state.quizSingleShowData?.options?.map((singleData: any, singleDataIndex: any) => {
                    return (
                      <div
                        key={singleDataIndex}
                        id={singleDataIndex}
                        className={this.state.optionNumber===singleDataIndex?'active-option-box':'option-box'}
                        onClick={()=>this.selectOption(singleDataIndex)}
                      >
                        {singleData.answer}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="button-container">
            <button className="previous-button" disabled={this.state.questionNumber===0?true:false} onClick={this.previousQuestion}>
              Previous
            </button>
            <button className= "submit-button"  disabled={this.state.answerState==null?true:false} onClick={this.onSubmit}>
              Submit
            </button>
            <button className="next-button" disabled={this.state.questionNumber === 20 ? true : false}  onClick={this.nextQuestion}>
              Next
            </button>
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <div className="main-container">
        {this.renderHeader()}
        {this.renderBody()}
      </div>
    );
  }
}

export default App;
