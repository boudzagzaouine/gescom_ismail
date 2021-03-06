import React, { FC } from "react";
import cn from "classnames";
import { ButtonProps } from "./TypeWidgets";
const calculClass = ({ className }: ButtonProps) => {
  return cn(
    "bg-sky-900 p-3 mt-2 text-white rounded border border-cyan-900 w-44 py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
    className
  );
};
/*""*/

const Bcyan: FC<ButtonProps> = ({
  label,
  children = label,
  className,
  ...props
}) => {
  return (
    <button className={calculClass({ ...props, className })} {...props}>
      {children}
    </button>
  );
};

export default Bcyan;
