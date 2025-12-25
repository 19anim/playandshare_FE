import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Temp = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-base-200 dark:bg-stone-700 border border-base-300 dark:border-stone-600 px-2 py-4 rounded-lg shadow-md touch-manipulation"
      onTouchStart={(e) => {
        // Prevent scrolling while dragging on mobile
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
    >
      <div className="font-semibold">{item.name}</div>
      <p>
        Từ: {new Date(item.fromDate).toLocaleDateString()} - Đến:{" "}
        {new Date(item.toDate).toLocaleDateString()}
      </p>
      <p>
        Giờ: {item.startTime} - {item.endTime}
      </p>
      <p>{item.description}</p>
    </div>
  );
};

export default Temp;
