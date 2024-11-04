import { useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function SessionId() {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return(
    <div>
      SessionId { id }
    </div>
  );
}