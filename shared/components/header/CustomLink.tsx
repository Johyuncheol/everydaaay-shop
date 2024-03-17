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
  const nowService= pathname.split('/')[1];
  const toService= to.split('/')[1]
  const isLink = nowService===toService;
  const toHref = `https://${toService ? toService+'.' : ''}everydaaay.com${to}`
  
  return isLink ? (
    <Link to={to} onMouseOver={mouseOverFunc}>{children}</Link>
  ) : (
    <a href={toHref} onMouseOver={mouseOverFunc}>{children}</a>
  );
};

export default ConditionalLink;
