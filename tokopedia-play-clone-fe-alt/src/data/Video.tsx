export interface IVideo {
    _id: string,
    video_url: string,
    thumbnail_url: string,
    title: string,
    __v: number
}

export interface VideoProps {
    video: IVideo;
}

export async function fetchVideos(): Promise<{ data: IVideo[] }> {
    const response = await fetch(`http://localhost:3000/video`);
    if (!response.ok) {
        throw new Error('Failed to fetch videos');
    }
    return response.json();
}

export async function fetchVideoById(id: string): Promise<{ data: IVideo }> {
    const response = await fetch(`http://localhost:3000/video/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch videos');
    }
    return response.json();
}