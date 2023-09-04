"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [day, setDay] = useState("");
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const [gender, setGender] = useState("");
	const [acceptTOC, setAcceptTOC] = useState("");
	const [isChecked, setIsChecked] = useState(false);

	const [errorEmail, setErrorEmail] = useState("");
	const [errorPassword, setErrorPassword] = useState("");
	const [isPasswordError, setIsPasswordError] = useState(false);
	const [errorName, setErrorName] = useState("");
	const [errorDay, setErrorDay] = useState("");
	const [errorMonth, setErrorMonth] = useState("");
	const [errorYear, setErrorYear] = useState("");
	const [errorGender, setErrorGender] = useState("");
	const [errorAcceptTOC, setErroracceptTOC] = useState("");
	const [successMessage, setSuccessMessage] = useState(null);

	const router = useRouter();

	const checkHandler = () => {
		setIsChecked(!isChecked);
	};

	const handlesubmit = async (e: any) => {
		e.preventDefault();
		setErrorEmail("");
		setErrorPassword("");
		setErrorName("");
		setErrorDay("");
		setErrorMonth("");
		setErrorYear("");
		setErrorGender("");
		setErroracceptTOC("");
		if (!email) {
			setErrorEmail("You need to enter your email.");
		}
		if (!password) {
			setErrorPassword("You need to enter a password.");
			setIsPasswordError(true);
		}
		if (!name) {
			setErrorName("Enter a name for your profile.");
		}
		if (!day) {
			setErrorDay("Enter a valid day of the month.");
		}
		if (!month) {
			setErrorMonth("Select your birth month.");
		}
		if (!year) {
			setErrorYear("Enter a valid year.");
		}
		if (!gender) {
			setErrorGender("Select your gender.");
		}
		if (!isChecked) {
			setErroracceptTOC(
				"Please accept the terms and conditions to continue."
			);
		}

		if (
			email &&
			password &&
			name &&
			day &&
			month &&
			year &&
			gender &&
			isChecked
		) {
			try {
				const res = await fetch("api/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name,
						email,
						password,
						gender,
						birth: { day, month, year },
					}),
				});

				const body = await res.json();

				if (body.error) {
					if (body.error.usernameError) {
						setErrorName(body.error.usernameError);
					}
					if (body.error.emailError) {
						setErrorEmail(body.error.emailError);
					}
					if (body.error.passwordError) {
						setErrorPassword(body.error.passwordError);
					}
				}

				if (res.ok && body.message) {
					alert(body.message);
					setSuccessMessage(body.message);
					console.log("OK");
					const form = e.target;
					form.reset();
					router.push("/login");
				} else {
					console.log("User registration failed.");
				}
			} catch (error) {
				console.log("Error during registration: ", error);
			}
		}
	};
	const handlePassword = (e: any) => {
		setPassword(e.target.value);
	};
	useEffect(() => {
		if (isPasswordError && password.length < 8 && password.length > 0) {
			setErrorPassword("Password to short");
		} else if (password.length >= 8) {
			setErrorPassword("");
		} else {
			setErrorPassword("You need to enter a password.");
		}
	}, [password, isPasswordError]);

	return (
		<form onSubmit={handlesubmit} className="mt-5">
			<div className="space-y-6 w-[420px]">
				<div>
					<label
						htmlFor="email"
						className="block font-bold mb-1.5 text-sm"
					>
						What&apos;s your email?
					</label>
					<input
						type="text"
						placeholder="Enter your email."
						onChange={(e) => setEmail(e.target.value)}
						className={`block w-full appearance-none px-3 py-2 border ${
							errorEmail
								? "border-red-500 focus:border-red-500"
								: "border-gray-500"
						}  bg-white rounded-sm focus:outline-none focus:border-black focus:border-2`}
					/>
					{errorEmail && (
						<span className="flex items-center mt-2 gap-x-1">
							<AiFillExclamationCircle size={15} color="red" />
							<span className="text-red-500 text-xs">
								{errorEmail}
							</span>
						</span>
					)}
				</div>

				<div>
					<label
						htmlFor="password"
						className="block font-bold mb-1.5 text-sm"
					>
						Create a password
					</label>
					<input
						type="password"
						placeholder="Create a password."
						onChange={(e) => handlePassword(e)}
						className={`block w-full appearance-none px-3 py-2 border ${
							errorPassword
								? "border-red-500 focus:border-red-500"
								: "border-gray-500"
						}  bg-white rounded-sm focus:outline-none focus:border-black focus:border-2`}
					/>
					{errorPassword && (
						<span className="flex items-center mt-2 gap-x-1">
							<AiFillExclamationCircle size={15} color="red" />
							<span className="text-red-500 text-xs">
								{errorPassword}
							</span>
						</span>
					)}
				</div>
				<div>
					<label
						htmlFor="name"
						className="block font-bold mb-1.5 text-sm"
					>
						What should we call you?
					</label>
					<input
						type="text"
						placeholder="Enter a profile name."
						onChange={(e) => setName(e.target.value)}
						className={`block w-full appearance-none px-3 py-2 border ${
							errorName
								? "border-red-500 focus:border-red-500"
								: "border-gray-500"
						}  bg-white rounded-sm focus:outline-none focus:border-black focus:border-2`}
					/>
					{errorName ? (
						<span className="flex items-center mt-2 gap-x-1">
							<AiFillExclamationCircle size={15} color="red" />
							<span className="text-red-500 text-xs">
								{errorName}
							</span>
						</span>
					) : (
						<p className="text-sm mt-2">
							This appears on your profile.
						</p>
					)}
				</div>
				<div>
					<div className="flex justify-between">
						<div>
							<label
								htmlFor="day"
								className="block font-bold mb-1.5 text-sm"
							>
								Day
							</label>
							<input
								type="text"
								placeholder="DD"
								onChange={(e) => setDay(e.target.value)}
								className={`block appearance-none px-3 py-2 border  ${
									errorDay
										? "border-red-500 focus:border-red-500"
										: "border-gray-500"
								} bg-white rounded-sm focus:outline-none focus:border-black focus:border-1 w-[100px]`}
							/>
						</div>
						<div>
							<label
								htmlFor="month"
								className="block font-bold mb-1.5 text-sm"
							>
								Month
							</label>
							<select
								onChange={(e) => setMonth(e.target.value)}
								defaultValue={month}
								className={`block  px-3 py-[9.5px] border  ${
									errorDay
										? "border-red-500 focus:border-red-500"
										: "border-gray-500"
								} focus:outline-none focus:border-1  bg-white w-[200px]`}
							>
								<option value="" disabled>
									Month
								</option>
								<option value="january">January</option>
								<option value="february">February</option>
								<option value="march">March</option>
								<option value="april">April</option>
								<option value="may">May</option>
								<option value="june">June</option>
								<option value="july">July</option>
								<option value="august">August</option>
								<option value="september">September</option>
								<option value="october">October</option>
								<option value="november">November</option>
								<option value="december">December</option>
							</select>
						</div>
						<div>
							<label
								htmlFor="year"
								className="block font-bold mb-1.5 text-sm"
							>
								Year
							</label>
							<input
								type="text"
								placeholder="YYYY"
								onChange={(e) => setYear(e.target.value)}
								className={`block appearance-none px-3 py-2 border  ${
									errorDay
										? "border-red-500 focus:border-red-500"
										: "border-gray-500"
								} bg-white rounded-sm focus:outline-none focus:border-black focus:border-1 w-[100px]`}
							/>
						</div>
					</div>
					<div>
						{errorDay && (
							<span className="flex items-center mt-2 gap-x-1">
								<AiFillExclamationCircle
									size={15}
									color="red"
								/>
								<span className="text-red-500 text-xs">
									{errorDay}
								</span>
							</span>
						)}
						{errorMonth && (
							<span className="flex items-center mt-2 gap-x-1">
								<AiFillExclamationCircle
									size={15}
									color="red"
								/>
								<span className="text-red-500 text-xs">
									{errorMonth}
								</span>
							</span>
						)}
						{errorYear && (
							<span className="flex items-center mt-2 gap-x-1">
								<AiFillExclamationCircle
									size={15}
									color="red"
								/>
								<span className="text-red-500 text-xs">
									{errorYear}
								</span>
							</span>
						)}
					</div>
				</div>

				<div>
					<label className="block font-bold mb-2 text-sm">
						What&apos;s your gender?
					</label>
					<div className="flex gap-x-5 gap-y-3 flex-wrap">
						<div className="flex gap-x-1 items-center">
							<input
								id="genre-option-1"
								type="radio"
								name="genres"
								value="male"
								className="w-4 h-4"
								onChange={(e) => setGender(e.target.value)}
							/>
							<label
								htmlFor="genre-option-1"
								className="block ml-2 text-sm font-medium"
							>
								Male
							</label>
						</div>
						<div className="flex gap-x-1 items-center">
							<input
								id="genre-option-2"
								type="radio"
								name="genres"
								value="female"
								className="w-4 h-4"
								onChange={(e) => setGender(e.target.value)}
							/>
							<label
								htmlFor="genre-option-2"
								className="block ml-2 text-sm font-medium"
							>
								Female
							</label>
						</div>
						<div className="flex gap-x-1 items-center">
							<input
								id="genre-option-3"
								type="radio"
								name="genres"
								value="non-binary"
								className="w-4 h-4"
								onChange={(e) => setGender(e.target.value)}
							/>
							<label
								htmlFor="genre-option-3"
								className="block ml-2 text-sm font-medium"
							>
								Non-binary
							</label>
						</div>
						<div className="flex gap-x-1 items-center">
							<input
								id="genre-option-4"
								type="radio"
								name="genres"
								value="other"
								className="w-4 h-4"
								onChange={(e) => setGender(e.target.value)}
							/>
							<label
								htmlFor="genre-option-4"
								className="block ml-2 text-sm font-medium"
							>
								Other
							</label>
						</div>
						<div className="flex gap-x-1 items-center">
							<input
								id="genre-option-5"
								type="radio"
								name="genres"
								value="prefer-not-to-say"
								className="w-4 h-4"
								onChange={(e) => setGender(e.target.value)}
							/>
							<label
								htmlFor="genre-option-5"
								className="block ml-2 text-sm font-medium"
							>
								Prefer not to say
							</label>
						</div>

						{errorGender && (
							<span className="flex items-center mt-1 gap-x-1">
								<AiFillExclamationCircle
									size={15}
									color="red"
								/>
								<span className="text-red-500 text-xs">
									{errorGender}
								</span>
							</span>
						)}
					</div>
				</div>
				<div>
					<div className="flex mb-4 pt-5">
						<input
							id="checkbox-1"
							type="checkbox"
							value=""
							className="rounded"
						/>
						<label
							htmlFor="checkbox-1"
							className="ml-3 text-sm font-medium"
						>
							Please send me news and offers from Spotify
						</label>
					</div>
					<div className="flex items-start mb-4">
						<input
							id="checkbox-2"
							type="checkbox"
							value=""
							className="rounded"
						/>
						<label
							htmlFor="checkbox-2"
							className="ml-3 -mt-1 text-sm font-medium"
						>
							Share my registration data with Spotify&apos;s
							content providers for marketing purposes. Note that
							your data may be transferred to a country outside of
							the EEA as described in our privacy policy.
						</label>
					</div>
					<div className="flex items-start mb-4">
						<input
							id="checkbox-3"
							type="checkbox"
							value=""
							className="rounded"
							checked={isChecked}
							onChange={checkHandler}
						/>
						<label
							htmlFor="checkbox-3"
							className="ml-3 -mt-1 text-sm font-medium"
						>
							I hereby agree to the{" "}
							<Link
								className="text-[#159B45] underline hover:text-[#1BE063]"
								href="#"
							>
								Terms of Service
							</Link>{" "}
							and consent to the collection, processing and use of
							my personal data, as described in more detail in the{" "}
							<Link
								href="#"
								className="text-[#159B45] underline hover:text-[#1BE063]"
							>
								Privacy Statement
							</Link>
							.
						</label>
					</div>
					{errorAcceptTOC && (
						<span className="flex items-center gap-x-1">
							<AiFillExclamationCircle size={15} color="red" />
							<span className="text-red-500 text-xs">
								{errorAcceptTOC}
							</span>
						</span>
					)}
				</div>
			</div>
			<div className="flex justify-center">
				<button className=" bg-[#1BE063] px-12 py-4 rounded-full text-black font-bold mt-8 hover:scale-105">
					Sign up
				</button>
			</div>
			<div className="flex justify-center mt-5">
				<p>
					Have an account?{" "}
					<Link
						className="text-[#159B45] underline hover:text-[#1BE063]"
						href="/login"
					>
						Log in
					</Link>
					.
				</p>
			</div>
		</form>
	);
};

export default RegisterForm;
