import React from "react";
import { useState } from "react";
import Search from "./components/Search";
import ProfileCard from "./components/ProfileCard";
import { user } from "./types";
import "./App.css";

function App() {
  const [result, setResult] = useState<user[]>([]);

  return (
    <div className="App">
      <Search result={result} setResult={setResult} />
      <ProfileCard />
    </div>
  );
}

export default App;
