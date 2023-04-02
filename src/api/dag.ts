import axios from "axios";

export const getDag = async (structure: any) => {
  console.log(structure);
  structure.description = "Generated by Airflow-UI";
  const response = await axios.post("http://localhost:8080/generate-dag", {
    structure: structure,
  });
  const blob = await new Blob([response.data], { type: "text/plain" });
  const url = await window.URL.createObjectURL(new Blob([blob]));
  return url;
};
