"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ButtonPortal = () => {
  const [loading, setLoading] = useState(false);
  const handleBilling = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/billing/create-portal", {
        returnUrl: window.location.href,
      });

      //console.log("response: ", response);

      const { url } = response.data;
      //console.log("url: ", url);
      window.location.href = url;
    } catch (error) {
      console.error("An unexpected error happened:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "An unexpected error happened";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleBilling}
      disabled={loading}
      className="btn btn-primary"
    >
      {loading && <span className="loading loading-spinner loading-xs"></span>}
      {!loading && "Billing"}
    </button>
  );
};

export default ButtonPortal;
