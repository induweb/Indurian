import React from 'react';

import Menu from './Menu';
import WindowHeader from './WindowHeader';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 100%;
  position: relative;
  width: 875px;
  height: 600px;
  background-image: url(images/window_03.png);
  background-size: cover;
  opacity: .95;
  // background: ${props => props.primary && 'palevioletred'};
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 85px;
    text-align: center;
`;


const LayoutWrapper = (props) => {
  return (
    <Wrapper className="index">
        <WindowHeader>Indurian</WindowHeader>
        <Container className="container">
            {props.children}
        </Container>
        <Menu path={props.children.props.path /*this props force re-render of header on each route change*/}></Menu>
    </Wrapper>
  )
};

export default LayoutWrapper;