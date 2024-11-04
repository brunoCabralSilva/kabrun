import { useEffect } from "react";
import Nav from "../components/nav";

export default function Lore() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return(
    <div>
      <Nav />
      Lore
    </div>
  );
}