import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FullWidth = styled.div`
  margin-bottom: 1rem;
  padding: 0 1rem;
`;

function BackButton() {
  const navigate = useNavigate();
  return (
    <FullWidth>
      <button onClick={(e) => navigate(-1)}>Back</button>
    </FullWidth>
  );
}

export default BackButton;
