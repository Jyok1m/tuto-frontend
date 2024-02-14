import React, { useState, useEffect } from "react";

export default function Home() {
	const [firstname, setFirstname] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = () => {
		fetch("http://localhost:3000/users/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ firstname, password }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (!data.result) return alert(data.error);
				return alert(`${data.user} a bien été créé 😉`);
			});
	};

	return (
		<div>
			<h1>Hello World</h1>

			<input placeholder="Firstname..." type="text" onChange={(e) => setFirstname(e.target.value)} />
			<input placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)} />

			<button onClick={() => handleRegister()}>Register</button>
		</div>
	);
}
