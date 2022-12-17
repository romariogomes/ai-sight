import { Container, LoadingMessage, SpinnerAnimation } from "./styles";

export const Spinner = ({ text = "Loading" }) => (
  <Container>
    <SpinnerAnimation />
    <LoadingMessage>{text}</LoadingMessage>
  </Container>
);
