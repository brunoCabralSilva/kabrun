import { useEffect } from "react";

export default function Dices() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return(
    <div>
      Dices
    </div>
  );
}