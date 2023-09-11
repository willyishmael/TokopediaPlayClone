import { useEffect, useState } from "react";
import { IVideo, VideoIdProps, fetchVideoById } from "../data/Video";

export function VideoPlayerSection({ videoId }: VideoIdProps) {
    const [video, setVideo] = useState<{ data: IVideo }>()

    async function fetchVideos(id: string) {
        try {
            const response = await fetchVideoById(id)
            setVideo(response)
        } catch (error) {
            console.error('Error fetching data: ', error)
        }
    }

    useEffect(() => {
        if (videoId) {
            fetchVideos(videoId)
        }
    }, [videoId])

    return (
        <>
            <iframe
                src={video?.data.video_url}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full aspect-video rounded-t-lg" />
            <p className="bg-indigo-950 rounded-b-lg p-4 mb-4 font-semibold">{video?.data.title}</p>
        </>
    )
} 