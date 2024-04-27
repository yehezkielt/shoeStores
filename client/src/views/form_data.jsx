import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const BASE_URL = "https://iproject.tatang.online";
// const BASE_URL = "http://localhost:3000";


export default function Form_Data() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Local state
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  async function fetchShoesById() {
    try {
      const response = await axios.get(`${BASE_URL}/shoes/${id}`);
      const shoes = response.data;
      setName(shoes.name);
      setDescription(shoes.description);
      setPrice(shoes.price);
      setCategoryId(shoes.CategoryId);
      console.log(shoes);
    } catch (error) {
      console.error("Error fetching shoes:", error);
    }
  }
  // Fetch shoe data by ID if editing
  useEffect(() => {
    if (id) {
      fetchShoesById();
    }
  }, [id]);


  // Handle file input change
  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "CategoryId":
        setCategoryId(value);
        break;
      default:
        break;
    }
    
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("CategoryId", categoryId);

    try {
      let method;
      let url;

      if (id) {
        // If id exists, it's an update operation (PUT)
        method = "put";
        url = `${BASE_URL}/shoes/${id}`;
      } else {
        // If id doesn't exist, it's a create operation (POST)
        method = "post";
        url = `${BASE_URL}/shoes`;
      }

      const response = await axios({
        method, 
        url, 
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      Swal.fire({
        icon: "success",
        title: response.data.message,
      });
      navigate("/shoes");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  };

  return (
    <div className="mt-16 h-screen w-full flex flex-col justify-center items-center">
      <form
        className="flex flex-col gap-2 p-5 border w-1/2 rounded-lg bg-slate-100"
        onSubmit={handleSubmit}
      >
        <Link
          to="/shoes"
          className="btn btn-sm btn-circle btn-ghost absolute right-[26%] top-[35%]"
        >
          ✕
        </Link>
        <h1 className="font-bold mb-4 tracking-tigh text-xl text-center border-b p-3 w-1/2 m-auto">
          {id ? "Update Shoes" : "Input New Shoes"}
        </h1>
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            type="text"
            className="grow"
            placeholder="- name"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Description
          <input
            type="text"
            className="grow"
            placeholder="- description"
            name="description"
            value={description}
            onChange={handleInputChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Image
          <input
            type="file"
            className="grow"
            placeholder="- image URL"
            name="image"
            onChange={handleFileChange}
          />
        </label>
        <div className="flex justify-between gap-2">
          <label className="input input-bordered flex items-center gap-2 w-full">
            Price
            <input
              type="number"
              className="grow"
              placeholder="- price"
              name="price"
              value={price}
              onChange={handleInputChange}
            />
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            name="CategoryId"
            value={categoryId}
            onChange={handleInputChange}
          >
            <option value="">Category</option>
            <option value="1">sneakers</option>
            <option value="2">loafers</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4 w-1/2 m-auto btn-circle"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
