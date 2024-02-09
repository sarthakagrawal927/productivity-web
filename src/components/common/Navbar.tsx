import React from 'react';

const menuItems = [
  { label: "Habits", href: "/habit" },
  { label: "Todo", href: "/todo" },
  { label: "Journal", href: "/journal" },
  { label: "Profile", href: "/profile" },
  { label: "Relations", href: "/relations" },
];

const Navbar = () => {

  const NavItems = () => {
    return <>
      {menuItems.map(({ href, label }, index) => (
        <li key={`${href}_${index}`} className='font-bold	'><a href={href}>{label}</a></li>
      ))}
    </>
  }


  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="navbar-start">
        <div className="dropdown bg-primary ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-neutral-content">
            <NavItems />
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">SignificantHobbies</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavItems />
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Logout</a>
      </div>
    </div>
  );
};

export default Navbar;