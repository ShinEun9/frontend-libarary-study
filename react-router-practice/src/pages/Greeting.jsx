import React from "react";
import {
  useParams,
  useSearchParams,
} from "react-router-dom";

export default function Greeting() {
  const { name } = useParams();
  const [from] = useSearchParams();

  return (
    <div>
      안녕하세요! {name} 난 {from}{" "}
      이에요~
    </div>
  );
}
