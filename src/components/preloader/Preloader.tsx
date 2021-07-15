import React from 'react'
import styled from 'styled-components'

const LinePreloader = styled.div`
    height:4px;
    background:linear-gradient(to right,#818C99,#818C99);
    margin:auto;
    border-radius:4px;
    background-size:20%;
    background-repeat:repeat-y;
    background-position:-25% 0;
    animation:scroll 1.2s ease-in-out infinite;
    opacity: 0.5;
    @keyframes scroll{
    50%{background-size:80%}
    100%{background-position:125% 0;}
    }
`

const Preloader = () => {
  return <LinePreloader/>
}

export default React.memo(Preloader)
