import { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/ThemeContext';
import { RiSunFill } from 'react-icons/ri';
import { BsMoon } from 'react-icons/bs';
const ThemeToggler = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);

  return (
    <Toggler>
      <TogglerInput
        onChange={() => {
          toggleTheme?.();
        }}
        checked={mode === 'light'}
        type="checkbox"
      />
      <Slider />
      {mode === 'dark' && (
        <Sun>
          <RiSunFill color="#ffee00" size={20} />
        </Sun>
      )}
      {mode === 'light' && (
        <Moon>
          <BsMoon color="#4a029c" size={20} />
        </Moon>
      )}
    </Toggler>
  );
};

export default ThemeToggler;
const Toggler = styled.label`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 25px;
`;
const TogglerInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + span {
    /* background-color: #2196f3; */
  }
  &:focus + span {
    /* box-shadow: 0 0 1px #2196f3; */
  }
  &:checked + span::before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;
const Sun = styled.span`
  position: absolute;
  top: 3px;
  right: 3px;
`;
const Moon = styled.span`
  position: absolute;
  top: 3px;
  left: 3px;
`;
const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  border-radius: 34px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  &::before {
    border-radius: 50%;
    position: absolute;
    content: '';
    height: 17px;
    width: 17px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;
