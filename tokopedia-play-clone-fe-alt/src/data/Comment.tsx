export interface IComment {
    _id: string,
    video: string,
    username: string,
    content: string,
    createdAt: string,
    __v: number
}

export interface CommentProps {
    comment: IComment
}

export async function fetchCommentsByVideoId(id: string): Promise<{ data: IComment[] }> {
    const response = await fetch(`http://localhost:3000/comment/vi/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch comments')
    }
    return response.json()
}

export async function submitComment(
    comment: { video: string, username: string, content: string }
): Promise<{ message: string, data: IComment }> {
    const response = await fetch(`http://localhost:3000/comment/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    if (!response.ok) {
        throw new Error('Failed to submit comment');
    }

    return response.json()
}