"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const FormAddPost = ({boardId}) => {
    const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(loading) return;
    setLoading(true);
    try {
        const res = await axios.post(`/api/post?boardId=${boardId}`, { title, description });
          if (res.status === 200) {
            //alert("Board created");
            console.log("Post created", res.data);
            toast.success("Post added!");
            setTitle("");
            setDescription("");
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
      className="bg-base-100 p-8 rounded-3xl shadow-lg space-y-8 w-full md:w-96 shrink-0 md:sticky top-8"
    >
      <p className="font-bold text-lg">Suggest a feature</p>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Short, descriptive title</span>
        </div>
        <input
          required
          type="text"
          placeholder="Green buttons please..."
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
        />
      </label>

        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">Description</span>
            </div>
            <textarea
            placeholder="I would like to see green buttons..."
            className="textarea textarea-bordered h-24 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={1000}
            />
        </label>


      <button type="submit" disabled={loading} className="btn btn-primary btn-block">
        {loading ? <span className="loading loading-spinner loading-xs"></span> : "Add Post"}
      </button>
    </form>
  );
};

export default FormAddPost;
