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

const ScheduleTasks = ({ tasks, handleSetTasks }) => {
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
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} handleSetTasks={handleSetTasks} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ScheduleTasks;
