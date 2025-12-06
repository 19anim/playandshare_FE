import { LiaUserPlusSolid } from "react-icons/lia";
import { useRef, useState } from "react";
import Participant from "./participant.component";
import AddCalculatorParticipantModal from "../Modal/addCalculatorParticipantModal.component";

const Participants = ({ data }) => {
  const MAX_PARTICIPANTS_SHOW = 3;
  const addUserRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="bg-gray-200 rounded-box p-2 lg:p-4 flex flex-col gap-2 justify-center self-start transition-all">
      <button
        onClick={() => addUserRef.current.showModal()}
        className="btn btn-success btn-sm text-xl self-start hover:scale-110 hover:animate-wiggle transition-all duration-300"
        title="Thêm người tham gia"
      >
        <LiaUserPlusSolid />
      </button>
      <ul className="list bg-base-100 rounded-box shadow-md overflow-hidden">
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
