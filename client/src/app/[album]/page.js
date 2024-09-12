import sanityClient from "../../utils/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Image from "next/image";
import classNames from 'classnames';

import Logo from "../../components/Logo";
import Gallery from "../../components/Gallery";
import pp from "../../images/pp.png";

const Album = async ({ params }) => {
  const [{ title, photos }] =
    await sanityClient.fetch(`*[_type == "album" && _id == "${params.album}"]`);

  const formattedPhotos =
    photos.map(photo => imageUrlBuilder(sanityClient).image(photo).url());

  return (
    <>
    <header
      className=
        "flex justify-center items-center w-full h-40 mx-auto"
    >
      {/* <Link href="/">
        <Logo />
      </Link> */}
      <div>
        <Link href="/?view=albums">
          <span className="opacity-40">/ albums</span>
        </Link>
        <span> / {title}</span>
      </div>
      {/* <Link
        className="relative w-[42px] h-[42px] ml-[78px]"
        href="/about"
      >
        <Image
          className="rounded-full"
          src={pp}
          alt="photographer's profile picture"
          priority={true}
        />
      </Link> */}
    </header>
    <main>
      <Gallery photos={formattedPhotos} />
    </main>
    <footer
      className="flex justify-center items-center h-40 mx-auto px-40"
    >
      Copyright © 2024 <span className="font-bold">&nbsp;Aragon Photography&nbsp;</span> - All rights reserved.
    </footer>
    </>
  )
};

export default Album;

export const revalidate = 60;