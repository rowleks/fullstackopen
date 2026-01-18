import axios from "axios";
import { Diagnoses } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnoses[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Diagnoses>(`${apiBaseUrl}/diagnoses/${id}`);
  return data;
};

export default {
  getAll,
  getById,
};
