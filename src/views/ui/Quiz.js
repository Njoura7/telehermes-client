import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import axios from "axios";
import { func } from "prop-types";



const Quiz = () => {
  const username="exampleuse2r";
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [quizTaken, setQuizTaken] = useState(false);
  const [quizQuestions,setQuizQuestions]=useState([])
  const [quizAnswers,setQuizAnswers]=useState([])
  const [quizFinished, setQuizFinished] = useState(false);

  async function fetchQuestions(){
    try {
      const response = await axios.get("http://localhost:8080/api/rewards/getQuiz")
   
      const questions = response.data.map(item => item.question);
      const answers = response.data.map(item => item.answer);
      setQuizQuestions(questions);
      setQuizAnswers(answers);
      console.log("questions",questions)
      console.log("answers",answers)
    } catch (error) {
console.log(error)
    }
  }
  //allow users to play once in 24 hours
  useEffect(() => {
    async function fetchData() {
      try {
          const lastTaken = localStorage.getItem("lastQuizTaken");
          if (
              lastTaken &&
              new Date().getTime() - new Date(lastTaken).getTime() < 24 * 60 * 60 * 1000
          ) {
              setQuizTaken(true);
          } else {
              await fetchQuestions();
          }
      } catch (error) {
          console.error("Error fetching questions: ", error);
      }
  }

  fetchData();
  }, []);
  useEffect(() => {
    if (quizFinished) {
      async function sendScore(){

        axios.put("http://localhost:8080/api/rewards/save-quiz-score", { username, score })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error("There was an error saving the quiz score", error);
        });
        
        // Reset quizFinished to be ready for the next quiz
        setQuizFinished(false);
      }
      sendScore()
    }
}, [quizFinished]);
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score => score + 10)      
     // Each correct answer gives 10 XP
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      setQuizFinished(true); 
      localStorage.setItem("lastQuizTaken", new Date().toISOString());
    }
  };

  if (quizTaken) {
    return (
      <div>You have already taken the quiz today. Come back tomorrow!</div>
    );
  }

  return (
    <div>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          Quiz Game
        </CardTitle>
        <CardBody>
          <Container>
            {showScore ? (
              <div>
                You scored {score} out of {quizQuestions.length*10}
              </div>
            ) : (
              <div>
                <div className="mb-2">
                  <span>Question {currentQuestion + 1}</span>/
                  {quizQuestions.length}
                </div>
                <div className="mb-4">
                  {quizQuestions[currentQuestion]}
                </div>
                <div>
                <Button onClick={() => handleAnswerOptionClick('True' === quizAnswers[currentQuestion])} className="me-2 mb-2">
                   True
                </Button>
                <Button onClick={() => handleAnswerOptionClick('False' === quizAnswers[currentQuestion])} className="me-2 mb-2">
                  False
                </Button>
                </div>
              </div>
            )}
          </Container>
        </CardBody>
      </Card>
    </div>
  );
};

export default Quiz;
