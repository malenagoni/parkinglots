import  {  useEffect, useState } from 'react'
import axios from 'axios';
import { BusinessCard } from '../BusinessCard/BusinessCard';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import SearchBar from '../SearchBar/SearchBar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2)
    }
  }
}))

export const LoadingScroll = () => {    // me llega locacion por parametro
    const classes = useStyles();
    const [total, setTotal] = useState(0)
    const [businesses, setBusinesses] = useState([])
    const [businessesByRating, setBusinessesByRating] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [place, setPlace] = useState('')

    //For total
    useEffect(() => {
      if(place.length !== 0) {
      setBusinesses([])
      axios(`https://api.yelp.com/v3/businesses/search?location=${place}&term=parking&limit=1`, {
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
            }
      }).then(res => {
        if(res.data.total > 1000) {
          return setTotal(1000)
          // return setOffset(990)
        } else {
          return setTotal(res.data.total)
          // return setOffset(res.data.total - 10)
        }
      })
    }
    }, [place]) 

    //To order by rating Bayesian average
    useEffect(() => {
      if(place.length !== 0) {
      console.log(businesses.length)
        if(businesses.length > 99) {
          console.log(businesses)
          let ordenado = businesses.sort((a,b) =>  a.rating - b.rating)
          setBusinessesByRating(ordenado)
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [businesses])

        console.log(place)

    // To request 100 bussinesses. To request 1000, just change the condition while
    useEffect(() => {
      if(place.length !== 0) {
        setBusinesses([])
      let x = 0;
      while (x < 100) {
        axios(`https://api.yelp.com/v3/businesses/search?location=${place}&term=parking&limit=50&offset=${x} `, {
          headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
          }
      }).then( r => {
        console.log(r)
        r.data?.businesses?.forEach((e) => {
          e.score = parseFloat((e.review_count * e.rating) / (e.review_count + 1)).toFixed(1);
        });
        setBusinesses((data) => data.concat(r.data.businesses));
       
      }).catch(e => {
        console.log(e)
      })
        x = x + 50
      }}
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total])

    function handleChange (page) {
      setPageNumber(page)
      // if(total > 0) setOffset(total - Number(`${page}0`))
    }

    return (
      <>
        <SearchBar setPlace={setPlace}/>
        <div>
            { businessesByRating?.length === 100&&businessesByRating?.slice(pageNumber===1?0:pageNumber*10-10, pageNumber===1?9:pageNumber*10-1).map( (b,i)=> {
              // console.log(businesses)
                return (
                    <BusinessCard 
                    key = {i}
                    image={b.image_url} 
                    address={b.location.display_address[0] || b.location.display_address[1]}
                    rating={b.rating}
                    score={b.score}
                    reviews={b.review_count}
                    link={b.url}
                    />
                )
            })
            }
        <div className={classes.root}>
        <Pagination count={10} color="secondary" onChange={(e, p)=> handleChange(p)} />
        </div>
            
    </div>
    </>
    )
}

// import { useEffect, useState } from 'react'
// import axios from 'axios'

// export default function useBusinessesearch(location, offset) {
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(false)
//   const [businesses, setBusinesses] = useState([])
//   const [hasMore, setHasMore] = useState(false)

//   useEffect(() => {
//     setBusinesses([])
//   }, [location])

//   useEffect(() => {
//     setLoading(true)
//     setError(false)
//     let cancel
//     axios(`/v3/businesses/search?location=${location}&term=parking`, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
//             },
//         cancelToken: new axios.CancelToken(c => cancel = c)
//     }).then(res => {
//         setBusinesses(prevbusinesses => {
//         return [...new Set([...prevbusinesses, ...res.data.businesses])]
//       })
//       setHasMore(res.data.businesses.length > 0)
//       setLoading(false)
//     }).catch(e => {
//       if (axios.isCancel(e)) return
//       setError(true)
//     })
//     return () => cancel()
//   }, [location, offset])

//   return { loading, error, businesses, hasMore }
// }