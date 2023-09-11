import { useEffect, useState } from "react"
import { IVideo, fetchVideoById } from "../data/Video"
import { useNavigate, useParams } from "react-router-dom"
import { IComment, fetchCommentsByVideoId, submitComment } from "../data/Comment"
import CommentCard from "../components/CommentCard"

export default function DetailVideo() {
    const { videoId } = useParams<{ videoId: string }>()
    const [video, setVideo] = useState<{ data: IVideo }>()
    const [comments, setComments] = useState<{ data: IComment[] }>()
    const [commentUsername, setCommentUsername] = useState<string>('')
    const [commentContent, setCommentContent] = useState<string>('')

    async function fetchVideos(id: string) {
        try {
            const response = await fetchVideoById(id)
            setVideo(response)
            console.log(`Video details: `, data)
        } catch (error) {
            console.error('Error fetching data: ', error)
        }
    }

    async function fetchComments(id: string) {
        try {
            const response = await fetchCommentsByVideoId(id)
            setComments(response)
            console.log(`Comments: `, data)
        } catch (error) {
            console.error('Error fetching data: ', error)
        }
    }

    function handleCommentUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCommentUsername(e.target.value)
    }

    function handleCommentContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setCommentContent(e.target.value)
    }

    async function handleCommentSubmit(e: React.FormEvent) {
        e.preventDefault()

        const comment = {
            video: videoId ? videoId : '',
            username: commentUsername,
            content: commentContent,
        }

        try {
            const response = await submitComment(comment)
            console.log(response)
            setCommentUsername('')
            setCommentContent('')

            const newComments = comments?.data
            newComments?.push(response.data)
            if(newComments) { setComments({data: newComments}) }
        } catch (error) {
            console.error(`Failed submitting data: `, error)
        }
    }

    const navigateTo = useNavigate()
    useEffect(() => {
        if (!videoId) { navigateTo(`/`) }
        fetchVideos(videoId!)
        fetchComments(videoId!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId, navigateTo])

    const data = video?.data
    return (
        <div className="grid grid-cols-2 gap-8 px-20">
            <div>
                <div className="bg-teal-dark">
                    <h1>{data?.title}</h1>
                </div>
                <div className="bg-indigo-950 rounded-xl p-4 bold">
                    <p className="text-xl underline decoration-lime-500 decoration-2 decoration-wavy italic">Comments</p>
                    <div className="m-4">
                        <p className="text-sm underline decoration-orange-600 decoration-4 mb-2">Username</p>
                        <input className="text-sm w-full rounded-md px-2 py-1 bg-indigo-900" type="text" name="video-comment-username" value={commentUsername} onChange={handleCommentUsernameChange} placeholder="Insert your username.." />
                        <p className="mt-2 text-sm underline decoration-orange-600 decoration-4 mb-2">Comment</p>
                        <textarea className="w-full rounded-md px-2 py-1 bg-indigo-900 min-h-6 text-sm" name="video-comment-content" value={commentContent} onChange={handleCommentContentChange} placeholder="Write your comment.." />
                        <button className="bg-orange-600 py-1 px-4 mt-2 rounded-xl float-right" type="submit" onClick={handleCommentSubmit}>Post</button>
                    </div>
                    <div className="mt-14">
                        <ul> {
                            comments?.data.map(comment => (
                                <CommentCard key={comment._id} comment={comment} />
                            ))
                        } </ul>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}