export interface IProduct {
    _id: string
    video: string
    image_url: string
    title: string
    price: number
}

export interface ProductProps {
    product: IProduct
}

export async function fetchProductsByVideoId(id: string): Promise<{ data: IProduct[] }> {
    const response = await fetch(`http://localhost:3000/product/vi/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch Products')
    }
    return response.json()
}