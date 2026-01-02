export const getData = (key: string) => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const saveData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};
