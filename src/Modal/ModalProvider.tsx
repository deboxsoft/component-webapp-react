import React, { useState, useRef } from 'react';
import { Provider } from './context';
import { BaseModalBackground } from './styles';

interface Props {
  children: React.ReactChild;
  BackgroundComponent?: React.ComponentType;
}

interface State {
  modalNode?: React.RefObject<HTMLElement>;
  BackgroundComponent?: React.ComponentType;
}

export const ModalProvider = ({ BackgroundComponent, children }: Props) => {
  const modalNode = useRef(null);
  const [state, setState] = useState<State>({
    modalNode,
    BackgroundComponent: BaseModalBackground
  });
  if (BackgroundComponent !== state.BackgroundComponent) {
    setState(_state =>
      Object.assign(_state, {
        BackgroundComponent
      })
    );
  }
  return <Provider></Provider>
};
