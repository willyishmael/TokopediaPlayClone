import { useEffect, useState } from "react";
import { IVideo, fetchVideos } from "../data/Video";
import VideoCard from "../components/VideoCard";

export default function Home() {
    const [videos, setVideos] = useState<{ data: IVideo[] }>()

    async function fetchData() {
        try {
            const data = await fetchVideos()
            setVideos(data)
            console.log('Home videos: ', videos)
        } catch (error) {
            console.error('Error fetching data: ', error)
        }
    }

    useEffect(() => { fetchData() }, [])

    return (
        <div className="bg-indigo-950 p-4 mx-16 mb-4">
            <p className="text-xl underline decoration-lime-500 decoration-2 decoration-wavy italic mb-4">Comments</p>
            <div className="grid grid-cols-3 gap-8 m-4">
                {
                    videos?.data.map(video => (
                        <VideoCard key={video._id} video={video} />
                    ))
                }
            </div>
        </div>

    )
}