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
    isVisited: any;
    quizFullData: any;
    quizSingleShowData: any;
    counter: number;
    pointer: number;
    selectedOption: boolean;
    quizSingleData: any;
    visibleCounter: number;
    optionNumber: any;
    answerState: any;
    check:boolean;
    final:boolean;
    colorCircle: string;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      questionNumber: 0,
      answered: 0,
      unanswered: 21,
      isClicked: false,
      isVisited: false,
      quizFullData: QuizData,
      selectedOption: false,
      quizSingleShowData: [],
      quizSingleData: QuizData[0],
      counter: 0,
      pointer: 0,
      check:false,
      final:false,
      visibleCounter: 0,
      answerState: null,
      optionNumber:null,
      colorCircle: ''
    };
  }

  componentDidMount() {
    this.setState({ quizSingleShowData: this.state.quizFullData[this.state.counter] })
  }

  nextQuestion = (index: any) => {
    if (this.state.counter < length - 1) {
      this.setState({ counter: this.state.counter + 1 }, () => {
        this.setState({ quizSingleShowData: this.state.quizFullData[this.state.counter] })
      })
      this.state.questionNumber = this.state.counter + 1
      this.state.quizFullData[this.state.counter].isVisited = true
      this.state.optionNumber=null
    }
  };

  previousQuestion = (index: any) => {
    if (this.state.counter > 0) {
      this.setState({ counter: this.state.counter - 1 }, () => {
        this.setState({ quizSingleShowData: this.state.quizFullData[this.state.counter] })
      })
      this.state.questionNumber = this.state.counter - 1
      this.state.quizFullData[this.state.counter].isVisited = true
    }
  };

  handleClick = (e: any, index: any) => {
    this.setState({
      quizSingleShowData: this.state.quizFullData[index + 1], counter: index
    })
    this.state.quizFullData[index].isVisited = true
  };

  onSubmit = () => {

  };

  selectOption = (singleDataIndex: any) => {
    this.state.quizFullData.map((item: any) => {
      this.state.quizFullData[this.state.counter].status = true;
      this.state.quizFullData[this.state.counter].selected = singleDataIndex;
    })
    this.setState({
      optionNumber: this.state.quizFullData[this.state.counter].selected,
      answerState: true,
    })

    if (this.state.quizFullData[this.state.counter].image===false){
      this.setState({ answered: this.state.answered + 1 })
      this.state.quizFullData[this.state.counter].image = true
    }
    
    console.log(this.state.quizFullData)
  };

  


  renderHeader = () => {
    return (
      <>
        <div className="action-bar">
          {this.state.quizFullData.map((item: any, index: any) => {
            return (
              <>
                <div
                  key={index}
                  id={index}

                  className='ques-circle'
                  onClick={(e) => this.handleClick(e, index)}
                  style={{ backgroundColor: this.state.counter == item.question_id ? "yellow" : item.status === true ? "plum" : item.isVisited === true ? "yellowgreen" : "red" }}
                >
                  {index + 1}
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
    return (
      <>
        <div className="body-container">
          <div>
            <div className="question-container">
              <p>Question {this.state.counter + 1}</p>
              <p className="question">{this.state.quizFullData[this.state.counter].question}</p>
              <div className="option-container">
                {
                  this.state.quizFullData[this.state.counter].options.map((singleData: any, singleDataIndex: any) => {
                    return (
                      <div
                        key={singleDataIndex}
                        id={singleDataIndex}
                        className={singleDataIndex === this.state.quizFullData[this.state.counter].selected ? 'active-option-box' : 'option-box'}
                        onClick={() => this.selectOption(singleDataIndex)}
                      >
                        {singleData.answer}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="button-container">
            <button className="previous-button" disabled={this.state.counter === 0 ? true : false} onClick={this.previousQuestion}>
              Previous
            </button>
            <button className="submit-button" disabled={this.state.counter !== 20 ? true : false} onClick={this.onSubmit}>
              Submit
            </button>
            <button className="next-button" disabled={this.state.questionNumber === 21 ? true : false} onClick={this.nextQuestion}>
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
