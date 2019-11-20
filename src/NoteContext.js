import React from 'react';

const noteContext = React.createContext({
  folders: ['folders test'],
  notes: ['notes test']
});

export default noteContext;