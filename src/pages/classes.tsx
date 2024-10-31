import { useEffect } from "react";

export default function Classes() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return(
    <div>
      Classes
    </div>
  );
}