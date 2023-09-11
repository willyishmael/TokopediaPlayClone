import { useEffect, useState } from "react"
import { IVideo, fetchVideoById } from "../data/Video"
import { useNavigate, useParams } from "react-router-dom"
import { CommentSection } from "../components/CommentSection"

export default function DetailVideo() {
    const { videoId } = useParams<{ videoId: string }>()
    const [video, setVideo] = useState<{ data: IVideo }>()
    
    async function fetchVideos(id: string) {
        try {
            const response = await fetchVideoById(id)
            setVideo(response)
            console.log(`Video details: `, data)
        } catch (error) {
            console.error('Error fetching data: ', error)
        }
    }

    const navigateTo = useNavigate()
    useEffect(() => {
        if (!videoId) { navigateTo(`/`) }
        fetchVideos(videoId!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId, navigateTo])

    const data = video?.data
    return (
        <div className="grid grid-cols-2 gap-8 px-20">
            <div>
                <div className="bg-teal-dark">
                    <h1>{data?.title}</h1>
                </div>
                <CommentSection key='comment-section' videoId={videoId!} />
            </div>
            <div>

            </div>
        </div>
    )
}