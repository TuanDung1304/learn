import React, { useEffect, useState } from "react";
import axios from "axios";
import './output.css'
// const axios = require('axios');

function App() {


  const [posts, setPosts] = useState([])
  const url = 'https://jsonplaceholder.typicode.com/posts'
  // useEffect(() => {
  //   const getPosts = async () => {
  //     const {data: res} = await axios.get(url)
  //     setPosts(res)
  //   }
  //   getPosts()
  // }, [])
  useEffect(() => {
    axios.get(url, {params: {id: 2}})
    .then(resp => {
      const {data: res} = resp
      setPosts(res)
    })
    .catch((err) => console.log(err))
  }, [])

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl">There are {posts.length} posts in the database</h2>
      <table className="border-collapse">
        <thead className="border border-t-0 border-l-0 border-r-0 border-b-neutral-700">
        <tr className="h-12">
            <th className="text-left w-20">ID</th>
            <th className="text-left">Title</th>
          </tr>
        </thead>
        <tbody className="">
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App;
