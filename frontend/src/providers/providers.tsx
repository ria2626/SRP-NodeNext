'use client'; // if you're using the new app router — otherwise you can omit this

import { Provider } from 'react-redux';
import { store } from '../store';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
