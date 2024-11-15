"use client";
import React, { useState } from "react";
import { IShows } from "@/interfaces/shows";
import { Button, Modal } from "antd";
import { DollarSign, PlaneIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { IUsersGlobalStore, useUsersGlobalStore } from "@/store/users-store";
import { PlayIcon } from "@vidstack/react/icons";

function ActionButtons({ show }: { show: IShows }) {
  const [showTrailerPlayModal, setShowTrailerPlayModal] = useState(false);
  const [showMoviePlayModal, setShowMoviePlayModal] = useState(false);
  const [episodePlayModal, setEpisodePlayModal] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<any>();
  const router = useRouter();
  const { loggedInUserData }: IUsersGlobalStore = useUsersGlobalStore as any;
  const userHasSubscriptions = loggedInUserData?.currentSubscription;

  return (
    <div className={"flex flex-col gap-5 mt-7"}>
      {!userHasSubscriptions && (
        <h1 className={"text-sm"}>Subscribe to watch this show</h1>
      )}
      <div className="flex flex-wrap gap-5">
        <Button
          icon={<PlaneIcon size={14} />}
          type={userHasSubscriptions ? "default" : "primary"}
          onClick={() => setShowTrailerPlayModal(true)}
        >
          Play Trailer
        </Button>

        {show.type === "web-series" && (
          <div className={"flex flex-col gap-5"}>
            <h1 className="text-g font-bold text-gray-500">
              Episodes ({show.episode.length}
            </h1>

            <div className="flex flex-col gap-5">
              {show.episode.map((episode: any, index: number) => (
                <div
                  className={
                    "flex justify-between border border-black border-solid p-2 rounded-sm"
                  }
                >
                  <h1 className={"text-sm"}>
                    {index + 1}. {episode.title}
                  </h1>
                  <Button
                    icon={<PlayIcon size={14} />}
                    type={"primary"}
                    onClick={() => {
                      setEpisodePlayModal(true);
                      setSelectedEpisode({
                        ...episode,
                        episodeNumber: index + 1,
                      });
                    }}
                    size={"small"}
                  >
                    Play Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {userHasSubscriptions && show.type === "movie" && (
          <Button
            icon={<PlaneIcon size={14} />}
            type={"primary"}
            onClick={() => setShowMoviePlayModal(true)}
          >
            Play Movie
          </Button>
        )}

        {userHasSubscriptions && show.type === "web-series" && (
          <Button
            icon={<PlaneIcon size={14} />}
            type={"primary"}
            onClick={() => {
              setEpisodePlayModal(true);
              setSelectedEpisode({ ...show.episode[0], episodeNumber: 1 });
            }}
          >
            Play Now
          </Button>
        )}

        {!userHasSubscriptions && (
          <Button
            icon={<DollarSign size={14} />}
            onClick={() => router.push(`/profile`)}
          >
            Subscribe now
          </Button>
        )}
      </div>

      {showTrailerPlayModal && (
        <Modal
          centered
          open={showTrailerPlayModal}
          onCancel={() => setShowTrailerPlayModal(false)}
          title={`Trailer - ${show.title}`}
          footer={null}
        >
          <MediaPlayer title={show.title} src={show.trailer}>
            <MediaProvider />
            <DefaultVideoLayout
              thumbnails={show.bannerImage}
              icons={defaultLayoutIcons}
            />
          </MediaPlayer>
        </Modal>
      )}

      {showMoviePlayModal && (
        <Modal
          centered
          open={showMoviePlayModal}
          onCancel={() => setShowMoviePlayModal(false)}
          title={`Movie - ${show.title}`}
          footer={null}
        >
          <MediaPlayer title={show.title} src={show.content}>
            <MediaProvider />
            <DefaultVideoLayout
              thumbnails={show.bannerImage}
              icons={defaultLayoutIcons}
            />
          </MediaPlayer>
        </Modal>
      )}

      {episodePlayModal && (
        <Modal
          centered
          open={episodePlayModal}
          onCancel={() => setEpisodePlayModal(false)}
          title={`${show.title} - ${selectedEpisode.title} (Episode ${selectedEpisode.episodeNumber})`}
          footer={null}
        >
          <MediaPlayer
            title={selectedEpisode.title}
            src={selectedEpisode.content}
          >
            <MediaProvider />
            <DefaultVideoLayout
              thumbnails={show.bannerImage}
              icons={defaultLayoutIcons}
            />
          </MediaPlayer>
        </Modal>
      )}
    </div>
  );
}

export default ActionButtons;
