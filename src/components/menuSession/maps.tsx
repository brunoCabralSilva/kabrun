import { useEffect } from "react";

export default function Maps() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return(
    <div>
      Maps
    </div>
  );
}