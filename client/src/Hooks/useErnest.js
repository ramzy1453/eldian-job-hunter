import { useEffect, useState } from "react";
import Ernest from "../Utils/Ernest";
export default function useErnest(url, headers) {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (!url) {
      return;
    }

    Ernest(url, "GET", null, {
      Authorization: headers.Authorization,
    })
      .then((response) => {
        setData(response);
      })
      .catch((err) => setError({ value: true, message: err.message }))
      .finally(() => setLoading(false));
  }, [url, headers.Authorization]);

  return { data, isLoading, error, setData };
}
