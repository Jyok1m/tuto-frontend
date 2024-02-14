import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectUser, disconnectUser } from "@/reducers/user";

export default function Home() {
	const dispatch = useDispatch();
	const reducer = useSelector((state) => state.user.value);

	useEffect(() => {
		console.log("Value from store => ", reducer.firstname);
	}, [reducer]);

	const [firstname, setFirstname] = useState("");
	const [password, setPassword] = useState("");

	const [firstnameConnect, setFirstnameConnect] = useState("");
	const [passwordConnect, setPasswordConnect] = useState("");

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
				alert(`${data.user} a bien été créé 😉`);
			})
			.then(() => {
				setFirstname("");
				setPassword("");
			});
	};

	const handleConnect = () => {
		fetch("http://localhost:3000/users/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ firstname: firstnameConnect, password: passwordConnect }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (!data.result) return alert(data.error);
				dispatch(connectUser({ firstname: data.user }));
				alert(`Bienvenue à toi, ${data.user} sacré 😉`);
			})
			.then(() => {
				setFirstnameConnect("");
				setPasswordConnect("");
			});
	};

	return (
		<div>
			<h1>Hello World</h1>

			{!reducer.firstname && (
				<div>
					<div>
						<input placeholder="Firstname..." type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
						<input placeholder="Password..." type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

						<button onClick={() => handleRegister()}>Register</button>
					</div>
					<div>
						<input placeholder="Firstname..." type="text" value={firstnameConnect} onChange={(e) => setFirstnameConnect(e.target.value)} />
						<input placeholder="Password..." type="password" value={passwordConnect} onChange={(e) => setPasswordConnect(e.target.value)} />

						<button onClick={() => handleConnect()}>Signin</button>
					</div>
				</div>
			)}

			{reducer.firstname && (
				<div>
					<button onClick={() => dispatch(disconnectUser())}>Signout</button>
				</div>
			)}
		</div>
	);
}
