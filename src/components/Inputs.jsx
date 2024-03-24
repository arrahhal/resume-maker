import { UploadIcon, DeleteIcon, CloseIcon } from './Icons';

function Label({ forId, label }) {
  return <label className="block font-medium text-sm mb-1" htmlFor={forId}>{label}</label>
}
export function Input({ id, label, className = "", type, placeholder, value, onChange, sectionKey, section }) {
  return (
    <div className={"w-full".concat(" ", className)}>
      <Label forId={id} label={label} />
      <input type={type} id={id} placeholder={placeholder} className="block w-full text-sm text-gray-700 border p-1 mb-0.5" value={value} data-key={sectionKey} data-section={section} onChange={onChange} />
    </div>
  )
}

export function Button({ content, className, id, variant = "", onClick }) {
  let styles;
  const common = "text-sm font-medium p-1 m-1 active:scale-95 text-white rounded-sm max-w-min";
  const primary = common + " bg-blue-500 active:bg-blue-500/80";
  const danger = common + " bg-red-500 active:bg-red-500/80";
  const outline = "block text-sm font-medium px-4 py-1 active:underline active:bg-gray-200/20 active:border-solid";
  const close = "p-1 border rounded-sm border-transparent active:border-black";

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
      content = <CloseIcon width="12px" height="12px" />
      break;
    default:
      styles = primary;
  }

  return (
    <button onClick={() => onClick()} className={styles.concat(" ", className)} id={id}>{content}</button>
  )
}

export function Textarea({ label, className = "", id, value, onChange, sectionKey, section }) {
  return (
    <div className={className}>
      <Label forId={id} label={label} />
      <textarea rows="4" className="block p-1 resize-none text-sm text-gray-700 border w-full" id={id} value={value} data-section={section} data-key={sectionKey} onChange={onChange}></textarea>
    </div>
  )
}

export function RangeInput({ value, id, className = "", label = "Level" }) {
  return (
    <div className={className}>
      <Label forId={id} label={label} />
      <div className="flex gap-2">
        <input type="range" id={id} value={value} onChange={() => onChange()} max="5" />
        <span>{value}</span>
      </div>
    </div>
  )
}

export function AvatarInput({ id, uploaded = false, className = "", inputClassName = "", value = "", onChange }) {
  let icon;
  if (uploaded)
    icon = <DeleteIcon width="12px" height="12px" />
  else
    icon = <UploadIcon widht="12px" height="12px" />

  return (
    <div className={"flex gap-3".concat(" ", className)}>
      <div>
        <label className="avatar relative block overflow-hidden w-[60px] h-[60px] rounded-full" htmlFor={id}>
          <div className="absolute h-full w-full bg-gray-200"></div>
          <div className="avatar-hover absolute z-10 h-full w-full bg-gray-900/50 justify-center items-center cursor-pointer" title={uploaded ? "delete" : "upload"}>{icon}</div>
        </label>
        <input id={id} value={value} onChange={() => onChange()} className="hidden" type="file" accept="image/png, image/jpeg" />
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
      <Input className={inputClassName} label="Picture" value={value} placeholder="https://..." />
    </div>
  )
}
