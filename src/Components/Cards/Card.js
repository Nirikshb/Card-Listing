// // import React from "react";
// // import CardListing from "../CardListing/Listing";

// // const Card = ({ card }) => {
// //   const {
// //     name,
// //     budget_name,
// //     owner_id,
// //     spent,
// //     available_to_spend,
// //     card_type,
// //     expiry,
// //     limit,
// //     status
// //   } = card;

// //   return (
// //     <div className="card">
// //       <div className="card-header">
// //         <span className="card-type">{card_type}</span>
// //       </div>
// //       <div className="card-content">
// //         <h2>{name}</h2>
// //         <p>Budget Name: {budget_name}</p>
// //         <p>Owner ID: {owner_id}</p>
// //         <p>Spent: {spent.value} {spent.currency}</p>
// //         <p>Available to Spend: {available_to_spend.value} {available_to_spend.currency}</p>
// //         {card_type === "burner" && <p>Expiry: {expiry}</p>}
// //         {card_type === "subscription" && <p>Limit: {limit}</p>}
// //         <p>Status: {status}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Card;

import React from "react";

const Card = ({ card }) => {
  const {
    name,
    budget_name,
    owner_id,
    spent,
    available_to_spend,
    card_type,
    expiry,
    limit,
    status
  } = card;

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-type">{card_type}</span>
      </div>
      <div className="card-content">
        <h2>Name : {name}</h2>
        <p>Budget Name: {budget_name}</p>
        <p>Owner ID: {owner_id}</p>
        <p>Spent: {spent.value} {spent.currency}</p>
        <p>Available to Spend: {available_to_spend.value} {available_to_spend.currency}</p>
        {card_type === "burner" && <p>Expiry: {expiry}</p>}
        {card_type === "subscription" && <p>Limit: {limit}</p>}
        <p>Status: {status}</p>
      </div>
    </div>
  );
};

export default Card;
