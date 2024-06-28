"use client";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { usePathname, useSearchParams } from "next/navigation";
import { Product } from "../../types/index";

const ProductDetail = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = pathname?.split("/").pop();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Product = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

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

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <img
        src={product.image}
        alt={product.title}
        style={{ objectFit: "contain", height: "350px", width: "100%" }}
      />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating?.rate}</p>
      <p>Count: {product.rating?.count}</p>
    </div>
  );
};

export default ProductDetail;
