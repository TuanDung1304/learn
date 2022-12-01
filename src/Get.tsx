import React, { useEffect, useState } from "react";
import axios from "axios";

interface IPost {
  userId: number,
  id: number,
  title: string,
  body: string
}

function Get() {
  const [posts, setPosts] = useState<IPost[]>([]);
  console.log(posts)
  const url = "https://jsonplaceholder.typicode.com/posts";
  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get<IPost[]>(url);
      setPosts(res);
    };
    getPosts();
  }, []);

  // useEffect(() => {
  //   axios.get(url, {params: {id: 2}})
  //   .then(resp => {
  //     const {data: res} = resp
  //     setPosts(res)
  //   })
  //   .catch((err) => console.log(err))
  // }, [])

  const getMultiPosts = () => {
    return axios.get(url);
  };

  const getSinglePost = () => {
    return axios.get(url, {params: {id: 1}});
  };
  Promise.all([getMultiPosts(), getSinglePost()]).then((res) => {
    const multiPosts = res[0].data;
    const singlePost = res[1].data;
    console.log(multiPosts, singlePost);
  });

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl text-red-400">
        There are {posts.length} posts in the database
      </h2>
      <table className="border-collapse"> 
        <thead className="border border-t-0 border-l-0 border-r-0 border-b-neutral-700">
          <tr className="h-12">
            <th className="text-left w-20">ID</th>
            <th className="text-left">Title</th>
          </tr>
        </thead>
        <tbody className="">
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Get;
