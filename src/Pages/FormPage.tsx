import { useNavigate } from "react-router-dom";
import { ProductionForm } from "../components/ProductionForm";
import { Play } from "../interfaces";
import { postPGPlay } from "../services/api";

export const FormPage = () => {
  const navigate = useNavigate();

  async function handleProductionSubmit(data: {
    title: string;
    semester: string;
  }) {
    try {
      const newPlay: Play = await postPGPlay(data);
      console.log("Play skapad:", newPlay);
      navigate(`/allProductions`);
    } catch (error) {
      console.error("Något gick fel:", error);
    }
  }

  return (
    <section className="bg-neutral-50 p-20 h-full">
      <ProductionForm onSubmit={handleProductionSubmit} />
    </section>
  );
};
