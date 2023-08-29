import { IVideo } from "../data/Video";

interface VideoCardProps {
    video: IVideo;
}

export default function VideoCard({ video }: VideoCardProps) {
    return (
        <div className="bg-teal-dark max-w-sm rounded-lg overflow-hidden shadow-xl">
            <div className="bg-teal-dark rounded-full p-4">
                <img src={video.thumbnail_url} alt="" className="w-full" />
            </div>
            <p className="text-lime-500 text-md text-bold px-4 pb-4">{video.title}</p>
        </div>
    )
}