import React from "react";
import { Tasks } from "../components";
import { useGlobalContext } from "../context/global_context";

const Home = () => {
  const { listItems } = useGlobalContext();
  return (
    <section className="app-tasks">
      {listItems.map((list) => (
        <Tasks list={list} key={list.id} withoutEmpty />
      ))}
    </section>
  );
};

export default Home;
