import { useEffect, useState } from "react"
import { IComment, fetchCommentsByVideoId, submitComment } from "../data/Comment"
import CommentCard from "./CommentCard"
import { VideoIdProps } from "../data/Video"

export function CommentSection({ videoId }: VideoIdProps) {
    const [comments, setComments] = useState<{ data: IComment[] }>()
    const [commentUsername, setCommentUsername] = useState<string>('')
    const [commentContent, setCommentContent] = useState<string>('')
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true)

    async function fetchComments(id: string) {
        try {
            const response = await fetchCommentsByVideoId(id)
            setComments(response)
            console.log(`Comments: `, response)
        } catch (error) {
            console.error('Error fetching data: ', error)
        }
    }

    function handleCommentUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setCommentUsername(value)
        setIsSubmitButtonDisabled(
            value.trim() === '' || commentContent.trim() === ''
        )
    }

    function handleCommentContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value
        setCommentContent(value)
        setIsSubmitButtonDisabled(
            value.trim() === '' || commentUsername.trim() === ''
        )
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
            newComments?.unshift(response.data)
            if (newComments) { setComments({ data: newComments }) }
        } catch (error) {
            console.error(`Failed submitting data: `, error)
        }
    }

    useEffect(() => {
        fetchComments(videoId!)
    }, [videoId])

    return (
        <div className="bg-indigo-950 rounded-xl p-4 mb-4">
            <p className="text-xl underline decoration-lime-500 decoration-2 decoration-wavy italic">Comments</p>
            <div className="m-4">
                <p className="text-sm underline decoration-orange-600 decoration-4 mb-2">Username</p>
                <input className="text-sm w-full rounded-md px-2 py-1 bg-indigo-900" type="text" name="video-comment-username" value={commentUsername} onChange={handleCommentUsernameChange} placeholder="Insert your username.." />
                <p className="mt-2 text-sm underline decoration-orange-600 decoration-4 mb-2">Comment</p>
                <textarea className="w-full rounded-md px-2 py-1 bg-indigo-900 min-h-6 text-sm" name="video-comment-content" value={commentContent} onChange={handleCommentContentChange} placeholder="Write your comment.." />
                <button className={`bg-orange-600 py-1 px-4 mt-2 rounded-xl float-right  ${isSubmitButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-700 active:bg-orange-800'}`} type="submit" onClick={handleCommentSubmit}>Post</button>
            </div>
            <div className="mt-14">
                <ul> {
                    comments?.data.map(comment => (
                        <CommentCard key={comment._id} comment={comment} />
                    ))
                } </ul>
            </div>
        </div>
    )
}