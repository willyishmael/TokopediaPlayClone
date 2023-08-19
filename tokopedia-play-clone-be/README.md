# Tokopedia Play Clone (Back-End)

## Installation
- Install project `npm install`
- Create `.env` file, see `.env.example`
- Build the project `npm run build`
- Start the server `npm start`

## Database Structure
Document:
- video
  - _id
  - video_url: string
  - thumbnail_url: string
  - title: string
- product
  - _id
  - video: string (ref: video)
  - image_url: string
  - price: number
- comment
  - _id
  - video: string (ref: video)
  - username: string
  - content: string
## List API Request
Endpoints for Video:
- GET all video `/video`
- GET video by Id `/video/:videoId`
- POST new video `/video/create` with a body `{ title: string, video_url: string, thumbnail_url: string }`
- PATCH update video `/video/update/:videoId` with a body `{ title: string, video_url: string, thumbnail_url: string }`
- DELETE video `/video/delete/:videoId`

Endpoints for Product:
- GET all product `/product`
- GET product by Id `/product/:productId`
- POST new product `/product/create` with a body `{ video: string, title: string, image_url: string, price: number }`
- PATCH update product `/product/update/:productId` with a body `{ video: string, title: string, image_url: string, price: number }`
- DELETE product `/product/delete/:productId`

Endpoints for Comment:
- GET all comment `/comment`
- GET comment by Id `/comment/:commentId`
- POST new comment `/comment/create` with a body `{ video: string, username: string, content: string }`
- PATCH update comment `/comment/update/:commentId` with a body `{ video: string, username: string, content: string }`
- DELETE comment `/comment/delete/:commentId`
