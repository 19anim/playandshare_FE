import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo } from "react";
import Task from "./task.component";

const ScheduleTasks = ({ tasks, handleSetTasks = null, isEditMode }) => {
  const ids = useMemo(() => tasks.map((i) => i.id), [tasks]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = ids.indexOf(active.id);
    const newIndex = ids.indexOf(over.id);

    handleSetTasks((prev) => ({ ...prev, tasks: arrayMove(prev.tasks, oldIndex, newIndex) }));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleSetTasks && handleDragEnd}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        {isEditMode ? (
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} handleSetTasks={handleSetTasks} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className="p-4 border border-gray-300 rounded-lg bg-[#e5d5bf] shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2">{task.name}</h3>
                <p className="text-gray-600 mb-1">
                  Từ: {new Date(task.fromDate).toLocaleDateString()} {task.startTime}
                </p>
                <p className="text-gray-600 mb-1">
                  Đến: {new Date(task.toDate).toLocaleDateString()} {task.endTime}
                </p>
                <p className="text-gray-700">{task.description}</p>
              </div>
            ))}
          </div>
        )}
      </SortableContext>
    </DndContext>
  );
};

export default ScheduleTasks;
