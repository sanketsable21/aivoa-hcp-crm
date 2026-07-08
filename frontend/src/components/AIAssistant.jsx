import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatLogInteraction } from "../features/interactions/interactionSlice";

function AIAssistant() {
  const dispatch = useDispatch();
  const { loading, aiResult } = useSelector((state) => state.interactions);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    dispatch(chatLogInteraction(message));
    setMessage("");
  };

  return (
    <div className="card ai-card">
      <div className="ai-header">
        <span>🤖</span>
        <div>
          <h2>AI Assistant</h2>
          <p>Log interaction via chat</p>
        </div>
      </div>

      <div className="chat-box">
        <div className="bot-msg">
          Log interaction details here. Example: "Met Dr. Smith, discussed Product X efficacy, positive sentiment, shared brochure."
        </div>

        {aiResult && (
          <div className="ai-result">
            <strong>AI Extracted:</strong>
            <p>HCP: {aiResult.interaction?.hcp_name}</p>
            <p>Organization: {aiResult.interaction?.organization}</p>
            <p>Sentiment: {aiResult.interaction?.hcp_sentiment}</p>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe interaction..."
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "..." : "Log"}
        </button>
      </div>
    </div>
  );
}

export default AIAssistant;