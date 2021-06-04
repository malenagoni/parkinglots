import './App.css';
import { LoadingScroll } from './components/LoadingScroll/LoadingScroll';
// import SearchBar from './components/SearchBar/SearchBar';

function App() {

  
  return (
    <div className="App">
        {/* <SearchBar/> */}
        <LoadingScroll/>
    </div>
  );
}

export default App;
// import React, { useState, useRef, useCallback } from 'react'
// import { BusinessCard } from './components/BusinessCard/BusinessCard'
// import useBusinessesearch from './components/LoadingScroll/LoadingScroll'

// export default function App() {
//   const [location, setLocation] = useState('')
//   const [offset, setOffset] = useState(1)

//   const {
//     businesses,
//     hasMore,
//     loading,
//     error
//   } = useBusinessesearch(location, offset)

//   const observer = useRef()
  
//   const lastBusinessElementRef = useCallback(node => {
//     if (loading) return
//     if (observer.current) observer.current.disconnect()
//     observer.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasMore) {
//         setOffset(prevoffset => prevoffset + 10)
//       }
//     })
//     if (node) observer.current.observe(node)
//   }, [loading, hasMore])

//   function handleSearch(e) {
//     setLocation(e.target.value)
//     setOffset(1)
//   }

//   return (
//     <>
//       <input type="text" value={location} onChange={handleSearch}></input>
//       {businesses?.map((b, i) => {
//         if (businesses.length === i + 1) {
//           return <div ref={lastBusinessElementRef} key={b}>
//             <BusinessCard
//                     key = {i}
//                     image={b.image_url} 
//                     address={b.location.display_address[0] || b.location.display_address[1]}
//                     ratingStars={b.rating}
//                     reviews={b.review_count}
//                     link={b.url} 
//                     />
//           </div>
//         } else {
//           return <div key={b}>{b}</div>
//         }
//       })}
//       <div>{loading && 'Loading...'}</div>
//       <div>{error && 'Error'}</div>
//     </>
//   )
// }