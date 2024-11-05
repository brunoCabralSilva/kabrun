import { useEffect } from "react";

export default function Messages() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return(
    <div>
      Messages
    </div>
  );
}