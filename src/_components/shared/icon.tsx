type IconProps = {
  className: string;
  color: string;
  icon: string;
  size: number;
};

export default ({ className, p1ClassName, p2ClassName, color, path, path2, size = 16, viewBox="0 0 16 16" }: IconProps) => {
  return (
    <svg
      aria-hidden="true"
      role="img"
      fill={color
        ? color.startsWith("#") ? color : `var(--${color})`
        : "currentColor"}
      fill-rule="evenodd"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
      width={`${size}px`}
      height={`${size}px`}
      viewBox={viewBox}
    >
      <path d={path} className={p1ClassName}></path>
      <path d={path2} className={p2ClassName}></path>
    </svg>
  );
};
