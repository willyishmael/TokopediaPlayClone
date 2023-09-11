import { CommentProps } from "../data/Comment";

export default function CommentCard({ comment }: CommentProps) {
    return (
        <div className="m-4 bg-blue-950 p-4 rounded-lg shadow-lg">
            <p className="italic underline decoration-indigo-500 decoration-4">{comment.username}</p>
            <p>{comment.content}</p>
            <p className="text-xs text-green-700 italic">
                {new Date(comment.createdAt).toLocaleString()}
            </p>
        </div>
    )
}