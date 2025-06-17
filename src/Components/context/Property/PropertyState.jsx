import PropertyContext from "./PropertyContext";
import { useEffect, useState } from "react";
const PropertyState = (props) => {
  const host = "http://localhost:5000";
  const propertiesInitial = [];
  const [allProperties, setAllProperties] = useState(propertiesInitial);
  const [myproperties, setMyProperties] = useState(propertiesInitial);
  const [apiPropertiesData, setApiPropertiesData] = useState(propertiesInitial);
  const [apiPropDetails, setApiPropDetails] = useState(propertiesInitial);
  const [userData, setUserData] = useState(null);
  //Get all Properties
  const getProperties = async () => {
    const response = await fetch(`${host}/api/listings/getProperties`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setMyProperties(json);
  };
  //Get API Properties
  const apiProperties = async () => {
    const url =
      "https://uk-real-estate-rightmove.p.rapidapi.com/buy/property-for-sale?identifier=REGION%5E1036&sort_by=HighestPrice&search_radius=0.0&added_to_site=1";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "15b25203cemshf8a2c863e49ca2cp1af372jsna35c5c626503",
        "x-rapidapi-host": "uk-real-estate-rightmove.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      setApiPropertiesData(result);
    } catch (error) {
      console.error(error);
    }
  };
  //Api for the Property Details
  const apiPropertyDetails = async (id) => {
    const url = `https://uk-real-estate-rightmove.p.rapidapi.com/buy/property-for-sale/detail?id=${id}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "3cb10783bdmsh6a69b96e9b77e90p16dd75jsn3096340bfc51",
        "x-rapidapi-host": "uk-real-estate-rightmove.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      setApiPropDetails(result);
    } catch (error) {
      console.error(error);
    }
  };
  //Add a Property
  const addProperty = async (formData) => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("category", formData.category);
    formData.images.forEach((image) => {
      data.append("images", image);
    });
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${host}/api/listings/Properties`, {
        method: "POST",
        headers: {
          "auth-token": token,
        },
        body: data,
      });
      if (!response.ok) {
        // Try to parse error response as JSON
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          const text = await response.text();
          throw new Error(text || "Unknown error occurred");
        }
        throw new Error(
          errorData.errors
            ? JSON.stringify(errorData.errors)
            : JSON.stringify(errorData)
        );
      }
      const json = await response.json();
      console.log(json);
      return json;
    } catch (err) {
      console.error("Error adding property:", err);
      throw err;
    }
  };
  //show all properties
  const showProperty = async (location) => {
    try {
      const endpoint = location
        ? `${host}/api/listings/search?location=${encodeURIComponent(location)}`
        : `${host}/api/listings/allProperties`;
      const res = await fetch(endpoint);
      const json = await res.json();
      setAllProperties(json);
      location = "";
    } catch (err) {
      console.error("Unknown Error", err);
    }
  };
  //Get User Data
  const token = localStorage.getItem("token");
    const getUserData = async () => {
      if (!token) {
        console.error("No auth-token found. Redirecting to login...");
        setUserData(null);
        return;
      }
      try {
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "auth-token": token,
          },
        });
        if (response.status === 401) {
          console.error("Guest user");
          localStorage.removeItem("token");
          setUserData(null);
          return;
        }
        const json = await response.json();
        setUserData(json);
        localStorage.setItem("userData", JSON.stringify(json));
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

  return (
    <PropertyContext.Provider
      value={{
        allProperties,
        userData,
        getUserData,
        myproperties,
        getProperties,
        addProperty,
        showProperty,
        apiProperties,
        apiPropertiesData,
        apiPropertyDetails,
        apiPropDetails,
      }}
    >
      {props.children}
    </PropertyContext.Provider>
  );
};
export default PropertyState;
