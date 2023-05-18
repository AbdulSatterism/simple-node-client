import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data)
      })
  }, []);

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUsers = [...users, data];
        setUsers(newUsers)
      })
      .catch(err => console.log(err))
    event.target.reset();
  }

  return (
    <div className="App">

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder='name' />
        <br />
        <input type="email" name="email" id="" placeholder='email' />
        <br />
        <button type="submit">add user</button>
      </form>

      <h2>Users :{users.length}</h2>
      <div>
        {
          users.map(user => <p key={user._id}>{user.name} {user.email}</p>)
        }
      </div>
    </div>
  );
}

export default App;
