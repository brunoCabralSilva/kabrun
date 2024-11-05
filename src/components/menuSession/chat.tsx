import { useEffect } from "react";

export default function Chat() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return(
    <div>
      Chat
    </div>
  );
}