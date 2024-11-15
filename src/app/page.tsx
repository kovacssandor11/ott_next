import { getAllShows } from "@/server-actions/shows";
import { IShows } from "@/interfaces/shows";
import Link from "next/link";
import SearchShows from "@/components/search";

export default async function Home({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const showsResponse = await getAllShows(searchParams.query);
  const shows: IShows[] = showsResponse.data;
  return (
    <div>
      <SearchShows />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-7">
        {shows.map((show: IShows) => (
          <Link href={`/show/${show._id}`}>
            <div>
              <img
                src={show.mainImage}
                alt={show.title}
                className={"w-full h-48 object-cover rounded"}
              />
              <h1 className="text-sm font-semibold">
                {show.title} ({show.type})
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
