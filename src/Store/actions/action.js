import axios from "axios";
import {url} from './config'

export const OPEN_SEARCH_BOX = "OPEN_SEARCH_BOX";
export const CLOSE_SEARCH_BOX = "CLOSE_SEARCH_BOX";
export const OPEN_LOGIN_DIALOG = "OPEN_LOGIN_DIALOG";
export const CLOSE_LOGIN_DIALOG = "CLOSE_LOGIN_DIALOG";
export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const LOGOUT = "LOGOUT";
export const OPEN_DRAWER = "OPEN_DRAWER";
export const CLOSE_DRAWER = "CLOSE_DRAWER";
export const ADD_PLACE = "ADD_PLACE";
export const PLACE_LIST = "PLACE_LIST";
export const USER_LIST = "USER_LIST";
export const OPEN_SIDE_DRAWER = "OPEN_SIDE_DRAWER";
export const CLOSE_SIDE_DRAWER = "CLOSE_SIDE_DRAWER";
export const PAGE = "PAGE";
export const BACK_BUTTON = "BACK_BUTTON";
export const BACK_BUTTON_DISABLED = "BACK_BUTTON_DISABLED";
export const ROW_PER_PAGE = "ROW_PER_PAGE";
export const EDIT_PLACE = "EDIT_PLACE";
export const EDIT_PLACE_ID = "EDIT_PLACE_ID";
export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";
export const DELETE_PLACE = "DELETE_PLACE";
export const REFRESH_ON_DELETE = "REFRESH_ON_DELETE";
export const ADD_IMAGE = "ADD_IMAGE";
export const IMAGE_LIST = "IMAGE_LIST";
export const DELETE_IMAGE = "DELETE_IMAGE";
export const LOGIN_VALUE = "LOGIN_VALUE";
export const LOGOUT_VALUE = "LOGOUT_VALUE";
export const UNIQUE_STATE_PLACE_LIST = "UNIQUE_STATE_PLACE_LIST";
export const PLACE = "PLACE";
export const ADD_TRIP = "ADD_TRIP";
export const TRIP_LIST = "TRIP_LIST";
export const RESET_PLACE_LIST = "RESET_PLACE_LIST";
export const ADD_REVIEW = "ADD_REVIEW";
export const EDIT_REVIEW = "EDIT_REVIEW";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const OPEN_REVIEW_BOX = "OPEN_REVIEW_BOX";
export const CLOSE_REVIEW_BOX = "CLOSE_REVIEW_BOX";
export const EDIT_USER = "EDIT_USER";
export const BOOK_LIST = "BOOK_LIST";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const RESET_ERROR_MESSAGE = "RESET_ERROR_MESSAGE";
export const SALES_LIST = "SALES_LIST";

export const LoginValue = () => {
  return {
    type: LOGIN_VALUE,
  };
};

export const LogoutValue = () => {
  return {
    type: LOGOUT_VALUE,
  };
};

export const verifyTokenAction = () => {
  return async (dispatch) => {
    let response;
    const token = localStorage.getItem("Token");
    try {

      response = await axios.get(`${url}/verify-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);


    } catch (error) {
      console.log(error);
    }
    if (response?.data) {
      dispatch({ type: REGISTER, payload: response.data });
      return response;
    }
  };
}

export const registerUser = (data) => {
  return async (dispatch) => {
    let response;
    console.log(data);
    try {
      console.log(data);
      response = await axios.post(`${url}/register-user`, {
        ...data,
      });
      console.log(response.data);
      localStorage.setItem("Token", response.data.token);
      // localStorage.setItem("Role", response.data.user.role);
      localStorage.setItem("User", JSON.stringify(response.data.user));

    } catch (error) {
      return error.response.data.error;
    }
    if (response?.data) {
      dispatch({ type: REGISTER, payload: response.data.user });
    }
  };
};
export const loginUser = (data) => {
  return async (dispatch, getState) => {
    let response;
    const currentState = getState();
    try {
      response = await axios.post(`${url}/login-user`, {
        ...data,
      });
      console.log(response.data.user.role);
      localStorage.setItem("Token", response.data.token);
      // localStorage.setItem("Role", response.data.user.role);
      localStorage.setItem("User", JSON.stringify(response.data.user));

      return response.data.user;
    } catch (error) {
      return error.response.data.error;
    }
  };
};

export const logoutUser = () => {
  return async (dispatch, getState) => {
    let response;
    const token = localStorage.getItem("Token");

    const currentState = getState();
    try {
      response = await axios.post(
        `url/logout-user`,
        { ...currentState.vacation.recentLoggedInUser },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } catch (error) {
      console.log(error);
    }

    dispatch({ type: LOGOUT });

  };
};
export const storePlaceList = (searchData = "", limit = 5, skip = 0, rating = false, category = "") => {
  // debugger
  console.log("sdfsdf")
  return async (dispatch, getState) => {

    let currentState = getState();

    let response;
    console.log("store");
    response = await axios.get(
      `${url}/get-all-places?skip=${skip}&limit=${limit}&rating=${rating}&search=${searchData}&category=${category}`
    );



    if (response?.data?.user) {
      dispatch({
        type: PLACE_LIST,
        payload: response?.data.user,
        count: response.data.count,
        searchData
      });
      return response

    }
  };
};

export const GetDataFromWikipediaAction = (searchData) => {

  return async (dispatch, getState) => {

    let response;



    response = await axios.get(
      `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=${searchData.includes('York') ? 'New_York_City' : searchData}`,

    );



    if (response?.data) {

      return response.data
    }
  };
};
export const storeUserList = (searchData = "", limit = 5, skip = 0) => {
  // debugger
  return async (dispatch, getState) => {
    let currentState = getState();
    const token = localStorage.getItem("Token");
    let response;

    response = await axios.get(
      `${url}/users/get-all-users?limit=${limit}&skip=${skip}&name=${searchData}`

    );



    if (response?.data?.user) {
      dispatch({
        type: USER_LIST,
        payload: response.data.user,
        count: response.data.count,
        searchData,
      });
    }
  };
};

export const openDrawerAction = (content) => {
  return {
    type: OPEN_DRAWER,
    content,
  };
};
export const closeDrawerAction = () => {
  return {
    type: CLOSE_DRAWER,
  };
};

export const openLoginDialogAction = (content) => {
  return {
    type: OPEN_LOGIN_DIALOG,
    content,
  };
};
export const closeLoginDialogAction = () => {
  return {
    type: CLOSE_LOGIN_DIALOG,
  };
};

export const addPlaceAction = (data) => {
  var formdata = new FormData();
  return async (dispatch, getState) => {
    let currentState = getState();
    let response;
    const token = localStorage.getItem("Token");
    try {
      response = await axios.post(
        `${url}/add-place`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
console.log("dgdfgdfgd" ,data)
      if (data.file) {
      //   formdata.append("image", data.file);
        const res = await axios.post(
          `${url}/place/${response.data._id}/image`,
          {fileStr  : data.file}
        );

        response.data.avatar = res.data;
      }
    } catch (error) {
      return error.response.data.error;
    }

    if (response?.data) {
      dispatch({ type: ADD_PLACE, payload: response.data });
    }
  };
};

export const editPlaceAction = (id, data) => {
  var formdata = new FormData();
  return async (dispatch) => {
    const token = localStorage.getItem("Token");
    let response;
    try {
      response = await axios.post(
        `${url}/edit-place/${id}`,
        {
          name: data.name,
          description: data.description,
          category: data.category,
          season: data.season,
          month: data.month,
          package: data.package,
          country: data.country,
          city: data.city,
          state: data.state,
          address: data.address,
          roomOrMembers: data.roomOrMembers,
          website: data.website,
          contactNo: data.contactNo,
          closingHours: data.closingHours,
          openingHours: data.openingHours

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("dgdfgdfgd" ,data)
      if (data.file) {
      //   formdata.append("image", data.file);
        const res = await axios.post(
          `${url}/place/${response.data._id}/image`,
          {fileStr  : data.file}
        );

        response.data.avatar = res.data;
      }
    } catch (error) {
      return error.response.data.error;
    }

    if (response?.data) {
      dispatch({ type: EDIT_PLACE, payload: response?.data, id });
    }
  };
};
export const deletePlaceAction = (id) => {
  return async (dispatch, getState) => {
    let response;
    try {
      const token = localStorage.getItem("Token");
      response = await axios.get(`${url}/delete-place/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }

    if (response.data) {
      dispatch({ type: DELETE_PLACE, payload: id });
    }
  };
};

export const editedPlacedIdAction = (id) => {
  return {
    type: EDIT_PLACE_ID,
    id,
  };
};
export const changePageAction = (page) => {
  return {
    type: PAGE,
    page,
  };
};

export const changeRowPerPageAction = (page) => {
  return {
    type: ROW_PER_PAGE,
    page,
  };
};
export const openLeftSideDrawerAction = (content) => {
  return {
    type: OPEN_SIDE_DRAWER,
    content,
  };
};
export const closeLeftSideDrawerAction = () => {
  return {
    type: CLOSE_SIDE_DRAWER,
  };
};

export const backButtonAction = () => {
  return {
    type: BACK_BUTTON,
  };
};
export const backButtonDisabledAction = () => {
  return {
    type: BACK_BUTTON_DISABLED,
  };
};
export const openDialogAction = () => {
  return {
    type: OPEN_DIALOG,
  };
};
export const closeDialogAction = () => {
  return {
    type: CLOSE_DIALOG,
  };
};

export const refreshListOnDelete = () => {
  return {
    type: REFRESH_ON_DELETE,
  };
};
export const resetPlaceListAction = (content) => {
  return {
    type: RESET_PLACE_LIST,
    content
  };
};

export const addImageAction = (data, id) => {
  // var formdata = new FormData();
  return async (dispatch, getState) => {
    let currentState = getState();
    let res;
    try {
      if (data) {
        // formdata.append("image", data);

        res = await axios.post(
          `${url}/places/${id}/image`,
          {fileStr : data}
        );
      }
    } catch (error) {
      return error;
    }

    if (res?.data) {
      dispatch({ type: ADD_IMAGE, payload: res.data });
    }
  };
};

export const storeImageList = (id) => {

  return async (dispatch, getState) => {
    let currentState = getState();

    let response;

    response = await axios.get(`${url}/get-images/${id}`);

    console.log(response?.data);

    if (response?.data) {
      dispatch({
        type: IMAGE_LIST,
        payload: response.data,
      });
      return response
    }
  };
};

export const deleteImageAction = (id) => {
  return async (dispatch, getState) => {
    let response;
    try {
      response = await axios.get(`${url}/delete-image/${id}`);
    } catch (error) {
      console.log(error);
    }

    if (response?.data) {
      dispatch({ type: DELETE_IMAGE, payload: id });
    }
  };
};
export const addAdminAction = (data) => {
  return async (dispatch, getState) => {
    let currentState = getState();
    let response;
    const token = localStorage.getItem("Token");
    try {
      response = await axios.post(
        "${url}/add-admin",
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      return error.response.data.error;
    }
  };
};

export const storeUnqiueStatePlaceList = (limit = 5) => {

  return async (dispatch, getState) => {
    let currentState = getState();

    let response;

    response = await axios.get(
      `${url}/get-one-place-of-each-state?limit=${limit}`
    );

     console.log( "sfsdf", response.data.place);

    if (response?.data) {
      dispatch({
        type: UNIQUE_STATE_PLACE_LIST,
        payload: response.data.place,
      });
      return response
    }
  };
};

export const storePlaceAction = (id) => {

  return async (dispatch, getState) => {
    let currentState = getState();

    let response;

    response = await axios.get(`${url}/get-place/${id}`);

    console.log(response.data);

    if (response?.data) {
      dispatch({
        type: PLACE,
        payload: response.data,
      });
      return response
    }
  };
};

export const addTripAction = (id) => {

  return async (dispatch, getState) => {
    let currentState = getState();
    const token = localStorage.getItem("Token");

    let response;

    response = await axios.post(
      `${url}/trip/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let editable;
    currentState.vacation.tripList.map((trip) => {
      console.log(trip._id, response.data._id);
      if (trip._id === response.data._id) {
        console.log("edit");
        editable = true;
      }
    });

    if (response?.data) {
      dispatch({
        type: ADD_TRIP,
        payload: response.data,
        editable,
      });
    }
  };
};
export const storeTripAction = () => {

  return async (dispatch, getState) => {
    const token = localStorage.getItem("Token");
    let currentState = getState();

    let response;

    response = await axios.get(`${url}/get-all-trips`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });


    if (response?.data) {
      dispatch({
        type: TRIP_LIST,
        payload: response.data,
      });
      return response
    }
  };
};
export const openSearchBoxAction = (category = "") => {
  return {
    type: OPEN_SEARCH_BOX,
    category,
  };
};
export const closeSearchBoxAction = () => {
  console.log("action");
  return {
    type: CLOSE_SEARCH_BOX,
  };
};



export const openReviewBoxAction = (content, id) => {
  return {
    type: OPEN_REVIEW_BOX,
    content,
    id
  };
};
export const closeReviewBoxAction = () => {
  return {
    type: CLOSE_REVIEW_BOX,
  };
};


export const addReviewAction = (data) => {
  return async (dispatch, getState) => {
    let currentState = getState();
    let response;
    const token = localStorage.getItem("Token");
    try {
      response = await axios.post(
        `${url}/add-review?id=${currentState.vacation.place._id}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data) {
        dispatch({
          type: ADD_REVIEW,
          payload: response.data,
        });
        return response
      }
    } catch (error) {
      return error.response.data.error;
    }
  };
};
export const editReviewAction = (data) => {
  return async (dispatch, getState) => {
    let currentState = getState();
    let response;
    const token = localStorage.getItem("Token");
    try {
      response = await axios.post(
        `${url}/edit-review?id=${currentState.vacation.place._id}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data) {
        dispatch({
          type: EDIT_REVIEW,
          payload: response.data.review,
          averageRating: response.data.averageRating
        });
        return response
      }
    } catch (error) {
      return error.response.data.error;
    }
  };
};

export const deleteReviewAction = (id) => {
  return async (dispatch, getState) => {
    let currentState = getState();
    let response;
    const token = localStorage.getItem("Token");
    try {
      response = await axios.get(
        `${url}/delete-review?id=${currentState.vacation.place._id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data) {
        dispatch({
          type: DELETE_REVIEW,
          id,
          averageRating: response.data.averageRating
        });
        return response
      }
    } catch (error) {
      return error.response.data.error;
    }
  };
};
export const editUserAction = (data, id) => {
  var formdata = new FormData();
  return async (dispatch, getState) => {
    let currentState = getState();
    let response;
    const token = localStorage.getItem("Token");
    try {
      response = await axios.post(
        `${url}/edit-users/${id}`,
        {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          contact: data.contact,
          country: data.country,
          state: data.state,
          city: data.city,
          address: data.address,
          aboutYou: data.aboutYou,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.file) {
        formdata.append("image", data.file);

        const res = await axios.post(
          `${url}/users/${response.data._id}/image`,
          formdata
        );

        response.data.avatar = res.data;
      }

      localStorage.setItem("User", JSON.stringify(response.data));

      if (response?.data) {
        dispatch({
          type: EDIT_USER,
          payload: response.data
        });
        return response
      }
    } catch (error) {
      return error.response.data.error;
    }


  };
};

export const checkAvailabilityAction = (date, id) => {
  console.log(date[0], date[1]);
  return async (dispatch, getState) => {
    const token = localStorage.getItem("Token");
    let currentState = getState();

    let response;
    try {
      response = await axios.get(`${url}/check-availability?startDate=${date[0]}&endDate=${date[1]}&id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });


      if (response?.status === 200) {

        return response
      }
    }
    catch (error) {
      return error.response.data.error;
    }
  };
};


export const BookPlaceAction = (data) => {
  return async (dispatch, getState) => {
    let currentState = getState();
    let response;
    const token = localStorage.getItem("Token");
    try {
      console.log(data);
      response = await axios.post(
        `${url}/book-place?id=${currentState.vacation.place._id}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data) {

        return response
      }
    } catch (error) {
      return error.response.data.error;
    }
  };
};

export const storeBookingAction = () => {

  return async (dispatch, getState) => {
    const token = localStorage.getItem("Token");
    let currentState = getState();

    let response;

    response = await axios.get(`${url}/get-all-booking`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);

    if (response?.data) {
      dispatch({
        type: BOOK_LIST,
        payload: response.data,
      });
      return response
    }
  };
};
export const errorMessageAction = (msg) => {
  return {
    type: ERROR_MESSAGE,
    msg
  }
};


export const resetErrorMessageAction = () => {
  return {
    type: RESET_ERROR_MESSAGE,

  }
};

export const storeSalesAction = (year) => {

  return async (dispatch, getState) => {
    let currentState = getState();
    const token = localStorage.getItem("Token");

    let response;



    response = await axios.get(
      `${url}/sales?year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );



    if (response?.data) {
      dispatch({
        type: SALES_LIST,
        payload: response.data.sales,
        count: response.data.count,
        countUser: response.data.countUser,

      });
      return response
    }
  };
};
