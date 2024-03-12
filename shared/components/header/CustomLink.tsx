import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface ConditionalLinkProps {
  to: string;
  children: React.ReactNode;
  mouseOverFunc?:() => void;
  onClickFunc?:() => void;
}

const ConditionalLink: React.FC<ConditionalLinkProps> = ({
  to,
  children,
  mouseOverFunc
}) => {
  const {pathname}=useLocation();
  const serviceInitial = pathname.split('/')[1]
  const isLink = to.split('/').includes(serviceInitial)
  
  return isLink ? (
    <Link to={to} onMouseOver={mouseOverFunc}>{children}</Link>
  ) : (
    <a href={to} onMouseOver={mouseOverFunc}>{children}</a>
  );
};

export default ConditionalLink;
