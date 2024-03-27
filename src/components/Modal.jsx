import { Button, Input, Textarea } from "./Inputs"

export default function Modal({ variant = "experience", title = "Create a new item", section, sectionId, show = true, onClose, onChange }) {
  const ids = [
    ["exp-form", "edu-form"],
    ["exp-company", "edu-institution"],
    ["exp-position", "edu-type-of-study"],
    ["exp-date", "edu-area-of-study"],
    ["exp-location", "edu-score"],
    ["exp-website", "edu-date"],
    ["exp-summary", "edu-summary"],
    ["", "edu-website"],
  ];

  const labels = [
    ["", ""],
    ["Company", "Institution"],
    ["Position", "Type of Stody"],
    ["Date or Date Range", "Area of Study"],
    ["Location", "Score"],
    ["Website", "Date or Date Range"],
    ["", "Website"],
    ["Summary", "Summary"],
  ];

  const keys = [
    ["", ""],
    ["company", "institution"],
    ["position", "typeOfStudy"],
    ["date", "areaOfStudy"],
    ["location", "date"],
    ["website", "date"],
    ["", "website"],
    ["summary", "summary"],
  ]

  let index = 0;
  switch (variant) {
    case "experience":
      index = 0;
      break;
    case "education":
      index = 1;
      break;
    default:
      index = 0;
  }

  // TODO: pass the sectoin and sectoinId and sectionKey with args haldeInputChange instead of dataset
  return (
    <div className={show ? "" : "hidden"}>
      <form id={ids[index][0]} className="grid grid-rows-[min-content,1fr,min-content] py-4 px-4 text-gray-800 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 min-w-96 min-h-48 border border-gray-400 bg-white shadow-md rounded z-10 gap-3">
        <div className="flex justify-between">
          <h1 className="font-lg font-bold self-end">{title}</h1>
          <Button variant="close" onClick={() => onClose(section)} />
        </div>
        <div className="grid grid-cols-2 pb-4 gap-4 border-b border-black">
          <Input type="text" id={ids[1][index]} label={labels[1][index]} onChange={(e) => onChange(e.target.value, section, keys[1][index])} />
          <Input type="text" id={ids[2][index]} label={labels[2][index]} onChange={(e) => onChange(e.target.value, section, keys[2][index])} />
          <Input type="text" id={ids[3][index]} label={labels[3][index]} onChange={(e) => onChange(e.target.value, section, keys[3][index])} />
          <Input type="text" id={ids[4][index]} label={labels[4][index]} onChange={(e) => onChange(e.target.value, section, keys[4][index])} />
          <Input type="text" id={ids[5][index]} label={labels[5][index]} className="col-span-2" onChange={(e) => onChange(e.target.value, section, keys[5][index])} />
          {variant === "education" && <Input type="text" id={ids[6][index]} label={labels[6][index]} className="col-span-2" onChange={(e) => onChange(e.target.value, section, keys[6][index])} />}
          <Textarea id={ids[7][index]} label={labels[7][index]} className="col-span-2" onChange={(e) => onChange(e.target.value, section, keys[7][index])} />
        </div>
        <div className="flex justify-end">
          <Button type="submit" content="create" variant="primary" className="ms-auto" />
        </div>
      </form>
      <div className="absolute top-0 left-0 bg-black/70 h-full w-full z-0" />
    </div>
  )
}
