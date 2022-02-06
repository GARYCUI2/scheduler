import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const back = () => {
    setMode(history[history.length-1]);
    const newHistory = [...history];
    history.length >= 2 && newHistory.pop();
    setHistory(newHistory);
  };
  
  const transition = (newMode,replace = false) => {
    mode!==initial && replace === false && setHistory([...history, mode]);
    setMode(newMode);
  }

  return { mode,transition, back };
}

