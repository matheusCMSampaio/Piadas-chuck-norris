import React, { useEffect, useState } from "react";

function ChuckNorrisJoke() {
  const [joke, setJoke] = useState("");
  const [curtida, setcurtida] = useState([]);
  const [visivel, setvisivel] = useState(false);

  const fetchJoke = () => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then((data) => {
        setJoke(data.value);
      })
      .catch((error) => {
        console.error("Erro ao buscar a piada:", error);
      });
  };
  const apagarDoFavoritos = (index) => {
    const piadasAtualizadas = [...curtida];
    piadasAtualizadas.splice(index, 1); // Remove a piada do índice especificado
    setcurtida(piadasAtualizadas);
  };

  const handleLike = () => {
    if (joke && !curtida.includes(joke)) {
      const newcurtida = [...curtida, joke];
      setcurtida(newcurtida);
    } else if (curtida.includes(joke)) {
      const updatedcurtida = curtida.filter((likedJ) => likedJ !== joke);
      setcurtida(updatedcurtida);
    }
  };

  const toggleLikedView = () => {
    setvisivel(!visivel);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Piada do Chuck Norris</h1>
        {joke ? (
          <p className="text-lg mb-4">{joke}</p>
        ) : (
          <p className="text-lg">Carregando...</p>
        )}
        <button
          onClick={handleLike}
          className={`${
            curtida.includes(joke)
              ? "bg-gray-300 text-gray-700"
              : "bg-blue-500 text-white"
          } rounded-full px-4 py-2 mt-4 hover:bg-gray-400`}
        >
          {curtida.includes(joke) ? "Curtida" : "Curtir"}
        </button>
        <button
          onClick={fetchJoke}
          className="bg-gray-300 text-gray-700 rounded-full px-4 py-2 mt-4 hover:bg-gray-400"
        >
          Atualizar
        </button>
        <button
          onClick={toggleLikedView}
          className="bg-blue-500 text-white rounded-full px-4 py-2 mt-4 hover:bg-blue-700"
        >
          {visivel ? "Fechar Curtidas" : "Ver Curtidas"}
        </button>
      </div>
      {visivel && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Piadas Curtidas</h2>
          <ul>
            {curtida.map((likedJoke, index) => (
              <li key={index} className="text-gray-700">
                {likedJoke}
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => apagarDoFavoritos(index)}
                >
                  Apagar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ChuckNorrisJoke;
