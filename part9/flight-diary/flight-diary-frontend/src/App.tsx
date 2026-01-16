import { useEffect, useState } from "react";
import type { Diary } from "./types";
import diaryService from "./services/diaryService";
import AddDiaryForm from "./components/AddDiaryForm";
import DiaryEntries from "./components/DiaryEntries";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    diaryService.getAll().then((data) => setDiaries(data));
  }, []);
  return (
    <main className="space-y-6">
      <h1>Flight Diary App</h1>
      <AddDiaryForm setDiaries={setDiaries} />
      <DiaryEntries diaries={diaries} />
    </main>
  );
};

export default App;
