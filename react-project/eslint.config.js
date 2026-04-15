import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ setIsLoggedIn }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {

        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (
            savedUser &&
            savedUser.email === email &&
            savedUser.password === password
        ) {

            localStorage.setItem("isLoggedIn", "true");

            setIsLoggedIn(true);

            navigate("/");

        } else {

            alert("Invalid email or password");

        }

    };

    return ( <
        <
        div className = "auth-container" >

        <
        h2 > Login < /h2>

        <
        input type = "email"
        placeholder = "Email"
        onChange = {
            (e) => setEmail(e.target.value)
        }
        />

        <
        input type = "password"
        placeholder = "Password"
        onChange = {
            (e) => setPassword(e.target.value)
        }
        />

        <
        button onClick = { handleLogin } >
        Login <
        /button>

        <
        p >
        New user ?
        <
        Link to = "/signup" > Signup < /Link> < /
        p >

        <
        /div>
    );
}

export default Login;