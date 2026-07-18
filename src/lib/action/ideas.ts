import { Idea } from "@/types/idea";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createIdea = async (idea: Idea) => {
  const res = await fetch(`${API_URL}/api/ideas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(idea),
  });

  return res.json();
};

export const deleteIdea = async (id: string) => {
  const res = await fetch(`${API_URL}/api/ideas/${id}`, {
    method: "DELETE",
  });

  return res.json();
};