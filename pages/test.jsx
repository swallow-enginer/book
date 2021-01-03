import {useLayoutEffect, useState} from "react";

export default function() {
  let data = null;
  // const [data, setData] = useState()
  useLayoutEffect(() => {
    (async () => {
      data = await (await fetch("/api/test/book")).json();
    })();
  })

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}