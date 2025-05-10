import React from "react";
import Link from "next/link";

const Header = () => {
    return (
        <header>
            <Link href={"./uploadPage"}>uploadPage</Link>
            <Link href={"./"}>Home</Link>
        </header>
    );
};

export default Header;
