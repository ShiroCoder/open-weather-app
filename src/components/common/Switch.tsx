import React from "react";
import styled from "styled-components";

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: relative;
  display: inline-block;
  width: 42px;
  height: 24px;
  background-color: #ccc;
  border-radius: 24px;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
`;

const SwitchLabel = styled.label`
  ${SwitchInput}:checked + ${Slider} {
    background-color: #2196f3;
  }

  ${SwitchInput}:checked + ${Slider}:before {
    transform: translateX(18px);
  }
`;

interface SwitchProps {
  label: string;
  checked: boolean;
  className?: string;
  onChange: () => void;
}

const Switch: React.FC<SwitchProps> = ({
  className,
  label,
  checked,
  onChange,
}) => {
  return (
    <SwitchContainer className={className}>
      <span>{label}</span>
      <SwitchLabel>
        <SwitchInput type="checkbox" checked={checked} onChange={onChange} />
        <Slider />
      </SwitchLabel>
    </SwitchContainer>
  );
};

export default Switch;
