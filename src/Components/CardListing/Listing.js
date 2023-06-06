import React, { useState, useEffect } from "react";
import Card from "../Cards/Card";
import fetchData from "../../FetchData";
import Tab from "../Tab/Tab";

const Listing = () => {
 // Storing all the cards
 const [cards, setCards] = useState([]); 
 // Storing filtered cards 
 const [filteredCards, setFilteredCards] = useState([]);
 // Active tab named Your 
 const [activeTab, setActiveTab] = useState("Your");
 // for the search term 
 const [searchTerm, setSearchTerm] = useState(""); 
 // the current page set to page
 const [page, setPage] = useState(1); 
 // card loading set to false
 const [loading, setLoading] = useState(false);
 // setting more cards to true 
 const [hasMore, setHasMore] = useState(true); 

// useEffect(() => {
//     fetchCards();
//     filterCards();
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [filteredCards, cards, searchTerm]);
 useEffect(() => {
    // function ab() {
    //     fetchCards();
    // }
    // ab();
    fetchCards();
  }, []);

  useEffect(() => {
    filterCards();
  }, [cards, searchTerm]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [filteredCards]);

  const fetchCards = async () => {
    setLoading(true);
    try {
        //fetching new cards
      const response = await fetchData(page);
      const newCards = response.data;
    //   console.log(newCards);
      //updating data with fetched card
      setCards((prevCards) => [...prevCards, ...newCards]);
      //if we scrolled until end add another page.
      setPage((prevPage) => prevPage + 1);
      setHasMore(newCards.length > 0);
      //if the new card length is more print it.
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    filterCards(tab);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterCards(activeTab, term);
  };

  const filterCards = (tab = activeTab, term = searchTerm) => {
    let filtered = [];

    if (tab === "Your") {
      filtered = cards.filter((card) => card.owner_id === 1);
    } else if (tab === "All") {
      filtered = cards;
    } else if (tab === "Blocked") {
      filtered = cards.filter((card) => card.status === "blocked");
    }

    filtered = filtered.filter((card) =>
      card.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredCards(filtered);
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight && !loading && hasMore) {
      fetchCards();
    }
  };

  return (
    <div className="card-listing">
      <div className="tabs">
        <Tab
          label="Your"
          activeTab={activeTab}
          onClick={() => handleTabClick("Your")}
        />
        <Tab
          label="All"
          activeTab={activeTab}
          onClick={() => handleTabClick("All")}
        />
        <Tab
          label="Blocked"
          activeTab={activeTab}
          onClick={() => handleTabClick("Blocked")}
        />
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search by card name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="card-container">
        {filteredCards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
        {loading && <div className="loading">Loading...</div>}
      </div>
    </div>
  );
};

export default Listing;
