import { useEffect } from "react";

export default function Equipments() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return(
    <div>
      Equipments
    </div>
  );
}