"use client";
import { Button, Spinner } from "react-bootstrap";
import { useFetchFakeApiData } from "../api/page";
import { useCartStore } from "../store";

const LandingPage = () => {
  const { cart, addToCart, updateQuantity, cartCount } =
    useCartStore();
  const { data, loading } = useFetchFakeApiData();
  console.log("cartCount", cart);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-end mt-2 mb-2">
        <div className="d-flex align-items-center">
          <span>Cart Items: {cart?.length}</span>
          <a href="/cart">
            <span>Open Cart Page</span>
          </a>
        </div>
      </div>
      <div className="row">
        {data?.map((item: any) => (
          <div className="col-md-6 col-lg-4 mb-4" key={item.id}>
            <div className="card h-100 d-flex justify-content-center align-items-center">
              <img
                src={item.image}
                className="card-img-top"
                alt={item.title}
                style={{
                  objectFit: "contain",
                  height: "200px",
                  width: "200px",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text m-0">{item.category}</p>
                <p className="card-text">
                  {item.description.length > 40
                    ? `${item.description.substring(0, 40)}...`
                    : item.description}
                </p>
                <p className="card-text">Price: ${item.price}</p>
                <div className="mb-1">
                  <a href={`/products/${item.id}`} className="btn btn-primary">
                    View Details
                  </a>
                </div>
                <Button
                  variant="danger"
                  onClick={() => {
                    const cartItem = cart.find((ci) => ci.id === item.id);
                    if (cartItem) {
                      updateQuantity(item.id, cartItem.quantity - 1);
                    }
                  }}
                >
                  -
                </Button>

                <span className="mx-2">
                  {cart.find((ci) => ci.id === item.id)?.quantity || 0}
                </span>

                <Button variant="primary" onClick={() => addToCart(item)}>
                  +
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
