import { useState, useEffect } from "react";
import Search from "./components/Search";
import ProfileCard from "./components/ProfileCard";
import { User } from "./types";
import "./App.css";

function paramsToQuery(language: string, location: string, page: number) {
  if (!language && !location) {
    return null;
  }
  const queries = [];
  if (language) {
    queries.push(`language:${language}`);
  }
  if (location) {
    queries.push(`location:${location}`);
  }
  const queryParams = queries.join("+");

  return `?q=${queryParams}&page=${page}&per_page=30`;
}
function App() {
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [result, setResult] = useState<User[]>([]);

  const [language, setLanguage] = useState<string>("python");
  const [location, setLocation] = useState<string>("Afghanistan");

  useEffect(() => {
    if (count > 0) {
      search();
    }
  }, [page]);

  const search = () => {
    console.log(language, location);
    const query = paramsToQuery(language, location, page);
    const url = `https://api.github.com/search/users${query}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setResult(json.items);
        setCount(Math.trunc(json.total_count / 30));
      });
  };

  return (
    <div className="App">
      <Search
        language={language}
        setLanguage={setLanguage}
        location={location}
        setLocation={setLocation}
        search={search}
      />
      <div className="main_result_area">
        {result.map((r) => (
          <ProfileCard result={r} key={r.id} />
        ))}
      </div>
      {count > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <p>
            {page} of {count}
          </p>
          <button
            style={{ margin: "5px" }}
            disabled={page <= 1}
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            Previous
          </button>
          <button
            disabled={page >= count}
            style={{ margin: "5px" }}
            onClick={() => {
              if (page < count) {
                setPage(page + 1);
              }
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
