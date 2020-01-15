export default (hero, item) => {
  const { x: hx1, y: hy1, width: hwidth, height: hheight } = hero;
  const { x: ix1, y: iy1, width: iwidth, height: iheight } = item;
  const hx2 = hx1 + hwidth;
  const hy2 = hy1 + hheight;
  const iy2 = iy1 + iheight;
  const ix2 = ix1 + iwidth;
  return !(hy1 > iy2 || hx2 < ix1 || hy2 < iy1 || hx1 > ix2);
};
