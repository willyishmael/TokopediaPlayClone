import { useNavigate } from "react-router-dom";
import { VideoProps } from "../data/Video";

export default function VideoCard({ video }: VideoProps) {
    const navigator = useNavigate()
    function navigateToDetail(id: string) {
        navigator(`/video/${id}`)
    }

    return (
        <div className="bg-blue-950 rounded-xl overflow-hidden shadow-xl" onClick={() => navigateToDetail(video._id)}>
            <img src={video.thumbnail_url} alt="" className="w-full aspect-video object-cover" />
            <p className="text-md font-semibold p-4">{video.title}</p>
        </div>
    )
}