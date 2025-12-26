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
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
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
          <div className="space-y-4 bg-base-100 dark:bg-[#00000033] p-6 rounded-lg border border-base-300 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-base-900 dark:text-base-50">Lịch trình</h2>
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className="p-4 border border-base-300 dark:border-gray-700 rounded-lg bg-stone-50 dark:bg-base-100  shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2 text-base-900 dark:text-base-50">
                  {task.name}
                </h3>
                <p className="text-base-700 mb-1">
                  Từ: {new Date(task.fromDate).toLocaleDateString()} {task.startTime}
                </p>
                <p className="text-base-700 mb-1">
                  Đến: {new Date(task.toDate).toLocaleDateString()} {task.endTime}
                </p>
                <p className="text-base-700">{task.description}</p>
              </div>
            ))}
          </div>
        )}
      </SortableContext>
    </DndContext>
  );
};

export default ScheduleTasks;
