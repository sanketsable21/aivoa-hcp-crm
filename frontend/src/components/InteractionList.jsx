import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInteractions } from "../features/interactions/interactionSlice";

function InteractionList() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.interactions);

  useEffect(() => {
    dispatch(fetchInteractions());
  }, [dispatch]);

  return (
    <div className="history-card">
      <h2>Recent Logged Interactions</h2>

      {items.length === 0 ? (
        <p>No interactions logged yet.</p>
      ) : (
        <div className="history-list">
          {items.map((item) => (
            <div className="history-item" key={item.id}>
              <h3>{item.hcp_name || "Unknown HCP"}</h3>
              <p>{item.organization}</p>
              <p>{item.topics_discussed}</p>
              <span>{item.hcp_sentiment}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InteractionList;