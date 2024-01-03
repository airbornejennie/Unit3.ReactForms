import {useState} from "react";

export default function SignUpForm({setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    function validateUsername() {
        if (username.length < 8) {
            alert("Username must be at least 8 characters")
            return
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            const result = await response.json();
            setToken(result.token);
            
            console.log(result);
        } catch (error) {
            setError(error.message);
        }  
    }

    return (
        <>
        <h2>Sign Up!</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Username: <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
            </label>
            <br/>
            <label>
                Password: <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
            </label>
            <br/>
            <br/>
            <button type="submit" 
            onClick={() => {validateUsername()}}>Submit</button>
        </form>
        </>
    );
}