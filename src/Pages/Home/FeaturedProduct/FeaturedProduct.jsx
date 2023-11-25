import useAuth from "../../../hooks/useAuth";
import useProduct from "../../../hooks/useProduct";
import { FaVoteYea } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const FeaturedProduct = () => {
  const [products, refetch] = useProduct();
  //   console.log(products)
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
 

  const handleUpVote = (id) => {
    console.log('clicked');
    axiosSecure.patch(`/upvote/${id}`, {
        userEmail: user.email,
    })
    .then(res => {
        console.log(res.data);
        if(res.data.modifiedCount > 0){
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "vote done",
                showConfirmButton: false,
                timer: 1500,
              });
        }
    })
  }


  return (
    <div>
      <h1 className="text-4xl text-center font-bold text-white mt-[40px]">
        Featured Products
      </h1>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  lg:gap-5  md:w-[770px] w-[350px] lg:w-[1500px] mx-auto mt-[30px] md:mt-[70px] md:mb-[70px]">
          {products.slice(0, 4).map((product) => (
            <div
              key={product._id}
              className="card w-[365px] bg-base-100 rounded-none border-4 border-[#3a86ff] h-[530px]"
            >
              <figure className="px-10 pt-10">
                <img
                  src={product.productPic}
                  alt="Shoes"
                  className="rounded-xl w-[350] h-[200px] bg-black"
                />
              </figure>
              <div className="ml-[10px] mt-[30px] text-left">
                <h2 className="font-bold text-xl">{product.productName}</h2>
                <h1 className="flex gap-2 font-bold mt-2 mb-2">
                  <BsFillCalendarDateFill className="mt-1 text-[#3a86ff]"></BsFillCalendarDateFill>
                  {product.createdAt.slice(0, 10)}
                </h1>
                <div className="badge badge-secondary font-bold p-2">TAGS</div>
                <div className="flex gap-2">
                  {product.tags.map((tag, i) => (
                    <h2
                      key={i}
                      className="font-bold text-sm border-2 border-blue-700 p-1 mt-2"
                    >
                      {tag}
                    </h2>
                  ))}
                </div>
                <h1 className="mt-2 font-bold ">
                  For More Details:
                  <a href={product.link}>
                    <span className="ml-2 text-blue-700 font-bold underline">
                      Click Here
                    </span>
                  </a>
                </h1>
                {user?.email === product.OwnerEmail ? (
                  <button className="flex gap-2 mt-4 btn btn-disabled">
                    <FaVoteYea className=" text-[30px] text-white"></FaVoteYea>
                    <h1 className="font-bold text-[20px] text-[#de369d]">
                      {product.upVote}
                    </h1>
                  </button>
                ) : !user?.email ? (
                  <Link to='/login'>
                    {" "}
                    <button className="flex gap-2 mt-4 btn bg-black">
                      <FaVoteYea className=" text-[30px] text-[#3a86ff]"></FaVoteYea>
                      <h1 className="font-bold text-[20px] text-[#de369d]">
                        {product.upVote}
                      </h1>
                    </button>
                  </Link>
                ) : (
                  <button onClick={() => handleUpVote(product._id)} className="flex gap-2 mt-4 btn bg-black">
                    <FaVoteYea className=" text-[30px] text-[#3a86ff]"></FaVoteYea>
                    <h1 className="font-bold text-[20px] text-[#de369d]">
                      {product.upVote}
                    </h1>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;