import axios from 'axios'
import React from 'react'
import { useLocation } from 'react-router'
import Header from '../../Components/header/Header'
import Post from '../../Components/posts/Posts'
import './home.css'

export default function Home() {
  const [posts, setPosts] = React.useState([])
  const { search } = useLocation()
  const URL=`http://localhost:3000/api`
  
  React.useEffect(() => {
    axios.get(`${URL}/post` + search)
      .then((res) => {
        // console.log(res);
        setPosts(res.data)
      })
  }, [search])


  return (
    <>
      <Header />
      <div className="home">
        <Post posts={posts} />
      </div>
    </>
  )
}
