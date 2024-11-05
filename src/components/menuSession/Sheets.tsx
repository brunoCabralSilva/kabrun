import { useEffect } from "react";

export default function Sheets() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return(
    <div>
      Sheets
    </div>
  );
}