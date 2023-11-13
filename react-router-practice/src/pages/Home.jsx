import React, { useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function Home() {
  const [params, setParams] =
    useState("");
  const [
    queryParamsInput,
    setQueryParamsInput,
  ] = useState("");
  const [queryParams, setQueryParams] =
    useSearchParams();
  // 1 리액트 라우터에서는 Link
  // 2 Navigate
  const navigate = useNavigate();

  const handleParamsChange = (e) => {
    setParams(e.target.value);
  };
  const handleQueryParamsChange = (
    e,
  ) => {
    setQueryParamsInput(e.target.value);
  };
  const handleClick = () => {
    navigate(`/greet/${params}`);
    setQueryParams({
      from: queryParamsInput,
    });
  };

  return (
    <div>
      <input
        type="text"
        value={params}
        onChange={handleParamsChange}
        placeholder="search params"
      />
      <button onClick={handleClick}>
        환영!
      </button>
      <input
        type="text"
        value={queryParamsInput}
        onChange={
          handleQueryParamsChange
        }
        placeholder="Query Params"
      />
    </div>
  );
}
