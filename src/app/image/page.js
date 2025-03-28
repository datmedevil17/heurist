"use client"
import axios from "axios";
import React, { useEffect } from "react";

export default function page() {
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.post("/api/getImage", { test: "hello" });
        alert("Successful");
      } catch (err) {
        console.log(err);
      }
    };
    fetch()
  }),[];
  return <div>HI</div>;
}
