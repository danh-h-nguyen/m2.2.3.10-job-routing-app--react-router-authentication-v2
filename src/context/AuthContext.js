import { createContext, useEffect, useReducer } from "react";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated: isAuthenticated,
        isInitialized: true,
        user: user,
      };

    case "SIGNIN_SUCCESS":
      console.log(action.payload.username);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case "SIGNOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const username = window.localStorage.getItem("username");

        if (username) {
          dispatch({
            type: "INITIALIZE",
            payload: { isAuthenticated: true, user: { username } },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: { isAuthenticated: false, user: null },
        });
      }
    };

    initialize();
  }, []);

  const signin = async (username) => {
    window.localStorage.setItem("username", username);
    dispatch({
      type: "SIGNIN_SUCCESS",
      payload: { username },
    });
  };

  const signout = async () => {
    window.localStorage.removeItem("username");
    dispatch({ type: "SIGNOUT" });
  };

  console.log(state);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
