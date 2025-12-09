import axios from "axios";

const BASEURL = "api/persons";

const getAll = () => {
  const req = axios.get(BASEURL);
  return req.then((res) => res.data);
};

const create = (newObject) => {
  const req = axios.post(BASEURL, newObject);
  return req.then((res) => res.data);
};

const deleteById = (id, deletedObject) => {
  const req = axios.delete(`${BASEURL}/${id}`, deletedObject);
  return req.then((res) => res.data);
};

const updateById = (id, updatedObject) => {
  const req = axios.put(`${BASEURL}/${id}`, updatedObject);
  return req.then((res) => res.data);
};

export default { getAll, create, deleteById, updateById };
