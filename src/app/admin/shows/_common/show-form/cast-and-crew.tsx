import React from "react";
import { ShowFormStepsProps } from "@/app/admin/shows/_common/show-form/index";
import { Button, Form, Input } from "antd";

function CastAndCrew({
  activeStep,
  setActiveStep,
  showFromData,
  setShowFromData,
}: ShowFormStepsProps) {
  const disableNextButton = showFromData?.castAndCrew?.some(
    (person: any) => !person.name || !person.role,
  );

  const addNewHandler = () => {
    const existingCastAndCrew = showFromData.castAndCrew || [];
    existingCastAndCrew.push({
      name: "",
      role: "",
      imageUrl: "",
    });
    setShowFromData({ ...showFromData, castAndCrew: existingCastAndCrew });
  };

  const onCastAndCrewChanged = (index: number, key: string, value: string) => {
    const newCastAndCrew = [...showFromData.castAndCrew];
    newCastAndCrew[index][key] = value;
    setShowFromData({ ...showFromData, castAndCrew: newCastAndCrew });
  };

  const onCastAndCrewDeleted = (index: number) => {
    const newCastAndCrew = [...showFromData.castAndCrew];
    newCastAndCrew.splice(index, 1);
    setShowFromData({ ...showFromData, castAndCrew: newCastAndCrew });
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={addNewHandler}>Add new</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
        {showFromData?.castAndCrew?.map((person: any, index: number) => (
          <div
            className={
              "flex flex-col gap-5 border border-solid border-black p-3 rounded"
            }
          >
            <div className={"flex items-center justify-between"}>
              <h1 className={"text-gray-500 font-semibold text-sm"}>
                {index + 1}
              </h1>
              <Button
                size={"small"}
                onClick={() => onCastAndCrewDeleted(index)}
              >
                Delete
              </Button>
            </div>
            <Form.Item label={"Name"} required>
              <Input
                value={person.name}
                onChange={(e) =>
                  onCastAndCrewChanged(index, "name", e.target.value)
                }
              />
            </Form.Item>

            <Form.Item label={"Role"} required>
              <Input
                value={person.role}
                onChange={(e) =>
                  onCastAndCrewChanged(index, "role", e.target.value)
                }
              />
            </Form.Item>

            <Form.Item label={"Image URL"}>
              <Input
                value={person.imageUrl}
                onChange={(e) =>
                  onCastAndCrewChanged(index, "imageUrl", e.target.value)
                }
              />
            </Form.Item>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-7 mt-10">
        <Button onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
        <Button
          type={"primary"}
          onClick={() => setActiveStep(activeStep + 1)}
          disabled={disableNextButton}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default CastAndCrew;
