import { useEffect } from "react";
import Nav from "../components/nav";

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return(
    <div>
      <Nav />
      About
    </div>
  );
}