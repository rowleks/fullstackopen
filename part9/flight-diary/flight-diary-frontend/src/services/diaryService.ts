import axios from "axios";
import type { Diary, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3003/api/diaries";

const getAll = () => {
  return axios.get<Diary[]>(baseUrl).then((response) => response.data);
};

const create = (object: NewDiaryEntry): Promise<Diary> => {
  return axios.post<Diary>(baseUrl, object).then((response) => response.data);
};

export default { getAll, create };
