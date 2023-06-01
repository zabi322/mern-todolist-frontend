import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
// import TodosList from "./TodosList";
import MuiTodos from "./MuiTodos";
import { AuthProvider } from './AuthContext';


function App() {

  return (
    <div className="App">
        <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* <Route path="/todos" element={<TodosList />} /> */}
          <Route path="/todos" element={<MuiTodos />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
