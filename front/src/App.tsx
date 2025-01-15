// src/App.tsx
import React, { useState } from 'react';
import axios from "axios";
import { useQuery, useMutation, gql } from '@apollo/client';



const createUser = async (username, password, name, lastName) => {
  const query = `
    mutation {
    registerUser(createUser: {
    username:"${username}",
    password:"${password}",
    name: "${name}",
    lastName: "${lastName}",

  }) {
  	username
    password
    name
    lastName
    id
    createdAt
  }
}
  `;
  const response = await axios.post('http://localhost:3000/graphql', {
    query: query,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response
}

const loginUser = async (username, password) => {
  const query = `
    mutation {
    loginUser(loginUserDto: {
    username:"${username}",
    password:"${password}",
  }) {
  	username
    password
    name
    lastName
    id
    token
    createdAt
  }
}
  `;
  const response = await axios.post('http://localhost:3000/graphql', {
    query: query,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response
}

const userList = async (token) => {
  const query = `
    query {
    findAll {
  	username
    password
    name
    lastName
    id
    createdAt
  }
}
  `;
  const response = await axios.post('http://localhost:3000/graphql', {
    query: query,
  }, {
    headers: {
      'Content-Type': 'application/json',
      token
    },
  });
  return response
}

const findOne = async (token, id) => {
  const query = `
    query {
    findOne (id:${id}){
  	username
    password
    name
    lastName
    id
    createdAt
  }
}
  `;
  const response = await axios.post('http://localhost:3000/graphql', {
    query: query,
  }, {
    headers: {
      'Content-Type': 'application/json',
      token
    },
  });
  return response
}



const CreateUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await createUser(username, password, name, lastName);
    console.log('User created:', data.registerUser);
    if (data.errors) {
      alert(data.errors[0].message);
      return
    }
    alert('user created successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <button type="submit">Create User</button>
    </form>
  );
};

const LoginUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await loginUser(username, password);
    if (data.errors) {
      alert(data.errors[0].message);
      return
    }
    localStorage.setItem('token', data.data.loginUser.token);
    console.log('Logged in, token:', data.data.loginUser.token);
    alert('user loged in successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

const ListUsers: React.FC = () => {
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token')

    const { data } = await userList(token);
    if (data.errors) {
      alert(data.errors[0].message);
      return
    }
    setUsers(data.data.findAll)
  };

  return (<>
    <button type='submit' onClick={handleSubmit}>users list</button>
    <ul>
      {users.map((user: any) => (
        <li key={user.id}>
          username: {user.username} -  name : {user.name}  {user.lastName} -id : {user.id}
        </li>
      ))}
    </ul>
  </>

  );
};


const FindUser: React.FC = () => {
  const [id, setId] = useState(null);
  const [user, setUser] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token')

    const { data } = await findOne(token, id);
    if (data.errors) {
      alert(data.errors[0].message);
      return
    }
    setUser(data.data.findOne)
  };
  return (
    <div>
      <input type="text" placeholder="User ID" value={id} onChange={(e) => setId(e.target.value)} />
      <button type='submit' onClick={handleSubmit}>find</button>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>Name: {user.name} {user.lastName} </p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <>
      <div>
        <h1>Create User</h1>
        <CreateUser />
        <h1>Login User</h1>
        <LoginUser />
        <h1>List Users</h1>
        <ListUsers />
        <h1>Find User</h1>
        <FindUser />
      </div>
    </>
  );
};

export default App;