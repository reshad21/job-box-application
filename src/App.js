import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from "react-router-dom";
import auth from './firebase/firebase.config';
import { setUser } from './redux/features/auth/authSlice';
import routes from "./routes/routes";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email))
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
