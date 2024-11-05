import { useEffect } from "react";

export default function Images() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return(
    <div>
      Images
    </div>
  );
}