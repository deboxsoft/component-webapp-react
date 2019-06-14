import { useContext } from 'react';
import { History as IHistory } from 'history';
import { NavigationContext } from './NavigationContext';

export const useHistory = () => useContext(NavigationContext).navigation.history;
