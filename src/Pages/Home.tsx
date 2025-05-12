import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <section className="bg-neutral-50 h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl p-5">Välkommen till scenplaneraren!</h1>
      <h2 className="text-xl">
        På denna webbplats kan du lägga till uppsättningar för att planera in
        vilka scener som har och ska repas!
      </h2>
      <section className="text-neutral-50 flex gap-20 justify-center text-center m-10">
        <Link
          className="bg-lime-950 w-1/3 p-25 font-bold text-lg hover:bg-lime-900"
          to="/form"
        >
          <p>Lägg till ett nytt spex här!</p>
        </Link>
        <Link
          className="bg-lime-950 w-1/3 p-25 font-bold text-lg hover:bg-lime-900"
          to="/scenisar"
        >
          <p>Lägg till scenisar här!</p>
        </Link>
      </section>
    </section>
  );
};
