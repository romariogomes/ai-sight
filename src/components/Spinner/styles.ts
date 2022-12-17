import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.default};
`;

export const SpinnerAnimation = styled.div`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-left-color: #0080cd;
  border-radius: 50%;
  width: 3vh;
  height: 3vh;
  animation: spin 1s linear infinite;
`;

export const LoadingMessage = styled.div`
  margin-top: 10px;
`;
