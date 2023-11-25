import React, { useEffect, useState } from "react";
import { Card, CardText, CardTitle, Button, Row, Col } from "reactstrap";
import axios from "axios";
import { func } from "prop-types";

const Rewards = () => {
  const [fitnessXP, setFitnessXP] = useState(0);
  const [knowledgeXP, setknowledgeXP] = useState(0);
  const [steps,setSteps]=useState(600);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      fetchStepsData(code);
    } else {
      initiateAuthProcess();
    }
  }, []);

  const initiateAuthProcess = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/rewards/stepsAuth?username=exampleuser');
      if (response.data.url) {
        window.location.href = response.data.url;
      } else if (response.data.token) {
        console.log('Token already exists for the user:', response.data.token);
      }
    } catch (error) {
      console.error('Error initiating auth process:', error);
    }
  };

  async function fetchStepsData(code) {
    try {
      const fitnessResponse = await axios.get(`http://localhost:8080/api/rewards/steps?code=${code}`);
      const totalSteps = fitnessResponse.data.totalSteps;
      setSteps(totalSteps);
    } catch (error) {
      console.error("Error in fetching steps data:", error);
    }
  }
  useEffect(()=>{
    async function getFitXP(){
      try {
        const response=await axios.get("http://localhost:8080/api/rewards/fit?username=exampleuse2r")
        setFitnessXP(response.data)
        const res=await  axios.put(`http://localhost:8080/api/rewards/fitnessxp?username=exampleuse2r&newxp=${steps}`)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    async function getKnowledgeXP(){
      try {
        const response=await axios.get("http://localhost:8080/api/rewards/knowledge?username=exampleuse2r")
        setknowledgeXP(response.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    getFitXP()   
    getKnowledgeXP()
  },[])

  return (
    <div>
      <h5 className="mb-3">Rewards</h5>
      <Row>
        <Col md="6" lg="4">
          <Card body>
            <CardTitle tag="h5">Fitness</CardTitle>
            <CardText>{steps} steps</CardText>
            <CardText>{fitnessXP} XP </CardText>
            <div>
              <Button color="light-warning">Go somewhere</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body className="text-center">
            <CardTitle tag="h5">Knowledge</CardTitle>
            <CardText>{knowledgeXP} XP</CardText>
            <div>
              <Button color="light-danger" href="http://localhost:3000/#/quiz">
                Take Quiz{" "}
              </Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body className="text-end">
            <CardTitle tag="h5">Guess my number</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button color="light-success" href="http://localhost:3000/#/gmn">
                Play the game
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Rewards;