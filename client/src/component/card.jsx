import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// import { useDispatch } from "react-redux";

// import {
//     increment,
//     decrement,
// } from "../stores/user_slice";


export default function Card({ el, Payment }) {
    const isLogin = !!localStorage.access_token

    // const dispatch = useDispatch();


    // const counter = useSelector((store) => store.counter.value);
    // if(counter === true){
    //     Payment
    // } 
    // else {
    //     Swal.fire({
    //         title: "You need login first",
    //         icon: "error"
    //     })
    // }

    // const handleClick = () => {
    //     dispatch(decrement()) 
    // }
    // const handleClick2 = () => {
    //     dispatch(increment()) 
    //     Payment()
    // }

  return (
    <div
      className="card max-sm:h-[350px] max-sm:w-[350px] sm:h-[350px] bg-base-100 shadow-xl"
      data-aos="fade-right"
    >
      <figure>
        <img
          className="mt-[-100px] bg-contain bg-center"
          src={el.image}
          alt="image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {el.name}
        </h2>
          <div
            className={
              el.Category.name === "sneakers"
                ? "badge badge-primary"
                : "badge badge-error text-white"
            }
          >
            {el.Category.name}
          </div>
        <p>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(el.price)}
        </p>
        <div className="card-actions justify-end" >
          {!isLogin ? (
            <div
              onClick={ Payment}
              
              className="btn btn-outline btn-success btn-sm btn-circle px-8"
            >
              buy
            </div>
          ) : (
            <Link
              to={`/home/${el.id}`}
            //   onClick={() => handleClick()}
              className="btn btn-outline btn-success btn-sm btn-circle px-8"
            >
              buy
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  el: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    UserId: PropTypes.number.isRequired,
    CategoryId: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    Category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
  Payment: PropTypes.func.isRequired,
  Alert: PropTypes.func.isRequired,
};
