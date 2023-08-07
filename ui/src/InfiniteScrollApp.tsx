import axios from "axios";
import { useState, useRef, useEffect } from "react";
import "./InfiniteScrollApp.css";
import { throttle } from "throttle-debounce";

interface Airline {
  id: Number;
  name: String;
  country: String;
  logo: String;
  slogan: String;
  head_quearters: String;
  website: String;
  established: String;
}

interface Passenger {
  _id: String;
  name: String;
  trips: Number;
  airline: Airline;
  __v: number;
}

function InfiniteScrollApp() {
  const currentPageRef = useRef<number>(0);
  const listRef = useRef<HTMLUListElement>(null);
  const [passengers, setPassengers] = useState<Array<Passenger>>([]);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false);

  const getPassengers = async (init?: boolean) => {
    const params = { page: currentPageRef.current, size: 30 };
    try {
      const response = await axios.get(
        "https://api.instantwebtools.net/v1/passenger",
        { params }
      );
      const passengers = response.data.data;

      const isLast = response.data.totalPages === currentPageRef.current;

      init
        ? setPassengers(passengers)
        : setPassengers((prev) => [...prev, ...passengers]);
      setIsLast(isLast);
    } catch (e) {
      console.error(e);
    }
  };

  const handleScroll = throttle(1000, () => {
    if (listRef.current) {
      const { scrollHeight, offsetHeight, scrollTop } = listRef.current;

      console.log("trigger");
      const offset = 50;
      setIsScrollBottom(scrollHeight - offsetHeight - scrollTop < offset);
    }
  });

  useEffect(() => {
    if (isScrollBottom) {
      currentPageRef.current += 1;
      !isLast && getPassengers();
    }
  }, [isScrollBottom, isLast]);

  useEffect(() => {
    getPassengers(true);
  }, []);

  return (
    <div>
      <ul ref={listRef} className="list" onScroll={handleScroll}>
        {passengers.map((passenger) => (
          <li key={String(passenger._id)} className="item">
            {passenger.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InfiniteScrollApp;
