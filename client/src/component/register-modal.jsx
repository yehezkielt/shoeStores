import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const BASE_URL = "https://iproject.tatang.online"
// const BASE_URL = "http://localhost:3000";


export default function Form_Register() {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address: "",
    });

    const [errors, setErrors] = useState({});

    const GetInput = (e) => {
        const { name, value } = e.target;
        const newInput = {
            ...input,
            [name]: value,
        };
        setInput(newInput);
    };

    const navigate = useNavigate();
    const Submit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios({
                method: "post",
                url: BASE_URL + "/register",
                data: input,
            });
            Swal.fire({
                icon: "success",
                title: data.message,
            });
            navigate("/");
        } catch (error) {
            if (error.response.status === 400) {
                setErrors(error.response.data.errors);
            } else {
                Swal.fire({
                    icon: "error",
                    title: error.response.data.message,
                });
            }
        }
    };

    return (
        <>
            <button
                className="btn btn-outline btn-success btn-sm text-white"
                onClick={() => document.getElementById("register_form").showModal()}
            >
                Register
            </button>
            <dialog id="register_form" className="modal">
                <div className="modal-box">
                    <form method="dialog" className="flex flex-col gap-2">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                        <h1 className="font-bold tracking-tight text-xl mb-4">Register</h1>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Username"
                                name="username"
                                onChange={GetInput}
                            />
                        </label>
                        {errors.username && <p className="text-red-500">{errors.username}</p>}
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Email"
                                name="email"
                                onChange={GetInput}
                            />
                        </label>
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="password"
                                className="grow"
                                placeholder="Password"
                                name="password"
                                onChange={GetInput}
                            />
                        </label>
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="password"
                                className="grow"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                onChange={GetInput}
                            />
                        </label>
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Phone Number"
                                name="phoneNumber"
                                onChange={GetInput}
                            />
                        </label>
                        {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Address"
                                name="address"
                                onChange={GetInput}
                            />
                        </label>
                        {errors.address && <p className="text-red-500">{errors.address}</p>}
                        <button
                            onClick={Submit}
                            type="Submit"
                            className="btn btn-primary my-4 w-1/2 m-auto btn-circle"
                        >
                            Register
                        </button>
                    </form>
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
