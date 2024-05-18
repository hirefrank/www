type IconProps = {
  className: string;
  p1ClassName: string;
  p2ClassName: string;
  fill: string;
  path: string;
  path2: string;
  viewBox: string;
  size: number;
};

export default ({ className, p1ClassName, p2ClassName, fill, path, path2, size = 16, viewBox="0 0 16 16" }: IconProps) => {
  return (
    <svg
      aria-hidden="true"
      role="img"
      fill={fill ? fill : "none"}
      fill-rule="evenodd"
      className={className}
      width={`${size}px`}
      height={`${size}px`}
      viewBox={viewBox}
    >
      <path d={path} className={p1ClassName}> </path>
      <path d={path2} className={p2ClassName}></path>
    </svg>
  );
};
