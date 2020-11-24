import React,{useState} from 'react'
import {useQuery,usePaginatedQuery} from 'react-query'
import { Planet } from './Planet';

const fetchPlanets = async (key,page) => {
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
}

export const Planets = () => {
  const [page, setPage] = useState(1)
  // const {data,status} = useQuery(['planets',page],fetchPlanets);
  const {
    resolvedData,
    latestData,
    status
  } = usePaginatedQuery(['planets',page],fetchPlanets);
  return (
    <div>
      <h2>Planets</h2>
      {/* <button onClick={() => setPage(page > 1 ? page-1 : page)}>Page 1</button>
      <h2>{page}</h2>
      <button onClick={() => setPage(page+1)}>Page 3</button> */}
 
      {/* <p>{status }</p> */}
      {status === 'loading' && (
        <div>Loading data...</div>
      )}
      {status === 'error' && (
        <div>Error fetching data</div>
      )}
      {status === 'success' && (
        <>
        <button
        onClick={() =>setPage(old => Math.max(old -1,1))}
        disabled={page===1}
        >Previous Page
        </button>
        <span>{page}</span>
        <button
         onClick={() => setPage(old => (!latestData || !latestData.next ? old : old +1))}
         disabled={!latestData || !latestData.next}
         >Next Page
        </button>
        <div>
          {resolvedData.results.map(planet => <Planet key={planet.name} planet={planet} />)}  
        </div>
        </>
          )}

        </div>
  )
}
