export interface IVideo {
    _id: string,
    video_url: string,
    thumbnail_url: string,
    title: string,
    __v: number
}

export async function fetchVideos(): Promise<{videos: IVideo[]}> {
    const response = await fetch(`http://localhost:3000/video`);
    if (!response.ok) {
        throw new Error('Failed to fetch videos');
    }
    return response.json();
}