import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from "react-router-dom";
import auth from './firebase/firebase.config';
import { setUser, toggleLoading } from './redux/features/auth/authSlice';
import routes from "./routes/routes";

function App() {
  const { isLoading } = useSelector(state => state.auth);
  console.log(isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email))
      }else{
        dispatch(toggleLoading());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
