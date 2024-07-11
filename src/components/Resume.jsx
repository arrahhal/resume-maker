import { PhoneIcon, EmailIcon, WebsiteIcon, AddressIcon } from "./Icons";

function ContactEntry({ iconName, content, url }) {
  const width = "12px";
  const height = "12px";
  let icon = "";

  switch (iconName) {
    case "phone": icon = <PhoneIcon width={width} height={height} />;
      break;
    case "email": icon = <EmailIcon width={width} height={height} />;
      break;
    case "website": icon = <WebsiteIcon width={width} height={height} />;
      break;
    case "address": icon = <AddressIcon width={width} height={height} />
      break;
    default: icon = <div width={width} height={width} />
  }

  const entry = (
    <div className="flex items-center gap-1">
      {icon}
      <span className="text-xs">{content}</span>
    </div>
  )
  return (
    url ? <a href={url} target="_blank" rel="noreferrer">{entry}</a> : entry
  )
}

function Title({ content }) {
  return <p className="font-bold font-mono text-xl">{content}</p>
}

// i didnt knonw what to call it. i will change this when i need to
function Item({ title, subtitle, date, location, url, body }) {
  return (
    <div>
      <div className="mb-2">
        <div className="flex mb-1">
          <div>
            <p className="font-bold text-lg">{title}</p>
            <p className="font-bold">{subtitle}</p>
          </div>
          <div className="flex-1" />
          <div className="italic">
            <p className="mb-1">{date}</p>
            <p className="mb-1">{location}</p>
          </div>
        </div>
        {url &&
          <ContactEntry iconName="website" content={url} url={url} />
        }
      </div>
      <div>
        <p>{body}</p>
      </div>
    </div>
  )
}

function List({ content = [] }) {
  return (
    <div>
      {content.length !== 0 &&
        <Title content="Experience" />
      }
      {content.map(entry =>
        <Item title={entry.company} subtitle={entry.position} url={entry.website} date={entry.date} location={entry.location} body={entry.summary} />
      )}
    </div>
  )
}

export default function Resume({ basics, experience }) {
  return (
    <div className="p-4 text-sm border flex flex-col gap-4">
      <div className="flex gap-2 pb-4 border-b border-black">
        <div className="bg-gray-400 flex items-center justify-center w-20 aspect-square">
          <img className="object-cover w-full h-full" src={basics.picture} alt="avatar" />
        </div>
        <div className="text-xs flex-1 flex flex-col gap-2 justify-center">
          <div>
            <p className="font-bold text-base">{basics.fullName}</p>
            <p>{basics.headline}</p>
          </div>
          <div className="flex gap-4">
            {basics.address && <ContactEntry iconName="address" content={basics.address} />}
            {basics.phone && <ContactEntry iconName="phone" content={basics.phone} />}
            {basics.email && <ContactEntry iconName="email" content={basics.email} url={`mailto:${basics.email}`} />}
            {basics.website && <ContactEntry iconName="website" content={basics.website} url={basics.website} />}
          </div>
        </div>
      </div>
      {basics.summary && (
        <div>
          <Title content="Summary" />
          <p className="whitespace-pre-line">{basics.summary}</p>
        </div>
      )}
      <List content={experience} />
    </div>
  )
}
