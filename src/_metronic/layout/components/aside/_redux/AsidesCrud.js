import axios from "axios";

export const AsideS_URL = "api/Asides";

// CREATE =>  POST: add a new Aside to the server
export function createAside(Aside) {

  return axios.post(AsideS_URL, { Aside });
}

// READ
export function getAllAsides() {
  
  return axios.get(AsideS_URL);
}

export function getAsideById(AsideId) {
  return axios.get(`${AsideS_URL}/${AsideId}`);
}

// Method from server should return QueryAsidesModel(items: any[], totalsCount: number)
// items => filtered/sorted Aside
export function findAsides(queryParams) {

  return axios.post(`${AsideS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the Aside on the server
export function updateAside(Aside) {
  return axios.put(`${AsideS_URL}/${Aside.id}`, { Aside });
}

// UPDATE Status
export function updateStatusForAsides(ids, status) {
  return axios.post(`${AsideS_URL}/updateStatusForAsides`, {
    ids,
    status
  });
}

// DELETE => delete the Aside from the server
export function deleteAside(AsideId) {
  return axios.delete(`${AsideS_URL}/${AsideId}`);
}

// DELETE Asides by ids
export function deleteAsides(ids) {
  return axios.post(`${AsideS_URL}/deleteAsides`, { ids });
}
