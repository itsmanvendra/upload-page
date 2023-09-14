import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ViewOlderUploads from "./pages/ViewOlderUploads";
import FileUpload from "./pages/FileUpload";
import {SnackbarProvider} from "notistack";


function App() {
  return (
    <Router>
      <SnackbarProvider>
        <Routes>
          <Route path="/" exact element={<FileUpload />} />
          <Route path="/view-older-uploads" element={<ViewOlderUploads />} />
        </Routes>
      </SnackbarProvider>
    </Router>
  );
  
}

export default App;
