import { useState } from 'react';

function LoginForm({ onLogin }) {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {

    event.preventDefault();

    // Call the onLogin function passed as a prop to initiate the login process

    await onLogin({ username, password });

  };

  return (

    <form onSubmit={handleSubmit}>

      <label>

        Username:

        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      </label>

      <label>

        Password:

        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      </label>

      <button type="submit">Log in</button>

    </form>

  );

}

export default LoginForm;

