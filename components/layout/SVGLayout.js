export const Circle = ({ key, cx, cy, r }) => {
  return <circle key={key} cx={cx} cy={cy} r={r} />;
};

export const Line = ({ x1, y1, x2, y2, color, strokeWidth }) => {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={strokeWidth} fill="white" />;
};
