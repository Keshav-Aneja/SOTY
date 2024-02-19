import React, { useState, useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import axios from "axios";
interface LeaderboardData {
  username: string;
  score: number;
}
const showPerPage = 20;
const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [page, setPage] = useState<number>(0);
  const handleNextPage = () => {
    if (page + 1 < leaderboardData.length / showPerPage) setPage(page + 1);
  };
  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://mfc-hunt-soty-be.vercel.app/users/allusers"
      );
      setLeaderboardData(response.data);
    })();
  }, []);
  return (
    <div className="w-full h-fit flex justify-center items-center py-12">
      <div className="--leaderboard-container w-[80%] h-full flex flex-col justify-start items-center gap-12">
        <PrimaryButton>Leaderboard</PrimaryButton>
        <div
          className="--leaderboard-table-wrapper w-full rounded-2xl border-2 border-white overflow-hidden backdrop-blur-lg py-4"
          style={{
            background: "linear-gradient(to bottom, #401E1C , rgba(0,0,0,0))",
          }}
        >
          <table className="w-full my-8">
            <thead className="text-2xl underline-offset-4 underline font-medium">
              <th>Rank</th>
              <th>Team Name</th>
              <th>Score</th>
            </thead>
            <br />
            {leaderboardData &&
              leaderboardData.map((data: LeaderboardData, i) => (
                <>
                  {i < showPerPage * (page + 1) && i >= showPerPage * page && (
                    <tr
                      className="--leaderboard-menu-item h-16 text-center text-4xl font-semibold border-b-[1px] border-white"
                      key={i}
                    >
                      <td className="">{i + 1}</td>
                      <td>{data?.username}</td>
                      <td>{data?.score}</td>
                    </tr>
                  )}
                </>
              ))}
          </table>
          <div className="buttons flex justify-between items-center px-6">
            <SecondaryButton onClickHandler={handlePrevPage}>
              &larr; Prev
            </SecondaryButton>
            <p className="text-xl text-white font-semibold">Page: {page + 1}</p>
            <SecondaryButton onClickHandler={handleNextPage}>
              Next &rarr;
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;