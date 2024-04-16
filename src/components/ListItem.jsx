import { SixDotsIcon } from "./Icons";

export default function List({ items = {} }) {
  const list = [];
  Object.entries(items).forEach(id => {
    list.push(<ListItem id={id} title={items[id].company} desc={items[id].position} key={id} />);
  });
  return list;
}

function ListItem({ title, desc, id, onClick }) {
  return (
    <div className="flex items-center gap-1">
      <SixDotsIcon width="24px" height="24px" />
      <button type="button" className="w-full text-start bg-gray-50 hover:bg-gray-100 rounded-sm p-1" onClick={() => onClick(id)}>
        <p className="font-bold">{title}</p>
        <p className="text-sm text-gray-700">{desc}</p>
      </button>
    </div>
  )
}
