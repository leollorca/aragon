import sanityClient from "../utils/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import classNames from 'classnames';

import Logo from "../components/Logo";
import Switch from "../components/Switch";
import Gallery from "../components/Gallery";

import pp from "../images/pp.png";

const Home = async ({_, searchParams}) => {
  const data = await sanityClient.fetch('*[_type in ["collection", "album"]]');

  const { photos } = data.find(item => item._type === "collection");
  const albums = data.filter(item => item._type === "album");

  const formattedCollection =
    photos.map(photo => imageUrlBuilder(sanityClient).image(photo).url());

  const formattedAlbums = albums.map(album => {
    return {
      title: album.title,
      id: album._id,
      publicationDate: album._createdAt,
      cover: imageUrlBuilder(sanityClient).image(album.photos[0]).url(),
      length: album.photos.length,
    }
  });

  return (
    <>
    <header
      className=
        "flex justify-center items-center w-full h-40 mx-auto"
    >
      {/* <Link href="/">
        <Logo />
      </Link> */}
      <Switch view={searchParams.view} />
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
      {!searchParams.view || searchParams.view === "collection"
          ? <Gallery photos={formattedCollection} />
          : <ul className={
              classNames(
                "grid grid-cols-2 gap-8 w-[1600px] mx-auto",
                "max-[1920px]:w-[calc(100%-320px)]",
                "max-[1376px]:grid-cols-1",
                "max-[832px]:w-[calc(100%-64px)]"
              )}
            >
              {formattedAlbums.map(({ id, title, cover, length}, index) => (
                <Link href={`/${id}`} key={index}>
                  <li className="relative w-full aspect-square">
                    <Image
                      style={{objectFit:"cover"}}
                      src={cover}
                      alt={`cover of ${title}'s album`}
                      fill={true}
                      priority={true}
                    />
                    <h2 className={
                      classNames(
                        "absolute flex items-center bottom-[32px] left-[32px]",
                        // "h-8 px-4 leading-none rounded bg-white",
                        "text-white leading-none font-bold"
                      )}
                    >
                      {title}
                    </h2>
                    <div className={
                      classNames(
                        "absolute bottom-[32px] right-[32px]",
                        "text-white leading-none"
                      )}
                    >
                      {length} photos
                    </div>
                  </li>
                </Link>
              ))}
            </ul>}
    </main>
    <footer className={
      classNames(
        "flex justify-center items-center w-full h-40 mx-auto px-[160px]"
      )}
    >
      Copyright © 2024 <span className="font-bold">&nbsp;Aragon Photography&nbsp;</span> - All rights reserved.
    </footer>
    </>
  )
};

export default Home;

export const revalidate = 60;