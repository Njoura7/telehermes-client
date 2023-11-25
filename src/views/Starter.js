import { Col, Row } from "reactstrap";
// import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";

//import Button from "../views/ui/Buttons";

const Starter = () => {
  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Balance"
            earning="300ft"
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="xp"
            subtitle="XP"
            earning="8000"
            icon="bi bi-star-half"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="Phone-number"
            subtitle="Phone number"
            earning="+3645"
            icon="bi bi-sort-numeric-down"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-into"
            title="Badges"
            subtitle="Badges"
            earning="210"
            icon="bi bi-bag"
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      {/* <Row>
        <Col xxl="12">
          <SalesChart />
        </Col>
      </Row> */}
      <h1>Milestones</h1>
      {/* waiting for  */}
      <article className="milestones">
        <div className="milestones-element">
          <div className="btn btn-secondary">Balance</div>
          <div>60%</div>
        </div>
        <div className="milestones-element">
          <div className="btn btn-info">Xp Farmer:</div> <div>86%</div>
        </div>
        <div className="milestones-element">
          <div className="btn btn-warning">Knowledge Guru:</div> <div>73%</div>
        </div>
      </article>
      {/***Table ***/}
      <Row>
        <Col lg="7" xxl="8" md="12">
          <ProjectTables />
        </Col>
        <Col md="12" lg="5" xxl="4">
          <Feeds />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
