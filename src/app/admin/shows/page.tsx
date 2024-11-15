import React from "react";
import PageTitle from "@/components/page-title";
import LinkButton from "@/components/link-button";
import { getAllShows } from "@/server-actions/shows";
import ShowsTable from "@/app/admin/shows/_common/shows-table";

async function ShowsList() {
  const showsResponse = await getAllShows();
  const shows = showsResponse.data;
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title={"Shows"} />
        <LinkButton title={"Add show"} path={"/admin/show/add"}>
          Link Button
        </LinkButton>
      </div>

      <ShowsTable shows={shows} />
    </div>
  );
}

export default ShowsList;
