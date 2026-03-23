import { useEffect, useState } from "react";

function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [generacion, setGeneracion] = useState("");
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState("");

  const API_URL = "http://localhost:3001/api/pokemon";

  const fetchPokemons = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        setPokemons(data);
      } else {
        console.error("Error backend:", data);
        setPokemons([]);
      }
    } catch (error) {
      console.error("Error al obtener pokemons:", error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const clearForm = () => {
    setEditId(null);
    setNombre("");
    setEspecie("");
    setAltura("");
    setPeso("");
    setDescripcion("");
    setGeneracion("");
  };

  const savePokemon = async () => {
    if (!nombre || !especie) {
      setAlert("Nombre y especie son obligatorios");
      return;
    }

    const payload = { nombre, especie, altura, peso, descripcion, generacion };

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      fetchPokemons();
      clearForm();
      setAlert(editId ? "Actualizado" : "Agregado");
    } catch (error) {
      console.error("Error guardando:", error);
    }
  };

  const deletePokemon = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchPokemons();
      setAlert("Eliminado");
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

  const editPokemon = (p) => {
    setEditId(p.num_pokedex);
    setNombre(p.nombre);
    setEspecie(p.especie);
    setAltura(p.altura);
    setPeso(p.peso);
    setDescripcion(p.descripcion);
    setGeneracion(p.generacion);
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage: "url(/fondo4.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-6xl mx-auto p-6 bg-white/80 backdrop-blur rounded-2xl shadow-2xl border border-slate-200">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-700">
              {editId ? "Editar Pokémon" : "Pokedex Manager"}
            </h1>
            <p className="text-sm text-slate-600">
              Administra todos los pokemons
            </p>
          </div>
          <button
            onClick={clearForm}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Nuevo
          </button>
        </div>

        {/* ALERT */}
        {alert && (
          <div className="mb-4 px-3 py-2 bg-amber-100 text-amber-900 rounded">
            {alert}
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">

          {/* FORMULARIO */}
          <div className="p-4 bg-slate-50 rounded-xl border">
            <h2 className="text-lg font-semibold mb-2">Formulario</h2>

            <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" className="w-full mb-2 border p-2 rounded"/>
            <input value={especie} onChange={e => setEspecie(e.target.value)} placeholder="Especie" className="w-full mb-2 border p-2 rounded"/>

            <div className="flex gap-2 mb-2">
              <input value={altura} onChange={e => setAltura(e.target.value)} placeholder="Altura" className="w-full border p-2 rounded"/>
              <input value={peso} onChange={e => setPeso(e.target.value)} placeholder="Peso" className="w-full border p-2 rounded"/>
            </div>

            <input value={generacion} onChange={e => setGeneracion(e.target.value)} placeholder="Generación" className="w-full mb-2 border p-2 rounded"/>

            <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción" className="w-full mb-2 border p-2 rounded"/>

            <div className="flex gap-2">
              <button onClick={savePokemon} className="w-full bg-indigo-600 text-white p-2 rounded">
                {editId ? "Actualizar" : "Guardar"}
              </button>
              <button onClick={clearForm} className="w-full bg-gray-300 p-2 rounded">
                Limpiar
              </button>
            </div>
          </div>

          {/* TABLA */}
          <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Especie</th>
                  <th>Altura</th>
                  <th>Peso</th>
                  <th>Gen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pokemons.length === 0 ? (
                  <tr>
                    <td colSpan="7">No hay pokemons</td>
                  </tr>
                ) : (
                  pokemons.map(p => (
                    <tr key={p.num_pokedex}>
                      <td>{p.num_pokedex}</td>
                      <td>{p.nombre}</td>
                      <td>{p.especie}</td>
                      <td>{p.altura}</td>
                      <td>{p.peso}</td>
                      <td>{p.generacion}</td>
                      <td>
                        <button onClick={() => editPokemon(p)}>Editar</button>
                        <button onClick={() => deletePokemon(p.num_pokedex)}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Pokemons;