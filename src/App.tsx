import React from "react";
import { useState } from "react";
import Search from "./components/Search";
import ProfileCard from "./components/ProfileCard";
import { User } from "./types";
import "./App.css";

function App() {
  // const [result, setResult] = useState<any[]>([]);
  const [result, setResult] = useState<User[]>([]);

  return (
    <div className="App">
      <Search setResult={setResult} />
      <div className="main_result_area">
        {result.map((r) => (
          <ProfileCard result={r} key={r.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
