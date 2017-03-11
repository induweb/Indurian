import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  max-width: 100%;
  width: 596px;
  height: 120px;
  position: absolute;
  top: -50px;
  left: 50%;
  margin-left: -298px;
  background-image: url(../images/window_06.png);
  background-size: cover;
`;

const H2Header = styled.h2`
  text-align: center;
  margin: 30px 0;
  font-size: 36px;
      color: #90a8a4;
    text-shadow: 0px 0px 8px #fff;
`;

class WindowHeader extends React.Component {
    render() {
        return (
            <Background>
                <H2Header>{this.props.children}</H2Header>
            </Background>
        );
    }
}

export default WindowHeader;