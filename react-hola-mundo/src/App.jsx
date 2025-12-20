import Modal from "./components/Modal";
import { CheckCircle, CheckCheck, Calendar, PencilIcon, Trash, TriangleAlert } from "lucide-react";
import useAppLogic from "./hooks/useAppLogic";

function App() {
  // variables
  const {
    tasks,
    currentTask,
    isOpenDelete,
    isOpenUpdate,
    taskName,
    handleDelete,
    handleFormSubmit,
    handleInput,
    handleIsOpenDelete,
    handleIsOpenUpdate,
    handleModalDelete,
    handleModalUpdate,
    handleUpdateSubmit,
  } = useAppLogic();




  return (
    <div className="h-screen bg-gray-100 px-6 py-8 space-y-10">
      <h1 className="text-center text-3xl font-bold">TodoList</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="bg-white p-5 rounded-lg flex">
          <input
            type="text"
            placeholder="Nombre de la tarea"
            value={taskName}
            onChange={handleInput}
            className="border border-gray-400 px-3 py-2 rounded-l flex-1 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-900 cursor-pointer text-white p-3 rounded-r border border-gray-950"
          >
            <CheckCircle />
          </button>
        </div>
      </form>
      <div className="space-y-5">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white px-3 py-3 space-y-2 rounded-md flex justify-between"
          >
            <div>
                <span className="text-xs italic flex items-center gap-2">
                <Calendar size={12} /> {task.createdAt}
                </span>
                <p className="font-semibold capitalize text-lg">{task.text}</p>
            </div>
            <div className="flex justify-end gap-1 mt-3">
              <button
                onClick={() => handleModalUpdate(task)}
                className="border border-gray-300 hover:border-sky-500 cursor-pointer rounded-md px-2 py-1"
              >
                <PencilIcon color="skyblue" size={16} />
              </button>
              <button className="border border-gray-300 hover:border-green-500 cursor-pointer rounded-md px-2 py-1">
                <CheckCheck color="green" size={16} />
              </button>
              <button 
              onClick={() => handleModalDelete(task)}
              className="border border-gray-300 hover:border-red-500 cursor-pointer rounded-md px-2 py-1">
                <Trash color="red" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title="Eliminar Tarea"
        open={isOpenDelete}
        onClose={handleIsOpenDelete}
        onConfirm={handleDelete}
      >
        {/* dentro de la etiqueta modal = children */}
        <div className="flex gap-2">
          <TriangleAlert className="text-yellow-600" />
          <p>
            Esta seguro de eliminar esta tarea{" "}
            <strong>{currentTask?.text}</strong>?, es una{" "}
            <strong className="text-red-500">acción irreversible</strong>
          </p>
        </div>
      </Modal>
      <Modal
        title="Actualizar tarea"
        open={isOpenUpdate}
        onClose={handleIsOpenUpdate}
        showFooter={false}
      >
        <form className="space-y-5" onSubmit={handleUpdateSubmit}>
          <input type="hidden" name="id" defaultValue={currentTask?.id} />
          <div>
            <input
              key={currentTask?.id  }
              type="text"
              placeholder="Nombre de la tarea"
              defaultValue={currentTask?.text}
              name="text"
              className="w-full border border-gray-400 px-3 py-2 rounded flex-1 outline-none"
            >
            </input>
          </div>
          <div>
            <select
              name="status"
              className="w-full border border-gray-400 px-3 py-2 rounded flex-1 outline-none"
            >
              <option disabled>Selecciona un estado</option>
              <option value="1">Creado</option>
              <option value="2">Bloqueado</option>
              <option value="3">Finalizado</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-gray-950 cursor-pointer text-white py-2 px-3 w-full rounded border border-gray-950"
            >
              Actualizar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
export default App;