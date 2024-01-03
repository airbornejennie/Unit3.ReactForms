import {useState} from "react";

export default function Authenticate({token}) {
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const [data, getData] = useState("");

    async function handleClick() {
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", 
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }   
            })
            const result = await response.json();
            console.log(result)
            console.log(result.data)
            getData(result.data.username);
            setSuccessMessage(result.message);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <br/>
            <h2>Authenticate!</h2>
            {successMessage && <p>{successMessage}</p>}
            {data && <p><b>Username: {data}</b></p>}
            {error && <p>{error}</p>}
            <button onClick={handleClick}>Authenticate Token</button>
        </div>
    );
  }