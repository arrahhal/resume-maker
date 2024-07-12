import { UploadIcon, DeleteIcon, CloseIcon } from './Icons';

function Label({ forId, label }) {
  return <label className="block font-medium mb-1" htmlFor={forId}>{label}</label>
}

export function Input({ id, label, className = "", type = "text", placeholder, value, onChange, sectionKey, section, required = false }) {
  // TODO: validate the input and show error message
  return (
    <div className={`w-full ${className}`}>
      <Label forId={id} label={label} />
      <input type={type} id={id} placeholder={placeholder} className="block w-full text-gray-700 border p-1 mb-0.5" value={value} onChange={(e) => onChange(e.target.value, section, sectionKey)} required={required} />
    </div>
  )
}

export function Button({
  content,
  className = '',
  id,
  variant = '',
  onClick,
  type = 'button',
  icon = <div />,
}) {
  const common = "rounded-sm font-medium py-1 px-3 active:scale-95 text-white";
  const primary = `${common} bg-black active:bg-black/80`;
  const danger = `${common} bg-red-500 active:bg-red-500/80`;
  const outline = "block font-medium px-4 py-1 active:underline active:bg-gray-200/20 active:border-solid";
  const close = "block m-1 p-1 border rounded-sm border-transparent active:border-black";
  const iconic = "flex items-center justify-between border border-black";
  const iconicContent = (
    <>
      <div className="bg-gray-200">{content}</div>
      <div className="bg-gray-400">{icon}</div>
    </>
  );

  const getButtonStyles = () => {
    switch (variant.toLowerCase()) {
      case 'primary':
        return primary;
      case 'danger':
        return danger;
      case 'outline':
        return outline;
      case 'close':
        return close;
      case 'iconic':
        return iconic;
      default:
        return primary;
    }
  };

  const renderButtonContent = () => {
    if (variant.toLowerCase() === 'close') {
      return <CloseIcon width="12px" height="12px" />;
    }
    if (variant === 'iconic') {
      return iconicContent;
    }
    return content;
  };

  const styles = getButtonStyles();

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      className={`${styles} ${className}`}
      id={id}
    >
      {renderButtonContent()}
    </button>
  );
}

export function Textarea({ label, className = "", id, value, onChange, sectionKey, section }) {
  return (
    <div className={className}>
      <Label forId={id} label={label} />
      <textarea rows="4" className="block p-1 resize-none text-gray-700 border w-full" id={id} value={value} onChange={(e) => onChange(e.target.value, section, sectionKey)} />
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
