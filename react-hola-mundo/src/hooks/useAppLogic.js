
import { useState, useEffect } from "react";
// import { uuidv7 } from "uuidv7";
import { createTaskToAPI, deleteTaskFromAPI, getTasksFromAPI, updateTaskFromAPI } from "../service";
import useToogle from "./useToggle";

function useAppLogic() {
  // Input
  const [taskName, setTaskName] = useState("");
  // Lista de tareas
  const [tasks, setTasks] = useState([]);

  // Tarea seleccionada
  const [currentTask, setCurrentTask] = useState(null);

  // Vamos a usar nuestro hook
  const { isOpen: isOpenDelete, handleIsOpen: handleIsOpenDelete } =
    useToogle();
  // Para poder usar el hook mas de 1 vez a los nombres originales
  // los cambiamos por alias
  const { isOpen: isOpenUpdate, handleIsOpen: handleIsOpenUpdate } =
    useToogle();
  
      /**
   function handleInput(event) {
    // console.log(event.target.value);
    setTaskName(event.target.value);
  }
   */
  const handleInput = (event) => {
    setTaskName(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    // evitar que se recargue la pagina
    event.preventDefault();
    // setTasks([
    //   ...tasks,
    //   {
    //     id: uuidv7(),
    //     text: taskName,
    //     status: 1, // 1: Creado
    //     createdAt: new Date().toLocaleDateString(
    //         "es-ES",
    //         {
    //           weekday: "long",
    //           year: "numeric",
    //           month: "long",
    //           day: "numeric",
    //         }
    //     ),
    //   },
    // ]);
    // setTaskName("");
    const newTask = {
      // id: uuidv7(),
      text: taskName,
      status: 1, // 1: Creado
    };
    await createTaskToAPI(newTask);
    setTaskName("");
    await getTasks();
  };

  const handleModalDelete = (task) => {
    // crear un arreglo excluyendo la id (parametro)
    // const filteredTask = tasks.filter((task) => task.id !== id);
    // setTasks(filteredTask);
    // await deleteTaskFromAPI(id);
    // await getTasks();
    // setIsOpen(true);
    handleIsOpenDelete();
    setCurrentTask(task);
  };


  const handleDelete = async () => {
    // Eliminar
    await deleteTaskFromAPI(currentTask?.id);
    // Cerremos el modal
    // setIsOpen(false);
    handleIsOpenDelete();
    // Obtener la lista actualizada
    await getTasks();
  };


    const handleModalUpdate = (task) => {
    handleIsOpenUpdate();
    setCurrentTask(task);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    // event.target = form
    const form = new FormData(event.target);

    await updateTaskFromAPI(form.get("id"), {
      text: form.get("text"),
      status: Number(form.get("status")),
    });

    handleIsOpenUpdate();

    await getTasks();
  };


const getTasks = async () => {
    // const url = "https://6932247211a8738467d19c48.mockapi.io/tasks"
    // const response = await fetch(url);
    // const data = await response.json();
    // setTasks(data);
    const data = await getTasksFromAPI();
    setTasks(data);
}

useEffect(() => {
  getTasks();
}, []);

return {
    isOpenDelete,
    isOpenUpdate,
    tasks,
    currentTask,
    taskName,
    handleDelete,
    handleFormSubmit,
    handleInput,
    handleIsOpenDelete,
    handleIsOpenUpdate,
    handleModalDelete,
    handleModalUpdate,
    handleUpdateSubmit,
}
}

export default useAppLogic;