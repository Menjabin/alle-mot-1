import Form from "./components/form";
import { useState, useEffect } from "react";

function App() {
  const [id, setId] = useState("");

  useEffect(() => {
    // Get this player's id from local storage. If it doesn't exist, create it.
    let storedId = localStorage.getItem("id");
    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem("id", storedId);
    }
    setId(storedId);
  });

  return (
    <div className="App">
      <div className="App-header bg-current text-secondary">
        <Form id={id} />
      </div>
    </div>
  );
}

export default App;
