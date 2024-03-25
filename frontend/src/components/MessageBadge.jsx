import React from "react";

const MessageBadge = ({ count }) => {
  return <span className='badge bg-danger rounded-pill'>{count}</span>;
};

export default MessageBadge;
