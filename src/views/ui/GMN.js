import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Input,
  Button,
  FormGroup,
  Label,
  Badge,
} from "reactstrap";
import axios from "axios";
const GMN = () => {
  const [secretNumber, setSecretNumber] = useState("");
  const [guess, setGuess] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [givenUp, setGivenUp] = useState(false);

  // Function to generate a random 4-digit number
  const generateSecretNumber = () => {
    let number = "";
    while (number.length < 4) {
      const digit = Math.floor(Math.random() * 10).toString();
      if (!number.includes(digit)) {
        number += digit;
      }
    }
    return number;
  };

  useEffect(() => {
    setSecretNumber(generateSecretNumber());
  }, []);

  // Function to compare guess with the secret number
  const checkGuess = () => {
    let feedback = "";
    let correctCount = 0;
    console.log(secretNumber)
    for (let i = 0; i < guess.length; i++) {
      if (secretNumber.includes(guess[i])) {
        if (secretNumber[i] === guess[i]) {
          feedback += "T";
          correctCount++;
        } else {
          feedback += "V";
        }
      }
    }
    setFeedbacks([...feedbacks, { guess, feedback }]);
    setGuess("");

    if (correctCount === 4) {
      setGameWon(true);
    }
  };
  useEffect(()=>{
    async function updateKnowledgeXP(){
      try {
        const response=await axios.put("http://localhost:8080/api/rewards/save-quiz-score?username=exampleuse2r&score=40)")
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    updateKnowledgeXP()   
  },[gameWon])

  const handleGiveUp = () => {
    setGivenUp(true);
  };

  return (
    <div>
      <Col xs="12" md="6">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Guess My Number
          </CardTitle>
          <CardBody>
            <p>
              Try to guess the 4-digit number. Each "T" means the right digit in
              the right position, and "V" means a correct digit but in the wrong
              position. Good luck!
            </p>
            <FormGroup className="d-flex align-items-center">
              <Label for="numberGuess" className="me-2">
                Enter your guess:
              </Label>
              <Badge
                color="secondary"
                onClick={givenUp ? null : handleGiveUp}
                style={{ cursor: "pointer" }}
              >
                {givenUp || gameWon ? secretNumber : "****"}
              </Badge>
              {!gameWon && !givenUp && (
                <Button
                  size="sm"
                  color="danger"
                  className="ms-2"
                  onClick={handleGiveUp}
                >
                  Give Up
                </Button>
              )}
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                id="numberGuess"
                maxLength="4"
                disabled={gameWon || givenUp}
              />
            </FormGroup>
            <Button
              color="primary"
              onClick={checkGuess}
              disabled={gameWon || givenUp}
            >
              Guess
            </Button>
            {gameWon ? (
              <div className="mt-3">
                Congratulations! The number was {secretNumber}.
              </div>
            ) : null}
            <div className="mt-3">
              <strong>Feedback:</strong>
              <ul>
                {feedbacks.map((item, index) => (
                  <li key={index}>
                    {item.guess}: {item.feedback}
                  </li>
                ))}
              </ul>
            </div>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default GMN;
