import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CommentSection } from "../components/CommentSection"
import { ProductSection } from "../components/ProductSection"
import { VideoPlayerSection } from "../components/VideoPlayerSection"

export default function DetailVideo() {
    const { videoId } = useParams<{ videoId: string }>()
    
    const navigateTo = useNavigate()
    useEffect(() => {
        if (!videoId) { navigateTo(`/`) }
    }, [videoId, navigateTo])

    return (
        <div className="grid grid-cols-3 gap-4 px-20">
            <div className="col-span-2">
                <VideoPlayerSection key='video-player-section' videoId={videoId!} />
                <CommentSection key='comment-section' videoId={videoId!} />
            </div>
            <ProductSection key='product-section' videoId={videoId!}/>
        </div>
    )
}