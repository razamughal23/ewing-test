"use client";
import { useState, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Product } from "../types/index";
import { useCart } from "../store/page";

const LandingPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart, removeFromCart, cartCount } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchProduct.toLowerCase()) ||
        product.category.toLowerCase().includes(searchProduct.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchProduct, products]);

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
      <Form>
        <Form.Group controlId="search">
          <Form.Label>Search Products</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search by product name"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-end mt-2 mb-2">
        <div className="d-flex align-items-center">
          <span className="me-3">Cart Items: {cartCount}</span>
        </div>
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 d-flex justify-content-center align-items-center">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
                style={{
                  objectFit: "contain",
                  height: "200px",
                  width: "200px",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">
                  {product.description.length > 20
                    ? `${product.description.substring(0, 20)}...`
                    : product.description}
                </p>
                <p className="card-text">Price: ${product.price}</p>
                <div className="mb-1">
                  <a
                    href={`/products/${product.id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </a>
                </div>
                <Button
                  variant="primary"
                  onClick={() => addToCart(product)}
                  className="me-2"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="danger"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove from Cart
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
