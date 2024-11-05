import { useEffect } from "react";

export default function Notes() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return(
    <div>
      Notes
    </div>
  );
}