const API_BASE = process.env.REACT_APP_API_URL || "";

export async function apiGet(path: string) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}


// import { apiGet } from "./api";

// const data = await apiGet("/api/health");
// console.log(data);
