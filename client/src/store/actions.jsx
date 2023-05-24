import { productActions } from "./product-slice";
import Axios from "axios";
import { uiActions } from "./ui-slice";
import { categoryActions } from "./category-slice";
import { brandActions } from "./brand-slice";
import { newsActions } from "./news-slice";
import { offersActions } from "./offers-slice";

///////////////////////// PRODUCTS ////////////////////////////////

export const fetchProductData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await Axios.get("http://localhost:5000/getProducts");
      if (response.statusText !== "OK") {
        throw new Error("could not fetch the needed data");
      }
      const data = response.data;
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        productActions.get({
          products: cartData,
        })
      );
    } catch (error) {
      console.log("something went wrong");
      //   dispatch(
      //     uiActions.shownotification({
      //       status: "error",
      //       title: "error",
      //       message: "there was some Fetching error ",
      //     })
      //   );
    }
  };
};
export const getProductItem = (id) => {
  return async (dispatch) => {
    dispatch(
      uiActions.shownotification({
        status: "pending",
        title: "pending...",
        message: "your data is being retrieved",
      })
    );
    const getItem = async () => {
      const baseUrl = "http://localhost:5000/getProductItem";
      const response = await Axios.get(baseUrl + "/" + id);
      // if (response.statusText !== "OK") {
      //   throw new Error("could not fetch the needed data");
      // }
      const data = response.data;
      return data;
    };
    try {
      const cartData = await getItem();
      dispatch(
        uiActions.shownotification({
          status: "success",
          title: "seccess...",
          message: "your data was sent successfuly",
        })
      );
      dispatch(
        productActions.getProduct({
          productItem: cartData,
        })
      );
    } catch (error) {
      console.log("something went wrong");
      dispatch(
        uiActions.shownotification({
          status: "error",
          title: "error",
          message: "there was some Fetching error ",
        })
      );
    }
  };
};
export const sendUpdatedProductItem = (product) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      console.log(product.id);
      const baseUrl = "http://localhost:5000/UpdateProduct";
      const response = Axios.put(baseUrl + "/" + product.id, {
        title: product.title,
        price: product.price,
        summary: product.summary,
        categoryid: product.categoryid,
        discount: product.discount,
        content: product.content,
        shop: product.shop,
        quantity: product.quantity,
        startsAt: product.newStartingDate,
        endsAt: product.newEndingDate,
        meta: product.metaTitle,
        createdAt: product.createdAt,
        metaTitle: product.meta,
      });

      //   if (!response.ok) {
      //     throw new Error("sending cart data failed");
      //   }
      return response;
    };
    try {
      const res = await sendRequest();
      console.log(res);

      //   dispatch(
      //     uiActions.shownotification({
      //       status: "success",
      //       title: "seccess...",
      //       message: "your data was sent successfuly",
      //     })
      //   );
    } catch (error) {
      console.log("something bad happened to product data");
      //   dispatch(
      //     uiActions.shownotification({
      //       status: "error",
      //       title: "error",
      //       message: "there was some error ",
      //     })
      //   );
    }
  };
};
export const sendNewProduct = (product) => {
  return async (dispatch) => {
    // dispatch(
    //   uiActions.shownotification({
    //     status: "pending",
    //     title: "pending...",
    //     message: "your data is being sent",
    //   })
    // );

    const sendRequest = async () => {
      const response = Axios.post("http://localhost:5000/createProducts", {
        title: product.title,
        price: product.price,
        summary: product.summary,
        categoryid: product.categoryid,
        discount: product.discount,
        content: product.content,
        shop: product.shop,
        quantity: product.quantity,
        startsAt: product.startsAt,
        endsAt: product.endsAt,
        createdAt: product.createdAt,
        metaTitle: product.meta,
        subcategoryid: product.subcategoryid,
      });
      return response;
    };
    try {
      const response = await sendRequest();
      console.log("this is the id ");
      console.log(response.data.insertId);
      return response;
      //   dispatch(
      //     uiActions.shownotification({
      //       status: "success",
      //       title: "seccess...",
      //       message: "your data was sent successfuly",
      //     })
      //   );
    } catch (error) {
      console.log("something bad happened to product data insertion");
      //   dispatch(
      //     uiActions.shownotification({
      //       status: "error",
      //       title: "error",
      //       message: "there was some error ",
      //     })
      //   );
    }
  };
};
export const fetchProductsWithImages = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.shownotification({
        status: "pending",
        title: "pending...",
        message: "your data is being retrieved",
      })
    );
    const fetchData = async () => {
      const response = await Axios.get(
        "http://localhost:5000/fetchProductsWithImages"
      );
      if (response.statusText !== "OK") {
        throw new Error("could not fetch the needed data");
      }
      const data = response.data;
      return data;
    };
    try {
      const Data = await fetchData();
      dispatch(
        uiActions.shownotification({
          status: "success",
          title: "seccess...",
          message: "your data was sent successfuly",
        })
      );
      dispatch(
        productActions.getProductWithImages({
          productsWithImages: Data,
        })
      );
      console.log(Data);
      console.log("successfuly fetched and put");
    } catch (error) {
      console.log("something went wrong");
      dispatch(
        uiActions.shownotification({
          status: "error",
          title: "error",
          message: "there was some Fetching error ",
        })
      );
    }
  };
};

///////////////////////// CATEGORIES  ////////////////////////////////
export const fetchCategories = () => {
  return async (dispatch) => {
    const fetch = async () => {
      const response = await Axios.get("http://localhost:5000/getCategories");
      if (response.statusText !== "OK") {
        throw new Error("could not fetch the needed category");
      }
      const data = response.data;
      return data;
    };
    try {
      const cartData = await fetch();
      dispatch(
        categoryActions.getCategory({
          categories: cartData,
        })
      );
    } catch (error) {
      console.log("something went wrong");
      //   dispatch(
      //     uiActions.shownotification({
      //       status: "error",
      //       title: "error",
      //       message: "there was some Fetching error ",
      //     })
      //   );
    }
  };
};
export const getSubCategories = () => {
  return async (dispatch) => {
    const fetch = async () => {
      const response = await Axios.get(
        "http://localhost:5000/GetSubCategories"
      );
      if (response.statusText !== "OK") {
        throw new Error("could not fetch the needed category");
      }
      const data = response.data;
      return data;
    };
    try {
      const subCategories = await fetch();
      dispatch(
        categoryActions.getSubCat({
          subCategories: subCategories,
        })
      );
    } catch (error) {
      console.log("something went wrong with sub Categories in Actions ");
      //   dispatch(
      //     uiActions.shownotification({
      //       status: "error",
      //       title: "error",
      //       message: "there was some Fetching error ",
      //     })
      //   );
    }
  };
};

///////////////////////// SUBCATEGORIES  ////////////////////////////////
///////////////////////// CART  ////////////////////////////////
export const sendCartData = (cart) => {
  return async (dispatch) => {
    // dispatch(
    //   uiActions.shownotification({
    //     status: "pending",
    //     title: "pending...",
    //     message: "your data is being sent",
    //   })
    // );
    const sendRequest = async () => {
      const response = Axios.post("http://localhost:5000/createcart", {
        userId: cart.userId,
        productId: cart.productId,
        status: cart.status,
        quantity: cart.quantity,
      });
      //   if (!response.ok) {
      //     throw new Error("sending cart data failed");
      //   }
      console.log(response + "this is the response");
    };
    try {
      await sendRequest();

      //   dispatch(
      //     uiActions.shownotification({
      //       status: "success",
      //       title: "seccess...",
      //       message: "your data was sent successfuly",
      //     })
      //   );
    } catch (error) {
      console.log("something bad happened to cart data");
      //   dispatch(
      //     uiActions.shownotification({
      //       status: "error",
      //       title: "error",
      //       message: "there was some error ",
      //     })
      //   );
    }
  };
};
///////////////////////// BRANDS ////////////////////////////////

export const sendNewBrand = (brand) => {
  return async (dispatch) => {
    dispatch(
      uiActions.shownotification({
        status: "pending",
        title: "pending...",
        message: "your data is being sent",
      })
    );

    const sendRequest = async () => {
      const response = Axios.post("http://localhost:5000/CreateNewBrand", {
        name: brand,
      });
      return response;
    };
    try {
      const response = await sendRequest();

      dispatch(
        uiActions.shownotification({
          status: "success",
          title: "seccess...",
          message: "your data was sent successfuly",
        })
      );
      return response;
    } catch (error) {
      console.log("something bad happened at actions inserting brand");
      dispatch(
        uiActions.shownotification({
          status: "error",
          title: "error",
          message: "there was some error ",
        })
      );
    }
  };
};
export const fetchBrands = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.shownotification({
        status: "pending",
        title: "pending...",
        message: "your data is being sent",
      })
    );
    const fetchData = async () => {
      const response = await Axios.get("http://localhost:5000/getBrands");
      if (response.statusText !== "OK") {
        throw new Error("could not fetch the needed data");
      }
      const data = response.data;
      return data;
    };
    try {
      const responseData = await fetchData();
      dispatch(
        brandActions.getBrands({
          brandItems: responseData,
        })
      );
      // dispatch(
      //   uiActions.shownotification({
      //     status: "success",
      //     title: "seccess...",
      //     message: "your data was sent successfuly",
      //   })
      // );
    } catch (error) {
      console.log("something went wrong");
      dispatch(
        uiActions.shownotification({
          status: "error",
          title: "error",
          message: "there was some Fetching error ",
        })
      );
    }
  };
};
///////////////////////// COMMENTS ////////////////////////////////
///////////////////////// NEWS ////////////////////////////////

export const sendNewNews = (News) => {
  return async (dispatch) => {
    dispatch(
      uiActions.shownotification({
        status: "pending",
        title: "pending...",
        message: "your data is being sent",
      })
    );

    const sendRequest = async () => {
      const response = Axios.post("http://localhost:5000/createNews", {
        title: News.title,
        description: News.description,
        createdAt: News.createdAt,
      });
      return response;
    };
    try {
      const response = await sendRequest();

      dispatch(
        uiActions.shownotification({
          status: "success",
          title: "seccess...",
          message: "your data was sent successfuly",
        })
      );
      return response;
    } catch (error) {
      console.log("something bad happened to News insertion in actions");
      dispatch(
        uiActions.shownotification({
          status: "error",
          title: "error",
          message: "there was some error ",
        })
      );
    }
  };
};
export const fetchNews = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.shownotification({
        status: "pending",
        title: "pending...",
        message: "your data is being sent",
      })
    );
    const fetchData = async () => {
      const response = await Axios.get("http://localhost:5000/fetchNews");
      if (response.statusText !== "OK") {
        throw new Error("could not fetch the needed data");
      }
      const data = response.data;
      return data;
    };
    try {
      const responseData = await fetchData();
      dispatch(
        newsActions.getNews({
          news: responseData,
        })
      );
      dispatch(
        uiActions.shownotification({
          status: "success",
          title: "seccess...",
          message: "your data was sent successfuly",
        })
      );
    } catch (error) {
      console.log("something went wrong");
      dispatch(
        uiActions.shownotification({
          status: "error",
          title: "error",
          message: "there was some Fetching error ",
        })
      );
    }
  };
};

///////////////////////// OFFERS  ////////////////////////////////
export const sendNewOffer = (offer) => {
  return async (dispatch) => {
    dispatch(
      uiActions.shownotification({
        status: "pending",
        title: "pending...",
        message: "your data is being sent",
      })
    );

    const sendRequest = async () => {
      const response = Axios.post("http://localhost:5000/createOffer", {
        title: offer.title,
        description: offer.description,
        summary: offer.summary,
      });
      return response;
    };
    try {
      const response = await sendRequest();

      dispatch(
        uiActions.shownotification({
          status: "success",
          title: "seccess...",
          message: "your data was sent successfuly",
        })
      );
      return response;
    } catch (error) {
      console.log("something bad happened to News insertion in actions");
      dispatch(
        uiActions.shownotification({
          status: "error",
          title: "error",
          message: "there was some error ",
        })
      );
    }
  };
};
export const fetchOffers = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.shownotification({
        status: "pending",
        title: "pending...",
        message: "your data is being sent",
      })
    );
    const fetchData = async () => {
      const response = await Axios.get("http://localhost:5000/getOffers");
      if (response.statusText !== "OK") {
        throw new Error("could not fetch the needed data");
      }
      const data = response.data;
      return data;
    };
    try {
      const responseData = await fetchData();
      dispatch(
        offersActions.getOffers({
          offers: responseData,
        })
      );
      dispatch(
        uiActions.shownotification({
          status: "success",
          title: "seccess...",
          message: "your data was sent successfuly",
        })
      );
    } catch (error) {
      console.log("something went wrong");
      dispatch(
        uiActions.shownotification({
          status: "error",
          title: "error",
          message: "there was some Fetching error ",
        })
      );
    }
  };
};
///////////////////////// USERS  ////////////////////////////////
