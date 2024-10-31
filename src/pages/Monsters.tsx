import { useEffect } from "react";

export default function Monsters() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

    return(
      <div>
        Monsters
      </div>
    );
  }