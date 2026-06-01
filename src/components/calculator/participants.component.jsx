import { LiaUserPlusSolid } from "react-icons/lia";
import { useRef, useState } from "react";
import Participant from "./participant.component";
import AddCalculatorParticipantModal from "../Modal/addCalculatorParticipantModal.component";

const Participants = ({ data }) => {
  const MAX_PARTICIPANTS_SHOW = 3;
  const addUserRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="flex flex-col gap-3 self-start rounded-box bg-base-200 p-3 lg:p-4">
      <button
        onClick={() => addUserRef.current.showModal()}
        className="btn btn-primary btn-sm rounded-full self-start"
        title="Thêm người tham gia"
      >
        <LiaUserPlusSolid />
      </button>
      <ul className="list overflow-hidden rounded-box border border-base-300 bg-base-100">
        {data &&
          data.map((participant, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ease-in-out ${
                !showAll && index >= MAX_PARTICIPANTS_SHOW
                  ? "max-h-0 opacity-0 scale-95"
                  : "max-h-[500px] opacity-100 scale-100"
              }`}
            >
              <Participant
                name={participant.name}
                balance={participant.balance}
                paid={participant.paid}
                currency={participant.currency}
                id={participant._id}
              />
            </div>
          ))}
      </ul>
      {data.length > MAX_PARTICIPANTS_SHOW && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="btn transition-transform duration-300 hover:scale-105"
        >
          {showAll ? "Thu gọn" : `Xem tất cả (${data.length})`}
        </button>
      )}
      <AddCalculatorParticipantModal ref={addUserRef} />
    </section>
  );
};

export default Participants;
