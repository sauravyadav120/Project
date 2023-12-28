"use client";
import React from "react";
import ConnectionCard from "./ConnectionCard";

const ConnectionSection = ({ connections, refetch, isLoading, userId,otherConnections,otherRefetch,otherLoading }) => {
  if (isLoading)
    return <h1 className="text-center mt-7">Loading Connections...</h1>;
  return (
    <div className="p-2 flex flex-col max-w-7xl  mx-auto ">
      <div className="mt-3 p-2 grid">
        {connections &&
          connections.map((item, idx) => (
            <ConnectionCard
              key={idx}
              item={item}
              refetch={refetch}
              userId={userId}
              type={"remove"}
              otherRefetch={otherRefetch}
            />
          ))}
      </div>
      <h1 className="mt-6 text-2xl text-textLabel font-normal">People you can also connect</h1>
      {otherLoading && <h1 className="text-center mt-7">Finding other people...</h1>}
      <div className="mt-3 p-2 grid">
        {otherConnections &&
          otherConnections.map((item, idx) => (
            <ConnectionCard
              key={idx}
              item={item}
              refetch={otherRefetch}
              userId={userId}
              type={"add"}
              otherRefetch={refetch}
            />
          ))}
      </div>
      
    </div>
  );
};

export default ConnectionSection;
