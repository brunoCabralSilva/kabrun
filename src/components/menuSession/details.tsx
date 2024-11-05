import { useEffect } from "react";

export default function Details() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return(
    <div>
      Details
    </div>
  );
}