import React from "react";
import {useDispatch, useSelector} from "react-redux";

const TicketPage = () => {
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  return (
    <div className="loginForm">
      <div id="loginH2">{auth.name}</div>
    </div>
  );
};

export default TicketPage;
