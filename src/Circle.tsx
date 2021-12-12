import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

interface CircleProps {
  // interface는 object를 설명해주는 것
  bgColor: string;
  borderColor?: string; // ?를 붙여주면 optional
  text?: string;
}
function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  //   const [counter, setCounter] = useState(1); Typescript가 초기값을 가지고 타입을 지정해줌
  // 하지만 만약에 string과 number를 동시에 사용하고 싶다면? 아래 처럼 작성
  //   const [value, setValue] = useState<number | string>(0);
  //   setValue(2);
  //   setValue("Hello");
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  ); // ??로 default를 정해줌
}

export default Circle;
