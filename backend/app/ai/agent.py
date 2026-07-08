from langgraph.graph import StateGraph, END
from app.ai.state import AgentState
from app.ai.tools import (
    extract_hcp_details,
    summarize_interaction,
    recommend_followup,
    log_interaction_tool
)


def extract_node(state: AgentState):
    extracted = extract_hcp_details(state["user_input"])
    return {
        **state,
        "extracted_data": extracted
    }


def summarize_node(state: AgentState):
    summary = summarize_interaction(state["user_input"])
    return {
        **state,
        "summary": summary
    }


def recommend_node(state: AgentState):
    recommendation = recommend_followup(state["user_input"])
    return {
        **state,
        "recommendation": recommendation
    }


def log_node(state: AgentState):
    data = state["extracted_data"]
    data["ai_summary"] = state["summary"]
    data["ai_suggested_followups"] = state["recommendation"]

    log_interaction_tool(data)

    return {
        **state,
        "extracted_data": data,
        "saved": True
    }


workflow = StateGraph(AgentState)

workflow.add_node("extract_hcp_details", extract_node)
workflow.add_node("summarize_interaction", summarize_node)
workflow.add_node("recommend_followup", recommend_node)
workflow.add_node("log_interaction", log_node)

workflow.set_entry_point("extract_hcp_details")

workflow.add_edge("extract_hcp_details", "summarize_interaction")
workflow.add_edge("summarize_interaction", "recommend_followup")
workflow.add_edge("recommend_followup", "log_interaction")
workflow.add_edge("log_interaction", END)

hcp_agent = workflow.compile()


def run_hcp_agent(user_input: str):
    initial_state = {
        "user_input": user_input,
        "extracted_data": {},
        "summary": "",
        "recommendation": "",
        "saved": False
    }

    return hcp_agent.invoke(initial_state)