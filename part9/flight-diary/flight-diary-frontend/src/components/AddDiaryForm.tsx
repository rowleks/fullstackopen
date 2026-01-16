import { useEffect, useState } from "react";
import type { Diary, NewDiaryEntry } from "../types";
import diaryService from "../services/diaryService";
import { AxiosError } from "axios";

type AddDiaryFormProps = {
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
};

const AddDiaryForm = ({ setDiaries }: AddDiaryFormProps) => {
  const [notification, setNotification] = useState<string | null>(null);

  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    diaryService
      .create({ date, visibility, weather, comment } as NewDiaryEntry)
      .then((data) => {
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
        setNotification(`Successfully added diary entry`);
        setDiaries((prevDiaries) => prevDiaries.concat(data));
      })
      .catch((error) => {
        console.log(error);

        if (error instanceof AxiosError) {
          setNotification(error.response?.data || "Error occurred");
        } else {
          setNotification("Unknown error occurred");
        }
      });
  };
  return (
    <>
      <h2>Add New Diary Entry</h2>

      {notification && (
        <p
          className={
            notification.toLocaleLowerCase().includes("error")
              ? "text-red-500"
              : "text-green-500"
          }
        >
          {notification}
        </p>
      )}
      <form onSubmit={handleSubmit} className="grid gap-2">
        <div>
          <label htmlFor="date" className="cursor-pointer">
            <span>Date: </span>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <span>Visibility: </span>
          {["great", "good", "ok", "poor"].map((v) => (
            <label key={v} className="ml-3">
              <input
                className="mr-1.5"
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={(e) => setVisibility(e.target.value)}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          <span>Weather: </span>
          {["sunny", "rainy", "cloudy", "stormy", "windy"].map((w) => (
            <label key={w} className="ml-2">
              <input
                className="mr-1.5"
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={(e) => setWeather(e.target.value)}
              />
              {w}
            </label>
          ))}
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="comment">Comment: </label>
          <textarea
            id="comment"
            rows={6}
            cols={12}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="resize-none"
          ></textarea>
        </div>
        <button type="submit">Add Entry</button>
      </form>
    </>
  );
};

export default AddDiaryForm;
