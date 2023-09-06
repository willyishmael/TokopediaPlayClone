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
        <div className="container mx-auto p-4">
            <h1 className="mb-4">Home</h1>
            <div className="grid grid-cols-3 gap-8"> {
                videos?.data.map(video => (
                    <VideoCard key={video._id} video={video} />
                ))
            } </div>
        </div>
    )
}