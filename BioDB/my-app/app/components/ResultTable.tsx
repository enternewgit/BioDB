import React, { useState } from 'react';
import { DetailPopup } from './DetailPopup';
import YouTube from 'react-youtube';

interface ResultTableProps {
  data: any[];
}

export function ResultTable({ data, onRowClick }: ResultTableProps) {
  console.log("Data received in ResultTable:", data);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleRowHover = (id: string, event: React.MouseEvent) => {
    setSelectedId(id);
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
    });

    const foundItem = data.find(item => item.ID === id);
    if (foundItem && foundItem.Musicurl) {
      const matchedVideoId = foundItem.Musicurl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/)?.[1];
      console.log("Extracted videoId:", matchedVideoId);
      setVideoId(matchedVideoId || null);
    } else {
      console.log("No Musicurl found for ID:", id);
      setVideoId(null);
    }
    setIsPlaying(false);
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="relative" onMouseLeave={() => setSelectedId(null)}>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Enemy_Name</th>
            <th className="border p-2">stage</th>
            <th className="border p-2">genre</th>
            <th className="border p-2">各作品の購入はこちらから</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.ID}
              onClick={(e) => handleRowHover(item.ID, e)}
              className="hover:bg-gray-100 cursor-pointer"
            >
              <td className="border p-2">{item.ID}</td>
              <td className="border p-2">{item.Name}</td>
              <td className="border p-2">{item.Enemy_Name}</td>
              <td className="border p-2">{item.stage}</td>
              <td className="border p-2">{item.genre}</td>
              <td className="border p-2"><a href={item.url}>{item.genre}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedId && (
        <DetailPopup
          id={Number(selectedId)}
          position={popupPosition}
        />
      )}

      {videoId && !isPlaying && (
        <button onClick={handlePlayClick} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          再生
        </button>
      )}

      {videoId && isPlaying && (
        <YouTube videoId={videoId} opts={opts} />
      )}
    </div>
  );
}