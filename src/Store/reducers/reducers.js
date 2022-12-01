const initialState = {
  isLoggedIn: false,
  showPassword: false,
  recentLoggedInUser: {},
  backButton: false,
  openDrawer: false,
  drawerContent: {},
  addedPlace: {},
  placeList: [],
  totalPlaces: 0,
  totalUsers: 0,
  page: 0,
  rowPerPage: 5,
  openLeftSideDrawer: false,
  editedPlace: {},
  openDialog: false,
  userList: [],
  role: "",
  imageList: [],
  bookList: [],
  uniqueStatePlaceList: [],
  place: {},
  tripList: [],
  searchData: "",
  openLoginDialog: false,
  openSearchBox: false,
  filterCategory: "",
  openReviewBox: false,
  reviewBoxContent: {},
  reviewId: "",
  errorMessage: "",
  salesList: [],
};
const reducerfunction = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER": {
      return {
        ...state,
        isLoggedIn: true,
        recentLoggedInUser: action.payload,
      };
    }

    case "LOGIN_VALUE": {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    case "LOGOUT_VALUE": {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    case "PLACE_LIST": {
      return {
        ...state,
        placeList: [...state?.placeList, ...action?.payload],
        totalPlaces: action.count,
        totalUsers: action.countUser,
        searchData: action.searchData,
        // totalUsers: action.searchData ? state.totalUsers : action.count,
        searchlength: action.searchData ? action.count : 0,
      };
    }
    case "UNIQUE_STATE_PLACE_LIST": {
      return {
        ...state,
        uniqueStatePlaceList: action.payload,
      };
    }
    case "IMAGE_LIST": {
      console.log("dfgdfgdf");
      return {
        ...state,
        imageList: action.payload,
      };
    }
    case "ADD_IMAGE": {
      return {
        ...state,
        imageList: [action.payload, ...state.imageList],
      };
    }
    case "USER_LIST":
      console.log("dfdf");
      return {
        ...state,
        userList: [...state.userList, ...action.payload],
        searchData: action.searchData,
        totalUsers: action.count,
        searchlength: action.searchData ? action.count : 0,
      };

    case "OPEN_DRAWER": {
      return {
        ...state,
        openDrawer: true,
        drawerContent: action.content,
      };
    }
    case "CLOSE_DRAWER": {
      return {
        ...state,

        openDrawer: false,
        imageList: [],
        addedPlace: {},
        editedPlace: {},
      };
    }
    case "OPEN_SIDE_DRAWER": {
      return {
        ...state,
        openLeftSideDrawer: true,
      };
    }
    case "OPEN_LOGIN_DIALOG": {
      return {
        ...state,
        openLoginDialog: true,
      };
    }
    case "CLOSE_LOGIN_DIALOG": {
      return {
        ...state,
        openLoginDialog: false,
      };
    }
    case "CLOSE_SIDE_DRAWER": {
      return {
        ...state,
        openLeftSideDrawer: false,
      };
    }
    case "ADD_PLACE": {
      return {
        ...state,
        addedPlace: [action.payload],
        placeList: [action.payload, ...state.placeList],
        totalPlaces: state.totalPlaces + 1,
      };
    }
    case "EDIT_PLACE": {
      return {
        ...state,
        placeList: state.placeList.map((content, i) =>
          content._id === action.id ? action.payload : content
        ),
        editedPlace: [action.payload],
      };
    }
    case "DELETE_PLACE":
      return {
        ...state,
        placeList: state.placeList.filter(
          (item) => item._id !== action.payload
        ),
        totalPlaces: state.totalPlaces - 1,
        // deletelength: state.deletelength + 1,
      };
    case "DELETE_IMAGE":
      return {
        ...state,
        imageList: state.imageList.filter(
          (item) => item._id !== action.payload
        ),

        // deletelength: state.deletelength + 1,
      };
    case "EDIT_PLACE_ID": {
      return {
        ...state,
        editedPlace: state.placeList.filter((item) => item._id === action.id),
      };
    }

    case "PAGE":
      console.log(action.page);
      return { ...state, page: action.page };

    case "ROW_PER_PAGE": {
      console.log(action.page, state.placeList.length);
      return {
        ...state,
        rowPerPage: action.page,
        placeList:
          action.page <= state.totalPlaces &&
          action.page !== state.placeList.length
            ? []
            : state.placeList,
      };
    }
    case "BACK_BUTTON": {
      return {
        ...state,
        backButton: true,
      };
    }
    case "BACK_BUTTON_DISABLED": {
      return {
        ...state,
        backButton: false,
      };
    }
    case "OPEN_DIALOG": {
      return {
        ...state,
        openDialog: true,
      };
    }
    case "CLOSE_DIALOG": {
      return {
        ...state,
        openDialog: false,
      };
    }
    case "REFRESH_ON_DELETE": {
      return {
        ...state,
        page:
          state.page * state.rowPerPage === state.placeList.length
            ? state.page - 1
            : state.page,
      };
    }
    case "PLACE": {
      return {
        ...state,
        place: action.payload,
      };
    }
    case "ADD_TRIP": {
      console.log(action.editable);
      return {
        ...state,
        tripList: action.editable
          ? state.tripList.map((item) =>
              item._id === action.payload._id ? action.payload : item
            )
          : [action.payload, ...state.tripList],
        place: { ...state.place, trip: action.payload.trip },
      };
    }
    case "TRIP_LIST": {
      return {
        ...state,
        tripList: action.payload.trip,
        placeList: action.payload.placeList,
      };
    }
    case "RESET_PLACE_LIST": {
      return {
        ...state,
        placeList: [],
        searchData: action.content,
        userList: [],
      };
    }
    case "OPEN_SEARCH_BOX": {
      return {
        ...state,
        openSearchBox: true,
        filterCategory: action.category,
      };
    }
    case "CLOSE_SEARCH_BOX": {
      console.log("reducer");
      return {
        ...state,
        openSearchBox: false,
        filterCategory: "",
      };
    }

    case "OPEN_REVIEW_BOX": {
      return {
        ...state,
        reviewBoxContent: action.content,
        openReviewBox: true,
        reviewId: action.id,
      };
    }
    case "CLOSE_REVIEW_BOX": {
      return {
        ...state,
        reviewBoxContent: "",
        openReviewBox: false,
      };
    }
    case "ADD_REVIEW": {
      console.log(action.payload);
      return {
        ...state,
        place: {
          ...state.place,
          reviews: state.place.reviews.concat(action.payload),
          averageRating:
            state.place.averageRating > 0 ?  (state.place.averageRating * state.place.reviews.length +
              action.payload.rating) /
            (state.place.reviews.length + 1) : action.payload.rating ,
        },
      };
    }

    case "EDIT_REVIEW": {
      state.place.reviews.map((i) => console.log(i._id, action.payload._id));
      return {
        ...state,
        place: {
          ...state.place,
          reviews: state.place.reviews.map((i) =>
            i.userId === action.payload.userId ? action.payload : i
          ),
          averageRating: action.averageRating,
        },
      };
    }
    case "DELETE_REVIEW": {
      console.log(action.id);
      return {
        ...state,
        place: {
          ...state.place,
          reviews: state.place.reviews.filter((i) => i.userId !== action.id),
          averageRating: action.averageRating,
        },
      };
    }
    case "EDIT_USER": {
      return {
        ...state,
        recentLoggedInUser: action.payload,
      };
    }
    case "BOOK_LIST": {
      return {
        ...state,
        bookList: action.payload.bookPlace,
        placeList: action.payload.placeList,
      };
    }
    case "ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.msg,
      };

    case "RESET_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: "",
      };
    case "SALES_LIST": {
      return {
        ...state,
        salesList: action.payload,
        totalPlaces: action.searchData ? state.totalPlaces : action.count,
        totalUsers: action.countUser,
      };
    }

    default: {
      return { ...state };
    }
  }
};
export default reducerfunction;
