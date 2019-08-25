import React, { useState, useMemo } from 'react';
import { ModalStyled } from './styles';

interface Props {
  children: React.ReactChild;
  BackgroundComponent?: React.ComponentType;
  portalId?: string;
}

interface State {
  BackgroundComponent?: React.ElementType;
}

interface Context extends State {
  modalNode?: HTMLElement | '' | null;
}

export const Context = React.createContext<Context>({});

export const ModalProvider = ({ BackgroundComponent, children, portalId }: Props) => {
  const [state, setState] = useState<State>({
    BackgroundComponent: ModalStyled
  });

  // create portal
  const modalNode = useMemo(() => {
    let portal = portalId && document.getElementById(portalId);
    if (!portal) {
      portal = document.createElement('div');
      portal.id = portalId || '__modal_';
      document.body.appendChild(portal);
    }
    return () => portal;
  }, [portalId]);

  if (BackgroundComponent !== state.BackgroundComponent) {
    setState(_state =>
      Object.assign(_state, {
        BackgroundComponent
      })
    );
  }

  return (
    <Context.Provider
      value={{
        modalNode: modalNode(),
        BackgroundComponent: state.BackgroundComponent
      }}
    >
      {children}
    </Context.Provider>
  );
};
