import React from "react";
import { ShowFormStepsProps } from "@/app/admin/shows/_common/show-form/index";
import { Button, Form, Input, Upload } from "antd";
import { a } from "@clerk/clerk-react/dist/useAuth-DT1ot2zi";

function Media({
  activeStep,
  setActiveStep,
  showFromData,
  setShowFromData,
  loading,
}: ShowFormStepsProps) {
  const addNewEpisodeHandler = () => {
    const newEpisodes = showFromData.episodes || [];
    newEpisodes.push({
      title: "",
      content: "",
    });
    setShowFromData({ ...showFromData, episodes: newEpisodes });
  };

  const onEpisodeDelete = (index: number) => {
    const newEpisodes = [...showFromData.episodes];
    newEpisodes.splice(index, 1);
    setShowFromData({ ...showFromData, episodes: newEpisodes });
  };

  const onEpisodeChange = (index: number, key: string, value: any) => {
    const newEpisodes = [...showFromData.episodes];
    newEpisodes[index][key] = value;
    setShowFromData({ ...showFromData, episodes: newEpisodes });
  };

  const disableNextButton = showFromData?.episodes?.some(
    (episode: any) => !episode.title || !episode.content,
  );

  const getFilesListArray = (fileOrUrl: any) => {
    if (!fileOrUrl) {
      return [];
    }
    if (typeof fileOrUrl === "string") {
      return [{ url: fileOrUrl }];
    }
    return [{ ...fileOrUrl, url: URL.createObjectURL(fileOrUrl) }];
  };

  return (
    <div>
      <h1 className="text-lg font-bold">Promotional Content</h1>
      <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div>
          <span>Main Image</span>
          <Upload
            listType={"picture-card"}
            beforeUpload={(file) => {
              setShowFromData({ ...showFromData, mainImage: file });
            }}
            accept={"image/*"}
            maxCount={1}
            fileList={getFilesListArray(showFromData.mainImage)}
          >
            <div className="text-xs">
              {showFromData.mainImage ? "Change" : "Upload"}
            </div>
          </Upload>
        </div>
      </div>

      <div>
        <span>Banner Image</span>
        <Upload
          listType={"picture-card"}
          beforeUpload={(file) => {
            setShowFromData({ ...showFromData, bannerImage: file });
            return false;
          }}
          accept={"video/*"}
          maxCount={1}
          fileList={getFilesListArray(showFromData.bannerImage)}
        >
          <div className="text-xs">
            {showFromData.trailer ? "Change" : "Upload"}
          </div>
        </Upload>
      </div>

      <div>
        <span>Trailer</span>
        <Upload
          listType={"picture-card"}
          beforeUpload={(file) => {
            setShowFromData({ ...showFromData, trailer: file });
            return false;
          }}
          accept={"image/*"}
          maxCount={1}
          fileList={getFilesListArray(showFromData.trailer)}
        >
          <div className="text-xs">
            {showFromData.bannerImage ? "Change" : "Upload"}
          </div>
        </Upload>
      </div>

      <h1 className="text-lg font-bold mt-10">Main Content</h1>

      {showFromData.type === "movie" && (
        <div className={"mt-7"}>
          <span>Movie Content</span>
          <Upload
            listType={"picture-card"}
            beforeUpload={(file) => {
              setShowFromData({ ...showFromData, content: file });
              return false;
            }}
            accept={"video/*"}
            maxCount={1}
            fileList={getFilesListArray(showFromData.content)}
          >
            <div className="text-xs">
              {showFromData.bannerImage ? "Change" : "Upload"}
            </div>
          </Upload>
        </div>
      )}

      {showFromData.type === "web-series" && (
        <div>
          <div className="flex justify-end">
            <Button onClick={addNewEpisodeHandler}>Add Episode</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
            {showFromData?.episodes?.map((episode: any, index: number) => (
              <div
                className={
                  "flex flex-col gap-5 border border-solid border-black p-3 rounded"
                }
              >
                <div className={"flex items-center justify-between"}>
                  <h1 className={"text-gray-500 font-bold text-sm"}>
                    Episode - {index + 1}
                  </h1>
                  <Button size={"small"} onClick={() => onEpisodeDelete(index)}>
                    Delete
                  </Button>
                </div>
                <Form.Item label={"Title"} required>
                  <Input
                    value={episode.title}
                    onChange={(e) =>
                      onEpisodeChange(index, "title", e.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item label={"Content"} required>
                  <Upload
                    listType={"picture-card"}
                    beforeUpload={(file) => {
                      onEpisodeChange(index, "content", file);
                      return false;
                    }}
                    accept={"video/*"}
                    fileList={getFilesListArray(episode.content)}
                  >
                    <div className="text-xs">
                      {episode.content ? "Change" : "Upload"}
                    </div>
                  </Upload>
                </Form.Item>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-7">
        <Button onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
        <Button
          type={"primary"}
          disabled={disableNextButton}
          htmlType={"submit"}
          loading={loading}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Media;
