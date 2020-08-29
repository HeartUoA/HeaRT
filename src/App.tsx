import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

type User = {
  name: string;
  course: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>();

  const getUsers = () => {
    fetch('/api/users').then(res => res.json()).then(setUsers);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello. Welcome to this HeaRT project. The README will talk you through many of the 
          yarn commands that you can use to get started with this project. Have a look, play
          around and go ahead and try the endpoint test below. If you get a user string to appear, you've
          set everything up properly. If not, check your browser console to look for errors.
          Reach out to Preet if you need help :)
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br />
        <button className="App-link" onClick={getUsers}>Test endpoint</button>
        {users && <ul>
          {users.map(user => <li key={user.name}>{`${user.name}, teaches the course: ${user.course}`}</li>)}
        </ul>}
      </header>
    </div>
  );
};

export default App;
