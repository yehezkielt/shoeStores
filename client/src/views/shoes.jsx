import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
// const BASE_URL = "https://iproject.tatang.online";
const BASE_URL = "http://localhost:3000";


export default function Shoes() {
    const { id } = useParams();
    const [shoes, setShoes] = useState([]); // State to store shoes data

    // Function to fetch shoes
    const fetchShoes = async () => {
        try {
            const response = await axios({
                method: "get",
                url: BASE_URL + "/shoes/",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            });
            setShoes(response.data); // Update shoes state with fetched data
        } catch (error) {
            console.error("Error fetching shoes:", error);
        }
    };

    useEffect(() => {
        fetchShoes();
    }, []);

    // Function to handle delete
    const handleDelete = async (shoeId) => {
        try {
            await axios({
                method: "delete",
                url: `${BASE_URL}/shoes/${shoeId}`,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            });
            // Remove deleted shoe from state
            setShoes(shoes.filter(shoe => shoe.id !== shoeId));
            Swal.fire({
                icon: "success",
                title: "Shoe deleted successfully",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error deleting shoe",
                text: error.response.data.message,
            });
        }
    };

    useEffect(() => {
        if (id) handleDelete(id);
    }, [id]);

    return (
        <>
            <div className="overflow-x-auto mt-16 w-3/4 m-auto">
                <Link to={"/form"} className="btn btn-primary my-4 btn-sm">
                    Add Shoes
                </Link>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shoes.map((el, i) => (
                            <tr className="hover" key={el.id}>
                                <td>{i + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-16 h-16">
                                                <img src={el.image} alt="menu-image" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{el.name}</div>
                                            <div className="text-sm opacity-50">
                                                {el.Category.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-sm">{el.description}</span>
                                </td>
                                <td>
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(el.price)}
                                </td>
                                <td className="flex flex-col gap-2">
                                    <button
                                        onClick={() => handleDelete(el.id)}
                                        className="btn btn-error btn-xs text-white"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        to={`/form/${el.id}`}
                                        className="btn btn-warning btn-xs"
                                    >
                                        Update
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
