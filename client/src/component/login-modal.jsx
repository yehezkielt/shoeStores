import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

// const BASE_URL = "https://iproject.tatang.online";
const BASE_URL = "http://localhost:3000";


export default function Form_Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const GetInput = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const navigate = useNavigate();

    const Submit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(BASE_URL + "/login", {
                email,
                password,
            });

            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("username", data.username);
            Swal.fire({
                icon: "success",
                title: "Signed in successfully",
            });
            navigate("/home");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.response.data.message,
            });
        }
    };

    useEffect(() => {
        async function handleCredentialResponse(response) {
            
            try {
                const {data} = await axios({
                    method: "post",
                    url: BASE_URL + "/google-login", 
                    headers: {
                        google_token: response.credential
                    }
                });

                localStorage.setItem("access_token", data.access_token);
                // localStorage.setItem("username", data.username);
                Swal.fire({
                    icon: "success",
                    title: "Signed in successfully",
                });
                navigate("/home");
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: error.response.data.message,
                });
            }
        }

        window.google.accounts.id.initialize({
            client_id:
                "514715861586-t9e35q3vd2e6nh2r33jra94uhtp8vn3s.apps.googleusercontent.com",
            callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
            theme: "outline",
            size: "large",
        });
        window.google.accounts.id.prompt();
    }, [navigate]);

    return (
        <>
            <button
                className="btn btn-success btn-sm text-white"
                onClick={() => document.getElementById("form_login").showModal()}
            >
                Login
            </button>
            <dialog id="form_login" className="modal">
                <div className="modal-box">
                    <form method="dialog" className="flex flex-col gap-2">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                        <h1 className="font-bold tracking-tigh text-xl mb-4">Log In</h1>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Email"
                                name="email"
                                onChange={GetInput}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                type="password"
                                className="grow"
                                placeholder="Password"
                                name="password"
                                onChange={GetInput}
                            />
                        </label>
                        <button
                            onClick={Submit}
                            type="Submit"
                            className="btn btn-primary my-4 w-1/2 m-auto btn-circle"
                        >
                            Continue
                        </button>
                    </form>
                    <p className="text-center font-bold">- OR -</p>
                    <div id="buttonDiv" className="flex justify-center my-4"></div>
                    <p className="text-center text-slate-400">
                        By registering, you agree to our{" "}
                        <Link to={"#"} className="text-blue-700">
                            Terms & Conditions
                        </Link>{" "}
                        and that you have read our{" "}
                        <Link to={"#"} className="text-blue-700">
                            Privacy Notice
                        </Link>
                        .
                    </p>
                </div>
            </dialog>
        </>
    );
}
