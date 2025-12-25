import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableTask = ({ task, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: isDragging ? "relative" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className={`mb-2 ${isDragging ? "opacity-50" : ""}`}>
      <div
        className="collapse bg-base-200 dark:bg-stone-700 border border-base-300 dark:border-stone-600"
        {...attributes}
        {...listeners}
      >
        <input type="checkbox" />
        <div className="collapse-title font-semibold flex items-center gap-2">
          <i className="fa-solid fa-grip-vertical cursor-grab active:cursor-grabbing"></i>
          {task.name}
        </div>
        <div className="collapse-content text-sm">
          <p>
            Từ: {new Date(task.fromDate).toLocaleDateString()} - Đến:{" "}
            {new Date(task.toDate).toLocaleDateString()}
          </p>
          <p>
            Giờ: {task.startTime} - {task.endTime}
          </p>
          <p>{task.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SortableTask;
