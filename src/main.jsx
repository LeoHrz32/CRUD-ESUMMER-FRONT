import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
//AUTH PROVIDERS
// import { CoursesProvider } from "./context/courses/coursesContext";  
import { TeacherProvider } from "./context/teachers/teachersContext.jsx";
//TRAINEES PROVIDERS  
//SOCKET PROVIDER
import { SocketProvider } from "./context/socketContext";

//LANDING
import { Provider } from 'react-redux';
import { store } from './Stores/Index.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <TeacherProvider>
      {/* <CoursesProvider> */}
      <Provider store={store}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Provider>
      {/* </CoursesProvider> */}
    </TeacherProvider>

  </React.StrictMode >
)
