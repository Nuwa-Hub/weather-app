import React, { useEffect, useRef, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../../store/fetchWeather";
import { fetchCities } from "./../../api/placeSuggestion";
import { useClickOutside } from "./../../hooks/useClickOutside";
import {
  LocationButton,
  LocationIcon,
  SearchElement,
  SearchIcon,
  SearchInput,
  SearchResult,
} from "./styled";
import Suggestion from "./Suggestion";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const suggestionRef = useRef(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    setShowSuggestions(true);
    fetchCities(searchTerm).then((res) => {
      setSuggestions(res);
    });
  }, [searchTerm]);

  useEffect(() => {
    const position = {
      coords: {
        latitude: 6.927079,
        longitude: 79.861244,
      },
    };

    showPosition(position);
  }, []);

  useClickOutside(suggestionRef, () => setShowSuggestions(false));

  const onSearchLatitude = (e: any) => {
    console.log(e.target.value);
    setLat(e.target.value);
  };

  const onSearchLongitude = (e: any) => {
    console.log(e.target.value);
    setLng(e.target.value);
  };

  const searchLocation = () => {
    const position = {
      coords: {
        latitude: lat,
        longitude: lng,
      },
    };

    showPosition(position);
  };

  const showPosition = (position: any) => {
    dispatch(
      fetchWeather({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  };
  return (
    <SearchElement>
      <SearchIcon onClick={searchLocation} />
      <DebounceInput
        element={SearchInput}
        debounceTimeout={300}
        onChange={onSearchLatitude}
        placeholder="latitude"
      />

      <DebounceInput
        element={SearchInput}
        debounceTimeout={300}
        onChange={onSearchLongitude}
        placeholder="longitude"
      />
      <LocationButton
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else {
            alert("Geolocation is not supported by this browser.");
          }
        }}
      >
        <LocationIcon />
      </LocationButton>
      {showSuggestions && (
        <SearchResult ref={suggestionRef}>
          {suggestions?.slice(0, 6)?.map((s, i) => (
            <Suggestion
              key={i}
              label={s}
              hideSuggestionFn={() => {
                setShowSuggestions(false);
              }}
            />
          ))}
        </SearchResult>
      )}
    </SearchElement>
  );
};

export default Search;
