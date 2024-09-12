import Image from "next/image";

import logo from "../../images/logo.svg";

const Logo = () => <Image src={logo} alt="logo" priority={true} />;

export default Logo;
