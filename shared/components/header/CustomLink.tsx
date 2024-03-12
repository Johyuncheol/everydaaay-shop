import React from "react";
import { Link } from "react-router-dom";

interface ConditionalLinkProps {
  to: string;
  isLink: boolean;
  children: React.ReactNode;
  mouseOverFunc?:() => void;
  onClickFunc?:() => void;
}

const ConditionalLink: React.FC<ConditionalLinkProps> = ({
  to,
  isLink,
  children,
  mouseOverFunc
}) => {
  return isLink ? (
    <Link to={to} onMouseOver={mouseOverFunc}>{children}</Link>
  ) : (
    <a href={to} onMouseOver={mouseOverFunc}>{children}</a>
  );
};

export default ConditionalLink;
