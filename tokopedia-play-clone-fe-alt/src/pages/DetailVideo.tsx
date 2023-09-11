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
        <div className="grid grid-cols-3 gap-4 px-20">
            <div className="col-span-2">
                <iframe
                    src={data?.video_url}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full aspect-video rounded-t-lg" />
                <p className="bg-indigo-950 rounded-b-lg p-4 mb-4 font-semibold">{data?.title}</p>
                <CommentSection key='comment-section' videoId={videoId!} />
            </div>
            <div className="bg-indigo-950 col-span-1 p-4">
                <p className="text-xl underline decoration-lime-500 decoration-2 decoration-wavy italic mb-4">Products</p>
                <div className="bg-blue-950 rounded-xl shadow-lg">
                    <img className="w-full aspect-auto rounded-t-xl" src="https://source.unsplash.com/featured/300x203" alt="" />
                    <p className="text-md font-light px-2 pt-2">keyboard mahal nich</p>
                    <p className="text-md font-semibold px-2 pb-2 text-lime-200">Rp. 5.000.000</p>
                </div>
            </div>
        </div>
    )
}