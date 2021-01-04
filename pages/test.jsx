import {useLayoutEffect, useState} from "react";

export default function() {
  const [data, setData] = useState()
  useLayoutEffect(() => {
    (async () => {
      setData(await (await fetch("/api/test/book")).json());
    })();
  }, [])

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}