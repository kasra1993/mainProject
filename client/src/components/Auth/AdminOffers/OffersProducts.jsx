import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Axios from "axios";
const OffersProducts = (props) => {
  const { offers } = props;
  const [dropdownValue, setDropdownValue] = useState();
  const loadedProducts = useSelector((state) => state.products.products);
  const [products, setProducts] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  let productsDuplicate = [...products];
  const [sortType, setSortType] = useState("");
  const [data, setData] = useState([]);
  //   const [selectedProducts, setSelectedProducts] = useState([]);

  //   useEffect(() => {
  //     if (loadedProducts) {
  //       setProducts(loadedProducts);
  //     }
  //   }, [loadedProducts]);
  //   useEffect(() => {
  //     setCheckedState(new Array(loadedProducts.length).fill(false));
  //   }, [products]);
  console.log(data);
  useEffect(() => {
    const func = async () => {
      await setProducts(loadedProducts);
    };
    func();
    setCheckedState(new Array(data.length).fill(false));
  }, [loadedProducts, data]);

  ////////////////////////// SUBMIT HANDLER ////////////////////////////

  const submitHandler = (e) => {
    e.preventDefault();
    var combinedArray = data.map((product, index) => ({
      ...product,
      selected: checkedState[index],
    }));
    const selectedArray = combinedArray.filter((p) => p.selected === true);
    // setSelectedProducts(selectedArray);
    const selectedArrayIds = selectedArray.map((p) => {
      return p.id;
    });
    const postObject = {
      productIds: selectedArrayIds,
      offersId: dropdownValue,
    };

    Axios.post("http://localhost:5000/newOffersProducts", postObject)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  ///////////////////////////// Checkbox HANDLER ////////////////////////////

  const checkboxHandler = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };
  ////////////////////////// Drop Down HANDLER ////////////////////////////

  const offerChangeHandler = (event) => {
    const eventValue = event.target.value;

    setDropdownValue(eventValue);
  };
  ///////////////////////// SORTING HANDLING ///////////////////////////////
  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        price: "price",
        lhPrice: "price",
        createdAt: "createdAt",
        discount: "discount",
        title: "title",
      };
      const sortProperty = types[type];
      const sorted = [...productsDuplicate].sort(
        (a, b) => b[sortProperty] - a[sortProperty]
      );
      setData(sorted);
    };
    sortArray(sortType);
  }, [sortType]);
  useEffect(() => {
    setData(products);
  }, [products]);
  return (
    <Fragment>
      <div className="col-md-12">
        <div className="col-md-12 d-flex justify-content-center">
          <select
            name="sort"
            id="sort"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option>CHOOSE SORTING</option>
            <option value="price">by Price H - L</option>
            <option value="price">by Price L - H</option>
            <option value="createdAt">by Creation Date</option>
            <option value="discount">by Discount</option>
            <option value="title">by title</option>
            {/* <option value="">by Categories</option>
              <option value="">by Brands</option> */}
          </select>
        </div>
        <form action="#" onSubmit={submitHandler}>
          <div className="col-md-12 d-flex justify-content-center p-5">
            <select onChange={offerChangeHandler}>
              <option>CHOOSE OFFER</option>
              {offers &&
                offers.map((offer) => (
                  <option value={offer.id}>{offer.title}</option>
                ))}
            </select>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>select</th>
                <th>id</th>
                <th>title</th>
                <th>summary</th>
                <th>discount</th>
                <th>shop</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((product, index) => {
                  return (
                    <tr key={product.id}>
                      <td>
                        <input
                          type="checkbox"
                          name="checkbox"
                          value="false"
                          checked={checkedState[index]}
                          onChange={() => {
                            checkboxHandler(index);
                          }}
                        />
                      </td>
                      <td>{product.id}</td>
                      <td>{product.title}</td>
                      <td>{product.summary}</td>
                      <td>{product.discount}</td>
                      <td>{product.shop}</td>
                      <td>{product.price}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <button type="submit" className="btn-secondary ">
            CLICK ME
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default OffersProducts;
