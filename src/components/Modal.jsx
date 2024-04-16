import { Button, Input, Textarea } from "./Inputs"

function ModalForm({ content, id, title, onClose, section, onCreate, onReset }) {
  return (
    <form id={id} className="grid grid-rows-[min-content,1fr,min-content] py-4 px-4 text-gray-800 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 min-w-96 min-h-48 border border-gray-400 bg-white shadow-md rounded z-10 gap-3" onReset={onReset}>
      <div className="flex justify-between">
        <h1 className="font-lg font-bold self-end">{title}</h1>
        <Button variant="close" onClick={() => onClose(section)} />
      </div>
      {content}
      <div className="flex justify-end">
        <Button content="create" variant="primary" className="ms-auto" onClick={onCreate} />
      </div>
    </form>
  )
}

function ModalLayer() {
  return (
    <div className="absolute top-0 left-0 bg-black/70 h-full w-full z-0" />
  )
}

function ExpFields({ values, onChange }) {

  return (
    <div className="grid grid-cols-2 pb-4 gap-4 border-b border-black">
      <Input id="input-exp-company" label="Company" section="experience" sectionKey="company" onChange={onChange} value={values.company} />
      <Input id="input-exp-position" label="Position" section="experience" sectionKey="position" onChange={onChange} value={values.position} />
      <Input id="input-exp-date" label="Date or Date Range" section="experience" sectionKey="date" onChange={onChange} value={values.date} />
      <Input id="input-exp-location" label="Location" section="experience" sectionKey="location" onChange={onChange} value={values.location} />
      <Input id="input-exp-website" label="Website" className="col-span-2" section="experience" sectionKey="website" onChange={onChange} value={values.website} />
      <Textarea id="input-exp-summary" label="Summary" className="col-span-2" section="experience" sectionKey="summary" onChange={onChange} value={values.summary} />
    </div>
  )
}

function EduFields({ values, section = "education", sectionKeys, onChange }) {

  return (
    <div className="grid grid-cols-2 pb-4 gap-4 border-b border-black">
      <Input id="input-edu-institution" label="Institution" onChange={() => onChange(values.institution, section, sectionKeys[0])} />
      <Input id="input-edu-type-of-study" label="Type of Study" onChange={() => onChange(values.typeOfStudy, section, sectionKeys[1])} />
      <Input id="input-edu-area-of-study" label="Area of Study" onChange={() => onChange(values.areaOfStudy, section, sectionKeys[2])} />
      <Input id="input-edu-score" label="Score" onChange={() => onChange(values.score, section, sectionKeys[3])} />
      <Input id="input-edu-date" label="Date" className="col-span-2" onChange={() => onChange(values.date, section, sectionKeys[4])} />
      <Input id="input-edu-website" label="Website" className="col-span-2" onChange={() => onChange(values.website, section, sectionKeys[5])} />
      <Textarea id="input-edu-summary" label="Summary" className="col-span-2" onChange={() => onChange(values.summary, section, sectionKeys[6])} />
    </div>
  )
}


export default function Modal({ variant = "experience", title = "Create a new item", section, show = true, onClose, onChange, values, sectionKeys, onCreate, onReset }) {
  const fields = variant === "experience" ? <ExpFields onChange={onChange} section={section} values={values} /> : <EduFields values={values} keys={sectionKeys} section={section} />;
  return (
    <div className={show ? "" : "hidden"}>
      <ModalForm content={fields} id="experience-form" title={title} onClose={onClose} section={section} onCreate={onCreate} onReset={onReset} />
      <ModalLayer />
    </div>
  )
}

