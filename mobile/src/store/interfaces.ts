import { ReactElement } from 'react';

export type Action = {
  type: string;
  payload: any;
};

export type ProviderProps = {
  children?: ReactElement | ReactElement[] | string;
  init: Init;
};

type Init = {
  initialState?: any;
  reducer: any;
  setters: any;
};

export type Ctx = {
  store: any;
  dispatch: React.Dispatch<unknown>;
};
