import { useEffect } from "react";

export default function Lore() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return(
    <div>
      Lore
    </div>
  );
}