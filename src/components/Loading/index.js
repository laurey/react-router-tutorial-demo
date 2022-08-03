import React from "react";

const Loading = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the error state
  if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  return null;
};

export default Loading;
