import { useEffect, useState } from "react"
import { IVideo, fetchVideoById } from "../data/Video"
import { useNavigate, useParams } from "react-router-dom"
import { CommentSection } from "../components/CommentSection"
import { IProduct, fetchProductsByVideoId } from "../data/Product"

export default function DetailVideo() {
    const { videoId } = useParams<{ videoId: string }>()
    const [video, setVideo] = useState<{ data: IVideo }>()
    const [products, setProducts] = useState<{ data: IProduct[] }>()

    async function fetchVideos(id: string) {
        try {
            const response = await fetchVideoById(id)
            setVideo(response)
        } catch (error) {
            console.error('Error fetching data: ', error)
        }
    }

    async function fetchProducts(id: string) {
        try {
            const response = await fetchProductsByVideoId(id)
            setProducts(response)
        } catch (error) {
            console.error(`Error fetching data: `, error)
        }
    }

    const navigateTo = useNavigate()
    useEffect(() => {
        if (!videoId) { navigateTo(`/`) }
        else {
            fetchVideos(videoId)
            fetchProducts(videoId)
        }
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
                {
                    products?.data.map(product => (
                        <div className="bg-blue-950 rounded-xl shadow-lg mb-4">
                            <img className="w-full aspect-auto rounded-t-xl" src={product.image_url} alt="" />
                            <p className="text-md font-light px-2 pt-2">{product.title}</p>
                            <p className="text-md font-semibold px-2 pb-2 text-lime-200">Rp. {product.price.toLocaleString('id-ID')}</p>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}