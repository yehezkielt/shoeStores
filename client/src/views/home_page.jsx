import { useEffect, useState } from "react";
import Card from "../component/card";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://iproject.tatang.online";

export default function Home_Page() {
    const [shoes, setShoes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    // Function to fetch shoes
    const fetchShoes = async (params) => {
        try {
            const response = await axios.get(BASE_URL + "/pub-shoes", { params });
            setShoes(response.data);
        } catch (error) {
            console.error("Error fetching shoes:", error);
        }
    };

    useEffect(() => {
        // Fetch shoes initially
        fetchShoes();

        // Payment handling if there's an id param
        if (id) {
            Payment();
            navigate("/home");
        }
    }, [id]);

    // Function to handle payment
    const Payment = async () => {
        try {
            
            const { data } = await axios({
                method: "post",
                url: BASE_URL + `/shoes/payment/${id}`,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            });
            console.log(data, data.token);
            window.open(data.redirect_url, Swal.fire({
                title: "Payment on progress",
                icon: "success"
            }))
            
            // window.snap.pay(data.token, {
            //     onSuccess: function () {
            //         Swal.fire({
            //             icon: "success",
            //             title: "Payment success",
            //         });
            //     },
            //     onError: function () {
            //         Swal.fire({
            //             icon: "error",
            //             title: "Payment server is busy",
            //         });
            //     },
            // });
        } catch (error) {
            console.log(error.response);
            Swal.fire({
                icon: "error",
                title: "payment server is busy",
            });
        }
    };

    

    // Function to handle search input change
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Function to handle form submission for search
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        fetchShoes({ q: searchQuery });
    };

    return (
        <>
            <div className="form-control mt-20 mb-5 max-sm:mx-8 sm:mx-10 lg:mx-24 lg:fixed lg:mx-48 lg:mt-[-72px] z-10">
                <form onSubmit={handleSubmitSearch}>
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered"
                        name="q"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                </form>
            </div>
            <div className="grid gap-4 lg:mt-20 justify-center sm:grid-cols-2 sm:mx-10 lg:grid-cols-3 lg:mx-24 xl:grid-cols-4 xl:mx-48">
                {shoes.map((el) => (
                    <Card el={el} key={el.id} Payment={Payment} />
                ))}
            </div>
            <div className="footer border mt-4 flex justify-center p-5">
                <p>Copyright by @ShoeStores 2024</p>
            </div>
        </>
    );
}
