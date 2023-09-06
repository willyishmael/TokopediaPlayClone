import { useNavigate } from "react-router-dom";
import { VideoProps } from "../data/Video";

export default function VideoCard({ video }: VideoProps) {
    const navigator = useNavigate()
    function navigateToDetail(id: string) {
        navigator(`/video/${id}`)
    }

    return (
        <div className="bg-teal-dark max-w-sm rounded-lg overflow-hidden shadow-xl" onClick={ () => navigateToDetail(video._id) }>
            <div className="bg-teal-dark rounded-full p-4">
                <img src={video.thumbnail_url} alt="" className="w-full" />
            </div>
            <p className="text-lime-500 text-md text-bold px-4 pb-4">{video.title}</p>
        </div>
    )
}