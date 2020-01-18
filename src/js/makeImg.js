export default (width, height, src) => {
  const image = new Image(width, height);
  image.setAttribute('src', src);
  return image;
};
