"use client";

import { useState } from "react";
import axios from "axios";


export default function Home() {
const [movieId, setMovieId] = useState("");
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("API_URL:", API_URL);

 const fetchMovie = async () => {

  try {

    setLoading(true);

    const res = await axios.get(
      `${API_URL}/api/movie/${movieId}`
    );

    setData(res.data);

  } catch (error) {

    alert("Movie not found");

  } finally {

    setLoading(false);

  }

};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-10">

      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-10">
          🎬 Movie Insight App
        </h1>

        {/* Search */}
        <div className="flex justify-center gap-3 mb-10">

          <input
            className="bg-gray-800 border border-gray-700 p-3 rounded w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter IMDb ID (tt0133093)"
            value={movieId}
            onChange={(e)=>setMovieId(e.target.value)}
          />

          <button
          disabled={!movieId || loading}
            onClick={fetchMovie}
            className={`bg-blue-600 cursor-pointer px-6 py-3 rounded font-semibold ${loading || !movieId ? "opacity-50 bg-gray-500 cursor-not-allowed" : ""}`}
          >
            Search
          </button>

        </div>

        {loading && (
  <div className="flex justify-center mt-10">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
)}

{!loading && data && <MovieCard data={data} />}

      </div>

    </div>
  );
}

function MovieCard({ data }: { data: any }) {

  const { movie, reviews, sentiment } = data;

  return (

    <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-6">

      <div className="flex gap-8">

        {/* Poster */}
        <img
          src={movie.Poster}
          className="w-52 rounded-lg shadow-lg"
        />

        {/* Movie Info */}
        <div>

          <h2 className="text-3xl font-bold">
            {movie.Title}
          </h2>

          <p className="text-gray-400 mt-1">
            {movie.Year}
          </p>

          <p className="mt-2 text-yellow-400">
            ⭐ {movie.imdbRating}
          </p>

          <p className="mt-4 text-gray-300 max-w-xl">
            {movie.Plot}
          </p>

        </div>

      </div>

      {/* Sentiment */}
      <div className="mt-8">

        <h3 className="text-xl font-semibold mb-2">
          Audience Sentiment
        </h3>

        <span className="bg-green-600 px-4 py-2 rounded-lg font-semibold">
          {sentiment ? sentiment[0].label : "N/A"}
        </span>

      </div>

      {/* Reviews */}
      <div className="mt-8">

        <h3 className="text-xl font-semibold mb-4">
          Top Reviews
        </h3>

        <div className="space-y-4">

          {reviews.slice(0,5).map((r:any,i:number)=>(
            <div
              key={i}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition"
            >
              {r}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}