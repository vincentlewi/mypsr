export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation)

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const scale = pixelCrop.width > 512 ? 512/pixelCrop.width : 1

  if (!ctx) {
    return null
  }

  const rotRad = getRadianAngle(rotation)

  // calculate bounding box of the rotated image
  // const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
  //   image.width,
  //   image.height,
  //   rotation
  // )

  // set canvas size to match the bounding box
  canvas.width = scale*pixelCrop.width
  canvas.height = scale*pixelCrop.height

  // translate canvas context to a central location to allow rotating and flipping around the center
  // ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  // ctx.rotate(rotRad)
  // ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  // ctx.translate(-image.width / 2, -image.height / 2)

  // draw rotated image
  ctx.scale(scale, scale)
  ctx.drawImage(
    image, 
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height, 
    0, 
    0, 
    pixelCrop.width,
    pixelCrop.height
  )
  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  // const data = ctx.getImageData(
  //   pixelCrop.x,
  //   pixelCrop.y,
  //   pixelCrop.width,
  //   pixelCrop.height
  // )

  // set canvas width to final desired crop size - this will clear existing context
  // canvas.width = pixelCrop.width
  // canvas.height = pixelCrop.height

  // paste generated rotate image at the top left corner
  // ctx.putImageData(data, 0, 0)
  
   
  // As Base64 string
  // return canvas.toDataURL('image/jpeg');
  return canvas.toDataURL('image/png');

  // As a blob
//   return new Promise((resolve, reject) => {
//     canvas.toBlob((file) => {
//       resolve(URL.createObjectURL(file))
//     }, 'image/jpeg')
//   })
}
