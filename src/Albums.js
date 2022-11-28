import axios from "axios";
import React from "react";
import { QueryClient, useQuery } from "react-query";

const queryClient = new QueryClient()

async function getAlbums() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/albums");

  return res.data;
}

async function getAlbum(albumId) {
	const res = await axios.get("https://jsonplaceholder.typicode.com/albums" + '/' + albumId);
  
	return res.data;
}

async function prefetchAlbum(albumId) {
  // kết quả của câu truy vấn này sẽ được lưu vào bộ nhớ đệm như
  // những truy vấn thông thường
  await queryClient.prefetchQuery(["album", albumId], () => getAlbum(albumId));
};

export function Album({ albumId, setAlbumId }) {
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
  const { data, error, isError, isLoading } = useQuery("albums", getAlbums);
  
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
					onMouseEnter={() => prefetchAlbum(album.id)}
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

export default Albums;
