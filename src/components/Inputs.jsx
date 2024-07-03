import { UploadIcon, DeleteIcon, CloseIcon } from './Icons';

function Label({ forId, label }) {
  return <label className="block font-medium text-sm mb-1" htmlFor={forId}>{label}</label>
}
export function Input({ id, label, className = "", type = "text", placeholder, value, onChange, sectionKey, section, required = false }) {

  // TODO: validate the input and show error message
  return (
    <div className={"w-full".concat(" ", className)}>
      <Label forId={id} label={label} />
      <input type={type} id={id} placeholder={placeholder} className="block w-full text-sm text-gray-700 border p-1 mb-0.5" value={value} onChange={(e) => onChange(e.target.value, section, sectionKey)} required={required} />
    </div>
  )
}

export function Button({ content, className, id, variant = "", onClick, type = "button" }) {
  let styles;
  const common = "rounded-sm text-sm font-medium py-1 px-3 active:scale-95 text-white";
  const primary = common.concat(" ", "bg-black active:bg-black/80");
  const danger = common.concat(" ", "bg-red-500 active:bg-red-500/80");
  const outline = "block text-sm font-medium px-4 py-1 active:underline active:bg-gray-200/20 active:border-solid";
  const close = "block m-1 p-1 border rounded-sm border-transparent active:border-black";

  switch (variant.toLowerCase()) {
    case "primary":
      styles = primary;
      break;
    case "danger":
      styles = danger;
      break;
    case "outline":
      styles = outline;
      break;
    case "close":
      styles = close;
      break;
    default:
      styles = primary;
  }

  return (
    <button type={type === "submit" ? "submit" : "button"} onClick={onClick} className={styles.concat(" ", className)} id={id}>{variant.toLowerCase() === "close" ? <CloseIcon width="12px" height="12px" /> : content}</button>
  )
}

export function Textarea({ label, className = "", id, value, onChange, sectionKey, section }) {
  return (
    <div className={className}>
      <Label forId={id} label={label} />
      <textarea rows="4" className="block p-1 resize-none text-sm text-gray-700 border w-full" id={id} value={value} onChange={(e) => onChange(e.target.value, section, sectionKey)} />
    </div>
  )
}

export function RangeInput({ value, id, onChange, className = "", label = "Level", section, sectionKey }) {
  return (
    <div className={className}>
      <Label forId={id} label={label} />
      <div className="flex gap-2">
        <input type="range" id={id} value={value} onChange={() => onChange(value, section, sectionKey)} max="5" />
        <span>{value}</span>
      </div>
    </div>
  )
}

export function AvatarInput({ id, className = "", inputClassName = "", value = "", onFileClick, onFileChange, onChange, sectionKey, section }) {
  let icon;
  if (value)
    icon = <DeleteIcon width="12px" height="12px" fill="#ffffff" />
  else
    icon = <UploadIcon widht="12px" height="12px" fill="#ffffff" />

  return (
    <div className={"flex gap-3".concat(" ", className)}>
      <div>
        <label className="avatar relative block overflow-hidden w-[60px] h-[60px] rounded-full" htmlFor={id}>
          <div className="absolute h-full w-full bg-gray-200"><img className="w-full h-full object-cover" src={value} alt="avatar" /></div>
          <div className="avatar-hover absolute z-10 h-full w-full bg-gray-900/50 justify-center items-center cursor-pointer" title={value ? "delete" : "upload"}>{icon}</div>
        </label>
        <input id={id} onClick={(e) => onFileClick(e, section, sectionKey)} onChange={(e) => onFileChange(e.target.files[0], section, sectionKey)} className="hidden" type="file" accept="image/png, image/jpeg" />
        <style> {`
        .avatar {
          --show-icon: none;
        }
        .avatar:hover {
          --show-icon: flex;
        }
        .avatar-hover {
          display: var(--show-icon);
        }
      `}
        </style>
      </div>
      <Input className={inputClassName} label="Picture" value={value} placeholder="https://..." section={section} sectionKey={sectionKey} onChange={onChange} />
    </div>
  )
}
