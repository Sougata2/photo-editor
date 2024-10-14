import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ImageContainer = styled.div`
  display: flex;
  width: 20rem;
  height: 15rem;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const Button = styled.button``;
function ImageCard({ photo }) {
  const navigate = useNavigate();
  return (
    <Card>
      <ImageContainer>
        <Image src={photo.src.original} alt={photo.alt} />
      </ImageContainer>
      <Button onClick={() => navigate(`/photo/${photo.id}`)}>
        Add Caption
      </Button>
    </Card>
  );
}

export default ImageCard;
