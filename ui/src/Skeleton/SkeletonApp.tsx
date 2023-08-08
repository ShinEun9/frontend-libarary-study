import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Skeleton from "./Skeleton";

const Base = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 12px;
  row-gap: 24px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgb(0 0 0 /4%) 0px 4px 16px 0px;
  border-radius: 4px;
`;
const ImageWrapper = styled.div`
  width: 100%;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Info = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`;
const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 24px;
`;
const Description = styled.p`
  margin: 8px 0 0 0 0;
  padding: 0;
  font-size: 16px;
`;

const Placeholder: React.FC = () => {
  return (
    <Container>
      <ImageWrapper>
        <Skeleton height={220} />
      </ImageWrapper>
      <Info>
        <Skeleton height={29} rounded />
        <div style={{ height: "8px" }}></div>
        <Skeleton height={29} rounded />
      </Info>
    </Container>
  );
};

const Item: React.FC = () => {
  return (
    <Container>
      <ImageWrapper>
        <Image src="https://images.unsplash.com/photo-1690823992618-e7010fe130d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=427&q=80" />
      </ImageWrapper>
      <Info>
        <Title>palm trees under the sunset sky</Title>
        <Description>peaceful and serene</Description>
      </Info>
    </Container>
  );
};

function SkeletonApp() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="App">
      <Base>
        {loading
          ? Array.from({ length: 25 }).map((_, idx) => (
              <Placeholder key={idx} />
            ))
          : Array.from({ length: 25 }).map((_, idx) => <Item key={idx} />)}
      </Base>
    </div>
  );
}

export default SkeletonApp;
