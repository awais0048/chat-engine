import logo from "./logo.svg";
import "./App.css";
import Auth from "./Pages/auth/Auth";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";
import { useEffect,useState } from "react";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from 'firebase/auth';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={user ? <Home /> : <Navigate to="/" />} >
         
        </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
