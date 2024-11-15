import React from "react";
import { ShowFormStepsProps } from "@/app/admin/shows/_common/show-form/index";
import {Button, Form, Input, Select} from "antd";
import {useRouter} from "next/navigation";
function Basic({activeStep, setActiveStep, showFromData, setShowFromData}: ShowFormStepsProps) {
  let disableNextButton = false;
  if(!showFromData.title || !showFromData.type || !showFromData.genre || !showFromData.durationInMinutes) {
    disableNextButton = true;
  }
  const router = useRouter();
  return (
    <div className={"flex flex-col gap-5"}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Form.Item label={"Title"} required>
          <Input value={showFromData.title}  onChange={(e) => setShowFromData({...showFromData, title: e.target.value})}/>
        </Form.Item>
        <Form.Item label={"Type"} required>
          <Select value={showFromData.type}  onChange={(value) => setShowFromData({...showFromData, type: value})}>
            <Select.Option value={"movie"}>Movie</Select.Option>
            <Select.Option value={"web-series"}>Web Series</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={"Genre"} required>
          <Select value={showFromData.genre}  onChange={(value) => setShowFromData({...showFromData, genre: value})}>
            <Select.Option value={"action"}>Action</Select.Option>
            <Select.Option value={"comedy"}>Comedy</Select.Option>
            <Select.Option value={"drama"}>Drama</Select.Option>
            <Select.Option value={"romance"}>Romance</Select.Option>
            <Select.Option value={"thriller"}>Thriller</Select.Option>
            <Select.Option value={"horror"}>Horror</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <Form.Item label={"Description"}>
        <Input.TextArea value={showFromData.title}  onChange={(e) => setShowFromData({...showFromData, description: e.target.value})} />
      </Form.Item>

      <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"}>
        <Form.Item label={"Thearitical Release Date"}>
          <Input type"date" value={showFromData.theatricalReleaseDate}  onChange={(e) => setShowFromData({...showFromData, theatricalReleaseDate: e.target.value})}/>
        </Form.Item>

        <Form.Item label={"OTT Release Date"}>
          <Input type"date" value={showFromData.ottReleaseDate}  onChange={(e) => setShowFromData({...showFromData, ottReleaseDate: e.target.value})}/>
        </Form.Item>

        <Form.Item label={"Duration In Minutes"} required>
          <Input type"date" value={showFromData.durationInMinutes}  onChange={(e) => setShowFromData({...showFromData, durationInMinutes: e.target.value})}/>
        </Form.Item>
      </div>

      <div className="flex justify-end gap-7">
        <Button onClick={() => router.push("/admin/shows")}>Cancel</Button>
        <Button type={"primary"} onClick={() => setActiveStep(activeStep + 1)} disabled={disableNextButton}>Next</Button>
      </div>
    </div>
  );
}

export default Basic;
