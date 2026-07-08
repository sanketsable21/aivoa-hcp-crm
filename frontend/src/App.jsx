import InteractionForm from "./components/InteractionForm";
import AIAssistant from "./components/AIAssistant";
import InteractionList from "./components/InteractionList";

function App() {
  return (
    <div className="app">
      <div className="page-header">
        <h1>Log HCP Interaction</h1>
      </div>

      <div className="main-layout">
        <InteractionForm />
        <AIAssistant />
      </div>

      <InteractionList />
    </div>
  );
}

export default App;