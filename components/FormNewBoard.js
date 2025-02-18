"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const FormNewBoard = () => {
    const router = useRouter();
  const [boardName, setBoardName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(loading) return;
    setLoading(true);
    try {
        const res = await axios.post("/api/board", { name: boardName });
          if (res.status === 200) {
            //alert("Board created");
            console.log("Board created", res.data);
            toast.success("Board created");
            setBoardName("");
            router.refresh();
          } else {
            //alert("Error creating board");
            console.error("Error creating board", res);
          }
          
    } catch (error) {
        console.error("An unexpected error happened:", error);
        const errorMessage = error.response?.data?.error || error.message || "An unexpected error happened"; 
        toast.error(errorMessage);
    } finally {
        setLoading(false);
    }
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-base-100 p-8 rounded-3xl shadow-lg space-y-8"
    >
      <p className="font-bold text-lg">Create a new feedback board</p>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Board Name</span>
        </div>
        <input
          required
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
      </label>
      <button type="submit" disabled={loading} className="btn btn-primary btn-block">
        {loading ? <span className="loading loading-spinner loading-xs"></span> : "Create Board"}
      </button>
    </form>
  );
};

export default FormNewBoard;
