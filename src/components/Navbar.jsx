import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="">
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/Products/page">Nuestros Productos</Link>
          </li>
          <li>
            <Link href="/AboutUs/page">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;