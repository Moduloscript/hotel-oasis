import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.div`
  /* background-color: orangered; */
  padding: 20px;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
        <Row type="horizontal">
          <Heading type="h1">The Wild Oasis</Heading>

          <div>
            <Heading as="h2">Check In and Out</Heading>
            <Button size="large" variant="primary">Check in</Button>
            <Button size="medium" variant="danger">Check Out</Button>
          </div>
        </Row>

        <Row>
          <Heading as="h3">Form</Heading>
          <form>
            <Input type="number" placeholder="Number of guests" />
          </form>
          </Row>
          </Row>
      </StyledApp>
    </>
  );
};

export default App;
