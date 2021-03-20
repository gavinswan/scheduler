import { useState }  from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    let newHistory = [];
    if (replace === true) {
      newHistory = [...history.slice(0, -1), newMode];
    } else {
      newHistory = [...history, newMode]
    }
    setMode(newMode);
    setHistory(newHistory);
  }
  
  function back() {
    if (history.length < 2) {
      return;
    }
    
    let newHistory = [...history.slice(0, -1)];
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
  }

  return { mode, transition, back }
}
