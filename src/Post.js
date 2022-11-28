import axios from 'axios';
import React from 'react'


function Post() {
  const url = "https://reqres.in/api/users";
  axios.post(url, {
    "name": "morpheus",
    "job": "leader"
})
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
  
  return (
	<div>Post</div>
  )
}

export default Post