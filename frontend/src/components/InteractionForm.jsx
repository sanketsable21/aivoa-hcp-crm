import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createInteraction } from "../features/interactions/interactionSlice";
import { FiMic, FiSearch, FiPackage } from "react-icons/fi";

const initialState = {
    hcp_name: "",
    specialty: "",
    organization: "",
    interaction_type: "Meeting",
    interaction_date: "",
    interaction_time: "",
    attendees: "",
    topics_discussed: "",
    materials_shared: "",
    samples_distributed: "",
    hcp_sentiment: "Neutral",
    outcomes: "",
    follow_up_actions: "",
};

function InteractionForm() {
    const dispatch = useDispatch();

    const aiFormData = useSelector(
        (state) => state.interactions.aiFormData
    );
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        if (!aiFormData) return;

        setForm((prev) => ({
            ...prev,
            hcp_name: aiFormData.hcp_name || "",
            specialty: aiFormData.specialty || "",
            organization: aiFormData.organization || "",
            interaction_type: aiFormData.interaction_type || "Meeting",
            interaction_date: aiFormData.interaction_date || "",
            interaction_time: aiFormData.interaction_time || "",
            attendees: aiFormData.attendees || "",
            topics_discussed: aiFormData.topics_discussed || "",
            materials_shared: aiFormData.materials_shared || "",
            samples_distributed: aiFormData.samples_distributed || "",
            hcp_sentiment: aiFormData.hcp_sentiment || "Neutral",
            outcomes: aiFormData.outcomes || "",
            follow_up_actions: aiFormData.follow_up_actions || "",
        }));
    }, [aiFormData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createInteraction(form));
        setForm(initialState);
    };

    return (
        <form className="card form-card" onSubmit={handleSubmit}>
            <h2>Interaction Details</h2>

            <div className="grid-2">
                <div className="field">
                    <label>HCP Name</label>
                    <input
                        name="hcp_name"
                        value={form.hcp_name}
                        onChange={handleChange}
                        placeholder="Search or select HCP..."
                        required
                    />
                </div>

                <div className="field">
                    <label>Interaction Type</label>
                    <select
                        name="interaction_type"
                        value={form.interaction_type}
                        onChange={handleChange}
                    >
                        <option>Meeting</option>
                        <option>Call</option>
                        <option>Email</option>
                        <option>Conference</option>
                        <option>Field Visit</option>
                    </select>
                </div>

                <div className="field">
                    <label>Date</label>
                    <input
                        type="date"
                        name="interaction_date"
                        value={form.interaction_date}
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label>Time</label>
                    <input
                        type="time"
                        name="interaction_time"
                        value={form.interaction_time}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="field">
                <label>Specialty</label>
                <input
                    name="specialty"
                    value={form.specialty}
                    onChange={handleChange}
                    placeholder="Cardiology, Oncology, Dermatology..."
                />
            </div>

            <div className="field">
                <label>Organization</label>
                <input
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    placeholder="Hospital / Clinic name..."
                />
            </div>

            <div className="field">
                <label>Attendees</label>
                <input
                    name="attendees"
                    value={form.attendees}
                    onChange={handleChange}
                    placeholder="Enter names or search..."
                />
            </div>

            <div className="field">
                <label>Topics Discussed</label>
                <textarea
                    name="topics_discussed"
                    value={form.topics_discussed}
                    onChange={handleChange}
                    placeholder="Enter key discussion points..."
                />
            </div>

            <button type="button" className="voice-btn">
                <FiMic style={{ marginRight: "6px", verticalAlign: "middle" }} />
                Summarize from Voice Note (Requires Consent)
            </button>

            <div className="section-title">Materials Shared / Samples Distributed</div>

            <div className="mini-box">
                <div>
                    <strong>Materials Shared</strong>
                    <p>{form.materials_shared || "No material added."}</p>
                </div>

                <button
                    type="button"
                    className="small-action-btn"
                    onClick={() =>
                        setForm({
                            ...form,
                            materials_shared: "Product Brochure, Clinical Study PDF",
                        })
                    }
                >
                    <FiSearch style={{ marginRight: "5px" }} />
                    Search/Add
                </button>
            </div>

            <div className="mini-box">
                <div>
                    <strong>Samples Distributed</strong>
                    <p>{form.samples_distributed || "No samples added."}</p>
                </div>

                <button
                    type="button"
                    className="small-action-btn"
                    onClick={() =>
                        setForm({
                            ...form,
                            samples_distributed: "2 Sample Packs",
                        })
                    }
                >
                    <FiPackage style={{ marginRight: "5px" }} />
                    Add Sample
                </button>
            </div>

            <div className="field">
                <label>Observed / Inferred HCP Sentiment</label>

                <div className="radio-row">
                    {["Positive", "Neutral", "Negative"].map((item) => (
                        <label key={item}>
                            <input
                                type="radio"
                                name="hcp_sentiment"
                                value={item}
                                checked={form.hcp_sentiment === item}
                                onChange={handleChange}
                            />
                            {item}
                        </label>
                    ))}
                </div>
            </div>

            <div className="field">
                <label>Outcomes</label>
                <textarea
                    name="outcomes"
                    value={form.outcomes}
                    onChange={handleChange}
                    placeholder="Key outcomes or agreements..."
                />
            </div>

            <div className="field">
                <label>Follow-up Actions</label>
                <textarea
                    name="follow_up_actions"
                    value={form.follow_up_actions}
                    onChange={handleChange}
                    placeholder="Enter next steps or tasks..."
                />
            </div>

            <div className="suggestions">
                <strong>AI Suggested Follow-ups:</strong>
                <p>+ Schedule follow-up meeting in 2 weeks</p>
                <p>+ Send clinical study PDF</p>
                <p>+ Add HCP to advisory board invite list</p>
            </div>

            <button className="save-btn">Save Interaction</button>
        </form>
    );
}

export default InteractionForm;