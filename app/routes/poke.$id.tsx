import { Await, Link, useLocation, useParams } from "@remix-run/react";
import memoizeOne from "memoize-one";
import React, { Suspense } from "react";

const fetchPoke = memoizeOne(async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.json();
})

export default function Poke() {
  const params = useParams();
  console.log('params', params.id);

  return (
    <Suspense fallback="poke">
      <div style={{ background: '#789' }}>
        <h1>Poke</h1>
        <h2>id: {params.id}</h2>
        <ul>
          <li><Link to="/">/</Link></li>
          <li><Link to="/poke/1">/poke/1</Link></li>
          <li><Link to="/poke/2">/poke/2</Link></li>
          <li><Link to="/poke/3">/poke/3</Link></li>
        </ul>
        <Suspense fallback={<div>Loading...</div>}>
          <AsyncComponent id={params.id!} />
        </Suspense>
      </div>
    </Suspense>
  )
}

type AsyncComponentProps = {
  id: string
}

function AsyncComponent({ id }: AsyncComponentProps) {
  console.log('AsyncComponent', id);
  const awaited = fetchPoke(id);
  return <Await resolve={awaited}>
    {(data) => (
      <div>AsyncComponent: {data.name}</div>
    )}
  </Await>;
}

// function AsyncComponent({ id }: AsyncComponentProps) {
//   console.log('AsyncComponent', id);
//   const data = (React as any).use(fetchPoke(id));
//   return <div>AsyncComponent: {data.name}</div>;
// }
