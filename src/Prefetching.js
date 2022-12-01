import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import React, { useState } from 'react'

const queryClient = new QueryClient();

async function getAlbums() {
	const res = await axios.get("https://jsonplaceholder.typicode.com/albums");
  
	return res.data;
  }
  
  async function getAlbum(albumId) {
	  const res = await axios.get("https://jsonplaceholder.typicode.com/albums" + '/' + albumId);
	
	  return res.data;
  }
  
  async function prefetchAlbum(albumId, queryClient) {
	// kết quả của câu truy vấn này sẽ được lưu vào bộ nhớ đệm như
	// những truy vấn thông thường
	// await axios.get("https://jsonplaceholder.typicode.com/posts");
	// await axios.get("https://jsonplaceholder.typicode.com/photos");
	// await axios.get("https://jsonplaceholder.typicode.com/todos");
	// await axios.get("https://jsonplaceholder.typicode.com/users");
	
	await queryClient.prefetchQuery (["album", albumId], () => getAlbum(albumId));
	console.log('prefetched: '+ albumId)
  };

function Album({ albumId, setAlbumId }) {
	const albumQuery = useQuery(['album', albumId], () => getAlbum(albumId))
	
	return (
		<div className='album'>
		  <div>
			{
			  albumQuery.isLoading ?
				'Loading...' :
				(<div>
				  <h2>{albumQuery.data.title}</h2>
				</div>)
			}
		  </div>
		  <button className='back' onClick={() => setAlbumId(-1)}>Back</button>
		</div>
	  )
}

function Albums({setAlbumId}) {
	const { data, error, isError, isLoading } = useQuery(["albums"], getAlbums);
	const queryClient = useQueryClient();
	if (isLoading) {
	  return <span>Đang tải...</span>;
	}
	if (isError) {
	  return <span>Have an errors: {error.message}</span>;
	}
	return (
	  <div>
		<h1>Albums</h1>
		<div>
		  <ul>
			{data.map((album) => (
				<li key={album.id} className="album" >
				  <a href="#" style={{color: 'black', textDecoration: 'none'}} 
					onMouseEnter={() => prefetchAlbum(album.id, queryClient)}
					onClick={() => setAlbumId(album.id)}
				  >
					{album.title}
				  </a>
				</li>
			  ))}
		  </ul>
		</div>
	  </div>
	);
  }

function Prefetching() {
  const [albumId, setAlbumId] = useState(-1)
  return (
	<QueryClientProvider client={queryClient}>
    {
        albumId > -1 ?
          (<Album albumId={albumId} setAlbumId={setAlbumId} />) :
          (<Albums setAlbumId={setAlbumId}/>)
      }
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Prefetching