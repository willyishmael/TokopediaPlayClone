import { useEffect, useState } from "react";
import { VideoIdProps } from "../data/Video";
import { IProduct, fetchProductsByVideoId } from "../data/Product";

export function ProductSection({ videoId }: VideoIdProps) {
    const [products, setProducts] = useState<{ data: IProduct[] }>()

    async function fetchProducts(id: string) {
        try {
            const response = await fetchProductsByVideoId(id)
            setProducts(response)
        } catch (error) {
            console.error(`Error fetching data: `, error)
        }
    }

    useEffect(() => {
        if (videoId) {
            fetchProducts(videoId)
        }
    }, [videoId])

    return (
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
    )
}