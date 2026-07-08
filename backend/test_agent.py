from app.ai.agent import run_hcp_agent

result = run_hcp_agent(
    "Met Dr Sharma at Apollo Hospital today. Discussed CardioPlus. He showed positive interest and requested a brochure. Schedule follow-up next week."
)

print(result)