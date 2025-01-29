import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

interface DetailPopupProps {
  id: number;
  position: { x: number; y: number };
}

export function DetailPopup({ id, position }: DetailPopupProps) {
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    console.log(`Fetching details for ID=${id}`);
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost/api/Toho_detail.php?id=${id}`);
        const text = await response.text();
        console.log('Raw response:', text);
        const data = JSON.parse(text);
        if (data.status === 'success') {
          setDetails(data.data);
        }
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!details) return null;

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div
      className="absolute bg-white border rounded shadow-lg p-4"
      style={{
        top: `${position.y - 500}px`,
        left: `${position.x}px`,
      }}
    >
      <h3 className="font-bold">{details.ID}</h3>
      <p>Name: {details.Name}</p>
      <p>Enemy_Name: {details.Enemy_Name}</p>
      <p>Stage: {details.stage}</p>
      <p>Genre: {details.genre}</p>
      <p>URL: <a href={details.url} target="_blank" rel="noopener noreferrer">{details.url}</a></p>
      
      {details.Musicurl && (
        <YouTube videoId={details.Musicurl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/)?.[1]} opts={opts} />
      )}
    </div>
  );
}