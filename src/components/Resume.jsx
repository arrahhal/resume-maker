import { PhoneIcon, EmailIcon, WebsiteIcon, AddressIcon } from "./Icons";

function ContactEntry({ iconName, content, url, fill }) {
  const width = "12px";
  const height = "12px";
  let icon = "";

  switch (iconName) {
    case "phone": icon = <PhoneIcon width={width} height={height} fill={fill} />;
      break;
    case "email": icon = <EmailIcon width={width} height={height} fill={fill} />;
      break;
    case "website": icon = <WebsiteIcon width={width} height={height} fill={fill} />;
      break;
    case "address": icon = <AddressIcon width={width} height={height} fill={fill} />
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

function Title({ content, accentColor }) {
  return <p className="font-bold font-mono text-xl max-sm:text-lg" style={{ color: accentColor }}>{content}</p>
}

// i didnt knonw what to call it. i will change this when i need to
function Item({ title, subtitle, date, additionalInfo, url, body }) {
  return (
    <div className="mb-2">
      <div className="mb-2">
        <div className="flex mb-1">
          <div>
            <p className="font-bold text-lg max-sm:text-base">{title}</p>
            <p className="font-bold">{subtitle}</p>
          </div>
          <div className="flex-1" />
          <div className="italic max-sm:text-sm">
            <p className="mb-1">{date}</p>
            <p className="mb-1">{additionalInfo}</p>
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

function List({ content = [], listTitle = "", accentColor }) {
  return (
    <div>
      {content.length !== 0 && <Title content={listTitle} accentColor={accentColor} />}
      {content.map((entry, index) => {
        if (typeof entry !== 'object') return null;
        const {
          company = '',
          institution = '',
          position = '',
          typeOfStudy = '',
          website = '',
          date = '',
          location = '',
          areaOfStudy = '',
          summary = ''
        } = entry;
        const title = company || institution;
        const subtitle = position || typeOfStudy;
        const additionalInfo = location || areaOfStudy;
        return (
          <Item
            key={index}
            title={title}
            subtitle={subtitle}
            url={website}
            date={date}
            additionalInfo={additionalInfo}
            body={summary}
          />
        );
      })}
    </div>
  )
}

export default function Resume({ basics, experience, education, accentColor }) {
  return (
    <div className="p-4 border flex flex-col gap-6 overflow-y-auto" id="resume">

      <div className="grid grid-rows-[1fr,auto] grid-cols-[auto,1fr] gap-2 pb-4 border-b max-xs:grid-cols-[auto,1fr]" style={{ borderBottomColor: accentColor }}>
        <div className="row-span-2 bg-gray-400 flex items-center justify-center w-20 aspect-square max-xs:row-span-1">
          <img className="object-cover w-full h-full" src={basics.picture} alt="avatar" />
        </div>
        <div>
          <p className="font-bold text-lg">{basics.fullName}</p>
          <p>{basics.headline}</p>
        </div>
        <div className="flex gap-4 items-center max-xs:col-span-2">
          {basics.address && <ContactEntry iconName="address" content={basics.address} fill={accentColor} />}
          {basics.phone && <ContactEntry iconName="phone" content={basics.phone} fill={accentColor} />}
          {basics.email && <ContactEntry iconName="email" content={basics.email} url={`mailto:${basics.email}`} fill={accentColor} />}
          {basics.website && <ContactEntry iconName="website" content={basics.website} url={basics.website} fill={accentColor} />}
        </div>
      </div>

      {basics.summary && (
        <div>
          <Title content="Summary" accentColor={accentColor} />
          <p className="whitespace-pre-line">{basics.summary}</p>
        </div>
      )}
      <List content={experience} listTitle="Experience" accentColor={accentColor} />
      <List content={education} listTitle="Education" accentColor={accentColor} />
    </div>
  )
}
