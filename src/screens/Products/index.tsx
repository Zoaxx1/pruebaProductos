import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduts } from "../../redux/actions";
import { Card } from "../../components/Imports";

const Products = () => {
  const dispatch = useDispatch();

  const listProducts: any = useSelector((state: any) => state.products);
  const token = localStorage.getItem("token");

  const [products, setProducts] = React.useState(listProducts ?? listProducts);

  const [categories, setCategories] = React.useState(
    listProducts ?? listProducts
  );

  const [update, setUpdate] = React.useState(true);

  const [redirect, setRedirect] = React.useState(false);

  const changeCategory = (e: any) => {
    const category = e.target.value;

    if (category !== "all") {
      const prods = Object.values(listProducts);
      setProducts(prods.filter((p: any) => category === p.category));
    } else {
      console.log(category, "category");
      setProducts(Object.values(listProducts));
    }
  };

  const onDeleteProduct = async (i: number) => {
    const key = Object.keys(listProducts)[i];
    dispatch(deleteProduts(key, setUpdate));
  };

  const onRedirectAddProduct = () => {
    setRedirect(true);
  };

  const getAllProducts = async () => {
    await dispatch(getProducts());
  };

  function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  React.useEffect(() => {
    getAllProducts();
  }, [update]);

  React.useEffect(() => {
    setRedirect(false);
  }, []);

  React.useEffect(() => {
    if (listProducts) {
      setProducts(Object.values(listProducts));
      setCategories(
        Object.values(listProducts)
          .map((prod: any) => prod.category)
          .filter(onlyUnique)
      );
    }
  }, [listProducts, update]);

  return (
    <div>
      {redirect && <Redirect to="/add" />}
      {!token && <Redirect to="/" />}
      <p className="w-full text-center text-6xl text-yellow-600 mb-12">
        Products
      </p>
      <div className="w-full">
        <select
          onChange={changeCategory}
          className="w-40 h-12 bg-yellow-600 text-yellow-400 rounded p-2"
        >
          <option value="all" selected>
            All Categories
          </option>
          {Array.isArray(categories) &&
            categories &&
            categories.map((c: any, i: number) => (
              <option value={c}>{c}</option>
            ))}
        </select>
        <div className="flex mt-8">
          {Array.isArray(products) &&
            products &&
            products.map((p: any, i: number) => (
              <Card p={p} i={i} deleteFunction={onDeleteProduct} />
            ))}
        </div>
      </div>

      <button
        className="text-xl text-yellow-300 bg-yellow-600 p-4 rounded-lg absolute bottom-5 right-5"
        onClick={onRedirectAddProduct}
      >
        Add Product
      </button>
    </div>
  );
};

export default Products;
