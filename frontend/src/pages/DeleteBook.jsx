import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setTitle(res.data.title);
        setLoading(false);
      })
      .catch((error) => {
        alert("An error has occured.check the console");
        console.log(error);
      });
  }, []);

  const handleDeleteBtn = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Check the console log");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl p-8 mx-auto w-[600px]">
        <h3 className="text-2xl text-red-700">
          Do You Want To Delete This Book?
        </h3>
        <div className="my-4">
          <h1 className="text-indigo-500 font-bold text-6xl mx-10 p-4">
            {title}
          </h1>
          <h4 className="text-green-500">by {author}</h4>
        </div>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBtn}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteBook;
