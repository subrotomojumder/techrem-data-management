import { useRouter } from 'next/router';
import { useState } from 'react';

function LoginForm({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    console.log(router.query.redirect);
    
    const from = router.query.redirect || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        // const res = await fetch(`http://localhost:5000/users/login?email=sampodnath@gmail.com`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });
        // const data = await res.json();
        // console.log(data.data);
        if (username && password) {
            setUser({username, password})
            setTimeout(()=> {
                // router.replace(from)
            }, 1000)
        } else {
            alert("field empty")
        }
    }
    return (

        <form onSubmit={handleLogin}>
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

