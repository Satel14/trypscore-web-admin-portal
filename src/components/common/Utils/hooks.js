import { useEffect } from "react";
export const useScript = (url, id) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;
    script.id = id;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url, id]);
};
