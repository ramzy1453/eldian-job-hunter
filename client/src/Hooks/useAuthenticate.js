import { authActions } from "../Store/auth";
import { useDispatch, useSelector } from "react-redux";

export default function useAuthenticate() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return {
    auth,
    setAuth: (auth) => dispatch(authActions.setAuth(auth)),
    removeAuth: () => dispatch(authActions.removeAuth()),
  };
}
