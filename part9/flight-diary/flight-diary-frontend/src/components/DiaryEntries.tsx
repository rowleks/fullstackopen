import type { Diary } from "../types";

const DiaryEntry = ({ diary }: { diary: Diary }) => {
  return (
    <>
      <div className="space-y-2 p-2">
        <h3>{diary.date}</h3>
        <div>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
        </div>
      </div>
    </>
  );
};

const DiaryEntries = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <section>
      <h2>Diary Entries</h2>
      <div className="my-3 space-y-4 divide-y divide-gray-400">
        {diaries
          .slice()
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((diary) => (
            <DiaryEntry diary={diary} key={diary.id} />
          ))}
      </div>
    </section>
  );
};

export default DiaryEntries;
