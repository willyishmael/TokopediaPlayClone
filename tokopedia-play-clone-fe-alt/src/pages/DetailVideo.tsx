import { useEffect, useState } from "react"
import { IVideo, fetchVideoById } from "../data/Video"
import { useNavigate, useParams } from "react-router-dom"

export default function DetailVideo() {
    const { videoId } = useParams<{ videoId: string }>()
    const [ video, setVideo ] = useState<{ data: IVideo }>()

    async function fetchData(id: string) {
        try {
            const data = await fetchVideoById(id)
            setVideo(data)
            console.log(`Video details: `, data)
        } catch (error) {
            console.error('Error fetching data: ', error)
        }
    }

    const navigateTo = useNavigate()
    if (!videoId) {
        navigateTo(`/`)
    }

    useEffect(() => { fetchData(videoId!) }, [])

    const data = video?.data
    return(
        <div className="container mx-auto p-4">
            <h1 className="mb-4">{data?.title}</h1>

        </div>
    )
}