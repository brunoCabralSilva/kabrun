import { useEffect } from "react";

export default function Talents() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return(
    <div>
      Talents
    </div>
  );
}