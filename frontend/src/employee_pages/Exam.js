/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './CSS/examCSS.css'
import DashboardNav from "../main_pages/DashboardNav.js";
import emailImage1 from "./exampictures/1.png";
import emailImage2 from "./exampictures/2.png";
import emailImage3 from "./exampictures/3.png";
import emailImage4 from "./exampictures/4.png";
import emailImage5 from "./exampictures/5.png";
import emailImage6 from "./exampictures/6.jpg";
import emailImage7 from "./exampictures/7.png";
import emailImage8 from "./exampictures/8.png";
import axios from 'axios'
import certificationImage from '../main_pages/MainMenuPictures/Certificate.png';

class Exam extends Component {
  constructor() {
    super();
    this.state = {
      userData: "",
      username: '',
      examID: '',
      passed: false,
      takenExam: false,
      currentIndex: 0,
      score: 0,
      showAnswer: false,
      selectedOption: '',
      selectedAnswers:[{selectedOption: ''}, {userName: ''}, {userScore: ''}, {passedVerdic: false}],
    };
 
  this.changeScore = this.changeScore.bind (this)
 }

 componentDidUpdate(prevProps, prevState) {
  if (this.state.currentIndex !== prevState.currentIndex) {
    this.setState({ selectedOption: '' });
  }
}


 componentDidMount() {
  fetch("http://localhost:4000/app/Dashboard", {
      method: "POST",
      crossDomain: true,
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
      }, 
      body: JSON.stringify ({
          token: window.localStorage.getItem("token"),
          
      }),
  })
  
  .then((response) => response.json())
  .then((data) => {
      console.log(data, "userData");
      this.setState({ userData: data.data})
  });
 }


changeScore(event) {
  this.setState({
    changeScore:event.target.value
  })
}



  examData = [
    {
      question: 'What is the name of the phishing attack that is aimed at executives or other prominent figures in an organisation?',
      options: ['A.	Man-In-The-Middle Phishing ', 
      'B.	Email Spoofing', 
      'C.	Whaling', 
      'D.	Clone Phishing'],
      answer: 'C.	Whaling'
    },
    {
      question: '"If you get an Email from a friend who needs your password, you should never give it out unless the friend says it’s an emergency." This is an example of what attack type?',
      options: ['A.	Angler Phishing', 
      'B.	Vishing', 
      'C.	Clone Phishing', 
      'D.	Spear Phishing'],
      answer: 'D.	Spear Phishing'
    },
    {
      question: 'What kind of attack consists of intercepting communication between two parties to steal sensitive data?',
      options: ['A.	Smishing', 
      'B.	Man-In-The-Middle Phishing', 
      'C.	Whaling', 
      'D.	Pharaming'],
      answer: 'B.	Man-In-The-Middle Phishing'
    },

    {
      question: 'Which form of social engineering involves the attacker dialling the target and attempting to steal sensitive information?',
      options: ['A.	Email Spoofing', 
      'B.	Deceptive Phishing', 
      'C.	Spear Phishing', 
      'D.	Vishing'],
      answer: 'D.	Vishing'
    },

    {
      question: 'What phrase best describes creating a fraudulent website that closely resembles a genuine site in order to deceive people into providing sensitive information by contaminating their DNS cache with false information?',
      options: ['A.	Pharaming', 
      'B.	Man-In-The-Middle Phishing', 
      'C.	Content injection', 
      'D.	Email Phishing'],
      answer: 'A.	Pharaming'
    },


    {
      question: 'Is the Email in the image below authentic or a phishing email?',
      image: emailImage1,
      options: ['Phishing', 'Legitimate'],
      answer: 'Phishing'
    }, 
    {
      question: 'Is the Email in the image below authentic or a phishing email?',
      image: emailImage2,
      options: ['Legitimate', 'Phishing'],
      answer: 'Legitimate'
    }, 
    {
      question: 'Is the Text Message in the image below authentic or a phishing email?',
      image: emailImage3,
      className: 'image-size',
      options: ['Phishing', 'Legitimate'],
      answer: 'Phishing'
    }, 
    {
      question: 'Is the Email in the image below authentic or a phishing email?',
      image: emailImage4,
      options: ['Legitimate', 'Phishing'],
      answer: 'Phishing'
    }, 
    {
      question: 'Is the Website in the image below authentic or a phishing email?',
      image: emailImage5,
      className: 'image-size',
      options: ['Phishing', 'Legitimate'],
      answer: 'Phishing'
    }, 
    {
      question: 'Is the Website in the image below authentic or a phishing email?',
      image: emailImage6,
      options: ['Legitimate', 'Phishing'],
      answer: 'Phishing'
    }, 
    {
      question: 'Is the Text Message in the image below authentic or a phishing email?',
      image: emailImage7,
      className: 'image-size',
      options: ['Phishing', 'Legitimate'],
      answer: 'Legitimate'
    }, 
    {
      question: 'Is the Email in the image below authentic or a phishing email?',
      image: emailImage8,
      options: ['Legitimate', 'Phishing'],
      answer: 'Phishing'
    }, 


    {
      question: '"Requests that you submit information about your account" - What does this generally indicate?',
      options: ['Phishing', 'Legitimate'],
      answer: 'Phishing'
    },
    {
      question: '"Uses your first and last name to address you." - What does this generally indicate?',
      options: ['Legitimate', 'Phishing'],
      answer: 'Legitimate'
    },
    {
      question: '"Sends you to a website with a security certificate that matches the domain name of the website" - What does this generally indicate?',
      options: ['Phishing', 'Legitimate'],
      answer: 'Legitimate'
    },
    {
      question: '"Creates an impression of urgency" - What does this generally indicate?',
      options: ['Legitimate', 'Phishing'],
      answer: 'Phishing'
    },
    {
      question: '"Your email system has classified this email as spam or junk mail." - What does this generally indicate?',
      options: ['Phishing', 'Legitimate'],
      answer: 'Legitimate'
    },
    {
      question: '"Has an attachment that comes with a warning that it might be contaminated with malware that will harm your machine." - What does this generally indicate?',
      options: ['Legitimate', 'Phishing'],
      answer: 'Legitimate'
    },
    {
      question: '"Takes you to a webpage with a starting https://" - What does this generally indicate?',
      options: ['Phishing', 'Legitimate'],
      answer: 'Legitimate'
    },
    {
      question: '"Requests that you call a number provided in the email" - What does this generally indicate?',
      options: ['Legitimate', 'Phishing'],
      answer: 'Phishing'
    },


    {
      question: 'Which of the following preventative measures against phishing attacks is most effective?',
      options: ['A.	Captcha verification', 
      'B.	Encryption of emails', 
      'C.	Two-factor authentication',],
      answer: 'C.	Two-factor authentication'
    },
  ];

  handleAnswer = (option) => {
    const { currentIndex, score } = this.state;
    const currentQuestion = this.examData[currentIndex];
  
    // create a new object for the user's selection
    const selected = {
      question: currentQuestion.question,
      selectedOption: option,
    };
  
    // update the selectedAnswers array with the new object
    this.setState(prevState => ({
      selectedAnswers: [...prevState.selectedAnswers.slice(0, currentIndex), selected, ...prevState.selectedAnswers.slice(currentIndex + 1)],
    }));
  
    if (option === currentQuestion.answer) {
      this.setState({ score: score + 1 });
    }
  
    this.setState({ selectedOption: option, showAnswer: true });
  }


  handleNext = () => {
    const { currentIndex } = this.state;
    this.setState({ currentIndex: currentIndex + 1, showAnswer: false });
  }

  handleFinishExam = (event) => {
    event.preventDefault();
  
    const submitResults = {
      examID: this.state.userData.username,
      passed: this.state.score >= 18,
      takenExam: true,
      score: this.state.score,
    //  userName: this.state.userData.username, // add the username property
    }
  
    const selectedAnswers = this.state.selectedAnswers.map(answer => ({
      ...answer,
      userName: this.state.userData.username, // add the userName property to each answer
      passedVerdic: this.state.score >= 18, 
      userScore: this.state.score,
    }));
  

  
    axios.put('http://localhost:4000/app/update/' + this.state.userData._id, { selectedAnswers })
    .then((res) => {
      console.log(res.data)
      console.log('selected options successfully updated')
    }).catch((error) => {
      console.log(error)
    })

    axios.put('http://localhost:4000/app/update/' + this.state.userData._id, submitResults)
    .then((res) => {
      console.log(res.data)
      console.log('selected options successfully updated')
    }).catch((error) => {
      console.log(error)
    })
  }
  
  



  downloadCertification = (event) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = certificationImage;
    link.download = 'certification.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  render() {
    const { currentIndex, score, showAnswer, selectedOption } = this.state;
    const currentQuestion = this.examData[currentIndex];
  
    const threshold = 18; // score threshold

    const {userData} = this.state;

    console.log(userData);
    if (currentIndex === this.examData.length) {
      let result;
      if (score >= threshold) {
        result = 'pass';
        
      } else {
        result = 'fail';
      }
  
      return (
        <div>
          <nav>
            <div className="wrapper">
              <DashboardNav />
              <div className="main_content">
                <div className="info">
                  <div className="text_content">
                    <div className="mx-auto" style={{ width: '500px' }}>
                      <form>
                        <h1 className="alignC">Exam finished!</h1>
  
                        <p>Your score: {score} / {this.examData.length}</p>
                        <p>Result: {result}</p>
                        <br />
                        <button className ="view-link" onClick={this.handleFinishExam}>Submit Score</button>
                        {score >= threshold && (
                          <>
                            <button className ="view-link" style={{background: "green"}}onClick={this.downloadCertification}>Download Certification</button>
                          </>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      );
    }
    return (
      
      <div>
        <nav>
          <div className="wrapper">
            <DashboardNav />
            <div className="main_content">
              <div className="info">
                <div className="text_content">
                  <div className="mx-auto" style={{ width: '500px' }}>

                  {!userData.passed && !userData.takenExam &&(
                  
                    <form>
                      
                      <h4 >{currentQuestion.question}</h4>
                      <br />
                      {currentQuestion.image && (
                        <img src={currentQuestion.image} alt="Exam question" className="image-size" />
                      )}
                      <br />
                      <br />
                      <br />
                      {currentQuestion.options.map((option, index) => (
                        <Form.Check
                          key={index}
                          type='radio'
                          label={option}
                          name='radio-group'
                          checked={selectedOption === option}
                          onChange={() => this.handleAnswer(option)}
                         // disabled={showAnswer}
                        />
                      ))}
                      <br />
                      <br />
                      {/*showAnswer && <div>{currentQuestion.answer}</div>*/}
                       <Button onClick={this.handleNext} disabled={!selectedOption}>Next</Button>
                    </form>
                    )}

                      {userData.passed && userData.takenExam &&(
                      <form>
                      <h1 className="alignC">Exam finished!</h1>

                      <p>Your score: {userData.score} / {this.examData.length}</p>
                      <br />
                        <button className ="view-link" style={{background: "green"}}onClick={this.downloadCertification}>Download Certification</button>
                    </form>
                   )}

                    {!userData.passed && userData.takenExam &&(
                      <form>
                      <h1 className="alignC">Exam finished!</h1>

                      <p>Your score: {userData.score} / {this.examData.length}</p>
                      <br />
                        
                    </form>
                   )}

                    {userData.passed && !userData.takenExam &&(
                      <h4>Exam not avaliable, please contact admin</h4>
                   )}


                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}  

export default Exam;