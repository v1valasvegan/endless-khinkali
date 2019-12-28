export default (hero, item) => {
  const {
    x: hx1, y: hy1, width: hwidth, height: hheight,
  } = hero;
  const { x: ix1, y: iy1, width: iwidth } = item;
  const hx2 = hx1 + hwidth;
  const hy2 = hy1 + hheight;
  const ix2 = ix1 + iwidth;
  // console.log(`hero: x1: ${hx1}, x2: ${hx2}, y2: ${hy2}`);
  // console.log(`barrier: x1: ${ix1}, x2: ${ix2}, y1: ${iy1}`);
  return ((hx2 >= ix1 && hx2 <= ix2) || (hx1 >= ix1 && hx2 <= ix2)) && hy2 >= iy1;
};