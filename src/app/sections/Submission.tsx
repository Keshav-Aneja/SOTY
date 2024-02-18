"use client";
import React, { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import axios from "axios";
import Cookies from "js-cookie";
interface Props {
  question: string;
  points: number;
  difficultyLevel: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}

export default function Submission({
  question,
  points,
  setMenu,
  difficultyLevel,
}: Props) {
  const submitRiddle = async () => {
    try {
      const token = Cookies.get("jwtToken");
      const id = localStorage.getItem("teamId");
      const data = {
        question,
        answer,
        points,
        difficultyLevel,
      };
      const response = await axios.post(
        `https://mfc-hunt-soty-be.vercel.app/questions/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ` + `${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const [answer, setAnswer] = useState("");

  return (
    <div className="w-full h-fit flex justify-center items-center py-12">
      <div className="--riddle-container w-[80%] h-full flex flex-col justify-start items-center gap-12">
        <PrimaryButton>SCAN</PrimaryButton>
        <textarea
          name="riddleAnswer"
          className="submission-box w-[80%] min-h-[70vh] rounded-2xl bg-[rgba(255,255,255,0.3)] p-6 border-2 border-white outline-none text-xl"
          placeholder="Write your answer here..."
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
        <div className="btns flex justify-between w-[80%]">
          <PrimaryButton
            onClickHandler={() => {
              setMenu("home");
            }}
          >
            BACK
          </PrimaryButton>
          <SecondaryButton onClickHandler={submitRiddle}>
            SUBMIT
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
