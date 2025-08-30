import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import InputComponent from "../Input/input.component";
import { useState } from "react";

const Task = ({ task, index, handleSetTasks }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    touchAction: "none",
    WebkitUserSelect: "none",
    userSelect: "none",
    opacity: isDragging ? 0.5 : 1,
  };
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };
  const [tempTask, setTempTask] = useState(task);

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTempTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskSave = () => {
    handleSetTasks((prev) => {
      const updatedTasks = [...prev.tasks];
      updatedTasks[index] = tempTask;
      return { ...prev, tasks: updatedTasks };
    });
    toggleEditMode();
  };

  const handleTaskCancel = () => {
    setTempTask(task);
    toggleEditMode();
  };

  const handleRemoveTask = () => {
    handleSetTasks((prev) => {
      const updatedTasks = prev.tasks.filter((_, i) => i !== index);
      return { ...prev, tasks: updatedTasks };
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-[#e5d5bf] border-base-300 border px-4 py-2 rounded-lg shadow-md touch-manipulation"
      onTouchStart={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
    >
      {!isEditMode ? (
        <>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline btn-primary transition-all duration-300 group"
              onClick={toggleEditMode}
            >
              <i className="fa-solid fa-pen text-sm group-hover:rotate-45 transition-transform duration-300"></i>
            </button>

            <button type="button" className="btn btn-error btn-sm" onClick={handleRemoveTask}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="font-semibold text-lg">{task.name}</div>
          </div>
          <p>
            Từ: {new Date(task.fromDate).toLocaleDateString()} - Đến:{" "}
            {new Date(task.toDate).toLocaleDateString()}
          </p>
          <p>
            Giờ: {task.startTime} - {task.endTime}
          </p>
          <p>{task.description}</p>
        </>
      ) : (
        <>
          <div className="flex justify-end mb-2 gap-2">
            <button type="button" className="btn btn-success btn-sm" onClick={handleTaskSave}>
              <i className="fa-solid fa-check"></i>
            </button>
            <button type="button" className="btn btn-error btn-sm" onClick={handleTaskCancel}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <InputComponent
            index={index}
            label="Tên lịch trình"
            inputName="name"
            inputType="text"
            value={tempTask.name}
            onChangeHandler={(e) => handleTaskChange(e, index)}
            placeholder="Tên lịch trình"
          />
          <InputComponent
            index={index}
            label="Từ ngày"
            inputName="fromDate"
            inputType="date"
            value={tempTask.fromDate}
            onChangeHandler={(e) => handleTaskChange(e, index)}
            placeholder="Chọn ngày đi"
          />
          <InputComponent
            index={index}
            label="Đến ngày"
            inputName="fromDate"
            inputType="date"
            value={tempTask.toDate}
            onChangeHandler={(e) => handleTaskChange(e, index)}
            placeholder="Chọn ngày về"
          />

          <InputComponent
            index={index}
            label="Giờ đi"
            inputName="startTime"
            inputType="time"
            value={tempTask.startTime}
            onChangeHandler={(e) => handleTaskChange(e, index)}
            placeholder="Chọn giờ đi"
          />
          <InputComponent
            index={index}
            label="Giờ về"
            inputName="endTime"
            inputType="time"
            value={tempTask.endTime}
            onChangeHandler={(e) => handleTaskChange(e, index)}
            placeholder="Chọn giờ về"
          />
          <InputComponent
            index={index}
            label="Mô tả chi tiết"
            inputName="description"
            inputType="text"
            value={tempTask.description}
            onChangeHandler={(e) => handleTaskChange(e, index)}
            placeholder="Mô tả chi tiết"
          />
        </>
      )}
    </div>
  );
};

export default Task;
