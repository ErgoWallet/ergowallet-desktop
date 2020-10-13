import * as React from 'react';
import styled from "styled-components";

interface HexProps {
  backgroundColor?: any;
}

const Hex = styled.span<HexProps>`
  font-family: "Roboto Mono", monospace;
  background-color: ${props => props.backgroundColor};
`;

export default Hex;
