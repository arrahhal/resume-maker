import { Button, Input, Textarea } from "./Inputs"

function ModalForm({ content, id, title, onClose, section, onCreate, onReset, editForm, onUpdate, onDelete, entryId }) {
  return (
    <form id={id} className="grid grid-rows-[min-content,1fr,min-content] py-4 px-4 text-gray-800 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2  w-[30rem] border border-gray-400 bg-white shadow-md rounded z-10 gap-3 max-md:w-[24rem] max-sm:max-w-full" onReset={onReset}>
      <div className="flex justify-between">
        <h1 className="font-lg font-bold self-end">{title}</h1>
        <Button variant="close" onClick={() => onClose(section)} />
      </div>
      {content}
      <div className="flex justify-end gap-2">
        {editForm &&
          <>
            <Button content="delete" variant="danger" onClick={() => onDelete(entryId, section)} />
            <Button content="update" variant="primary" onClick={() => onUpdate(entryId, section)} />
          </>
        }
        {!editForm &&
          <Button content="create" variant="primary" onClick={onCreate} />
        }
      </div>
    </form>
  )
}

function ModalLayer() {
  return (
    <div className="absolute top-0 left-0 bg-black/70 h-full w-full z-0" />
  )
}

function ExpFields({ values, onChange, section }) {
  return (
    <div className="grid grid-cols-2 pb-4 gap-4 border-b border-black">
      <Input id="input-exp-company" label="Company" section={section} sectionKey="company" onChange={onChange} value={values.company} required />
      <Input id="input-exp-position" label="Position" section={section} sectionKey="position" onChange={onChange} value={values.position} />
      <Input id="input-exp-date" label="Date or Date Range" section={section} sectionKey="date" onChange={onChange} value={values.date} />
      <Input id="input-exp-location" label="Location" section={section} sectionKey="location" onChange={onChange} value={values.location} />
      <Input id="input-exp-website" type="url" label="Website" className="col-span-2" section={section} sectionKey="website" onChange={onChange} value={values.website} placeholder="https://" />
      <Textarea id="input-exp-summary" label="Summary" className="col-span-2" section={section} sectionKey="summary" onChange={onChange} value={values.summary} />
    </div>
  )
}

function EduFields({ values, onChange, section }) {
  return (
    <div className="grid grid-cols-2 pb-4 gap-4 border-b border-black">
      <Input id="input-edu-institution" label="Institution" section={section} sectionKey="institution" onChange={onChange} value={values.institution} />
      <Input id="input-edu-type-of-study" label="Type of Study" section={section} sectionKey="typeOfStudy" onChange={onChange} value={values.typeOfStudy} />
      <Input id="input-edu-area-of-study" label="Area of Study" section={section} sectionKey="areaOfStudy" onChange={onChange} value={values.areaOfStudy} />
      <Input id="input-edu-score" label="Score" section={section} sectionKey="score" onChange={onChange} value={values.score} />
      <Input id="input-edu-date" label="Date" section={section} sectionKey="date" className="col-span-2" onChange={onChange} value={values.date} />
      <Input id="input-edu-website" label="Website" section={section} sectionKey="website" className="col-span-2" onChange={onChange} value={values.website} />
      <Textarea id="input-edu-summary" label="Summary" section={section} sectionKey="summary" className="col-span-2" onChange={onChange} value={values.summary} />
    </div>
  )
}


export default function Modal({ variant = "experience", section, show = false, onClose, onChange, values, onCreate, onReset, editForm, onUpdate, onDelete }) {
  let fields;

  switch (variant) {
    case "experience": fields = <ExpFields onChange={onChange} section={section} values={values} />;
      break;
    case "education": fields = <EduFields values={values} section={section} onChange={onChange} />;
      break;
    default: fields = <ExpFields onChange={onChange} section={section} values={values} />;
  }
  return (
    <div className={`${show ? "" : "hidden"} max-md:text-sm`}>
      <ModalForm content={fields} id={`${section}- form`} title={editForm ? "Edit an item" : "Create a new item"} onClose={onClose} section={section} onCreate={onCreate} onReset={onReset} editForm={editForm} onDelete={onDelete} onUpdate={onUpdate} entryId={values.id} />
      <ModalLayer />
    </div>
  )
}

