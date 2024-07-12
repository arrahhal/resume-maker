import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import { Input, Textarea, AvatarInput } from './components/Inputs';
import Legend from "./components/Styled";
import Resume from './components/Resume';
import Modal from "./components/Modal";
import ListFieldset from "./components/List";

const init = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : {
  basics: {
    picture: '',
    fullName: "John Doe",
    headline: "gamer and youtuber, loves anime and time wasting",
    phone: "+1 222 333 444",
    email: "hello@john.doe",
    website: "johndoe.me",
    address: "Moon/Mars and whats beyond",
    summary: "bla bla, such and such, this should be a tow to three rows paragraph describing who are you and what are the things your good at. bla bla, such and such, this should be a tow to three rows paragraph describing who are you and what are the things your good at.",
  },
  experience: [
    {
      company: "Google",
      position: "Software Engineer",
      date: "2023-7-1",
      location: "California",
      website: "https://mail.google.com",
      summary: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima minus quidem reprehenderit voluptatibus, consequuntur perspiciatis! Tenetur aut et magnam, maiores reiciendis soluta perspiciatis enim sed corporis.Perspiciatis totam culpa consectetur.",
      id: uuid(),
    },
    {
      company: "Facebook",
      position: "Software Engineer",
      date: "2020-6-1",
      location: "Mars",
      summary: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima minus quidem reprehenderit voluptatibus, consequuntur perspiciatis! Tenetur aut et magnam, maiores reiciendis soluta perspiciatis enim sed corporis.Perspiciatis totam culpa consectetur.",
      id: uuid(),
    },
  ],
  education: [
    {
      institution: "Massachusetts Institute of Technology",
      score: "3.9 GPA",
      areaOfStudy: "Computer Science",
      typeOfStudy: "Bachelor of Science",
      date: "2016-9-1 to 2020-6-1",
      website: "http://www.mit.edu",
      summary: "Studied various computer science subjects including algorithms, data structures, and software engineering. Graduated with honors.",
      id: uuid(),
    },
    {
      institution: "Stanford University",
      score: "4.0 GPA",
      areaOfStudy: "Artificial Intelligence",
      typeOfStudy: "Master of Science",
      date: "2020-9-1 to 2022-6-1",
      website: "http://www.stanford.edu",
      summary: "Focused on advanced topics in artificial intelligence, machine learning, and neural networks. Completed a thesis on deep learning applications.",
      id: uuid(),
    },
  ],
}

const initModals = localStorage.getItem("modals") ? JSON.parse(localStorage.getItem("modals")) : {
  experience: {
    company: "",
    position: "",
    date: "",
    location: "",
    website: "",
    summary: "",
  },
  education: {
    institution: "",
    score: "",
    areaOfStudy: "",
    typeOfStudy: "",
    date: "",
    website: "",
    summary: "",
  }
}

function App() {
  const [data, setData] = useState(init);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const initModalsShow = {
    experience: false,
    education: false,
  }

  const [modals, setModals] = useState(initModals);
  const [modalsShow, setModalsShow] = useState(initModalsShow);
  const [editModals, setEditModals] = useState(false);

  useEffect(() => {
    localStorage.setItem("modals", JSON.stringify(modals));
  }, [modals])

  const handleInputChange = (value, section, key) => {
    const updatedSection = { ...data[section], [key]: value };
    const updatedData = { ...data, [section]: updatedSection };
    setData(updatedData);
  }

  const handleFileChange = (file, section, key) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const path = reader.result;
        const updatedSection = { ...data[section], [key]: path };
        const updatedData = { ...data, [section]: updatedSection };
        setData(updatedData);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleModalInputChange = (value, section, key) => {
    const updated = { ...modals[section], [key]: value };
    setModals({ ...modals, [section]: updated });
  }

  function resetModal(modal) {
    const updatedVals = { ...modals[modal] };
    Object.keys(updatedVals).forEach(key => {
      updatedVals[key] = "";
    })
    setModals({ ...modals, [modal]: updatedVals });
  }

  const handleFileClick = (e, section, key) => {
    if (e.target.value !== "") {
      e.preventDefault();
      e.target.value = "";
      const updatedSection = { ...data[section], [key]: "" };
      const updatedData = { ...data, [section]: updatedSection };
      setData(updatedData);
    }
  }


  const showModal = (modal) => {
    setModalsShow({ ...modalsShow, [modal]: true });
  }


  const hideModal = (modal) => {
    setModalsShow({ ...modalsShow, [modal]: false });
    if (editModals) {
      resetModal(modal);
    }
    setEditModals(false);
  }

  function handleModalCreateClick(section = "") {
    const formEl = document.getElementById(`${section}-form`);
    if (!formEl.reportValidity()) return;
    const updatedSection = [
      ...data[section], { ...modals[section], id: uuid() }
    ];
    setData({ ...data, [section]: updatedSection });
    formEl.reset();
    hideModal(section);
  }

  const handleChangeItemIndex = useCallback((section, from, to) => {
    // WARN: the rest of the implementation is in components/List.jsx
    // i should merge them and put all logic here instead
    const updated = [...data[section]];
    const item = updated.splice(from, 1)[0];
    updated.splice(to, 0, item);
    setData({
      ...data,
      [section]: updated
    });
  });

  const handleListItemClick = useCallback((id, section) => {
    const targetIdx = data[section].map(entry => entry.id).indexOf(id);
    setModals({ ...modals, [section]: { ...data[section][targetIdx] } });
    setEditModals(true);
    showModal(section);
  });

  const handleOnUpdateEntry = useCallback((id, section) => {
    const targetIdx = data[section].map(entry => entry.id).indexOf(id);
    const updatedSection = data[section];
    updatedSection[targetIdx] = { ...modals[section], id };
    setData({ ...data, [section]: updatedSection });
    hideModal(section);
  });

  const handleOnDeleteEntry = useCallback((id, section) => {
    const targetIdx = data[section].map(entry => entry.id).indexOf(id);
    const updatedSection = data[section];
    updatedSection.splice(targetIdx, 1);
    setData({ ...data, [section]: updatedSection });
    hideModal(section);
  });

  return (
    <>
      <div className="grid grid-flow-col grid-cols-2 gap-4 w-[80rem] mx-auto max-w-full px-2">
        <div>
          <form action="">
            <fieldset>
              <Legend content="Basics" />
              <div className="grid grid-cols-2 gap-1 p-2 gap-x-10">
                <AvatarInput onFileClick={handleFileClick} onFileChange={handleFileChange} onChange={handleInputChange} value={data.basics.picture} id="avatar" label="Picture" placeholder="https://..." sectionKey="picture" section="basics" />
                <Input onChange={handleInputChange} value={data.basics.fullName} id="full-name" label="Full Name" sectionKey="fullName" section="basics" />
                <Input value={data.basics.headline} onChange={handleInputChange} sectionKey="headline" section="basics" className="col-span-2" id="headline" label="Headline" />
                <Input value={data.basics.email} onChange={handleInputChange} sectionKey="email" section="basics" id="email" label="Email" placeholder="you@example.com" />

                <Input value={data.basics.phone} onChange={handleInputChange} sectionKey="phone" section="basics" id="phone" label="Phone Number" placeholder="+996 002 141 221" />
                <Input value={data.basics.website} onChange={handleInputChange} sectionKey="website" section="basics" id="website" label="Website" placeholder="yoursite.com" />
                <Input value={data.basics.address} onChange={handleInputChange} sectionKey="address" section="basics" id="address" label="Address" placeholder="China/Beijing" />
                <Textarea value={data.basics.summary} onChange={handleInputChange} sectionKey="summary" section="basics" className="col-span-2" label="Summary" />
              </div>
            </fieldset>
          </form>
          <ListFieldset legendContent="Experience" items={data.experience} onReorder={handleChangeItemIndex} onItemClick={handleListItemClick} section="experience" onClick={() => showModal("experience")} />
          <ListFieldset legendContent="Education" items={data.education} onReorder={handleChangeItemIndex} onItemClick={handleListItemClick} section="education" onClick={() => showModal("education")} />
        </div>
        <Resume basics={data.basics} experience={data.experience} education={data.education} />
      </div>
      <Modal variant="experience" show={modalsShow.experience} values={modals.experience} onClose={hideModal} section="experience" onChange={handleModalInputChange} onCreate={() => handleModalCreateClick("experience")} onReset={(() => resetModal("experience"))} editForm={editModals} onUpdate={handleOnUpdateEntry} onDelete={handleOnDeleteEntry} />
      <Modal variant="education" show={modalsShow.education} values={modals.education} onClose={hideModal} section="education" onChange={handleModalInputChange} onCreate={() => handleModalCreateClick("education")} onReset={(() => resetModal("education"))} editForm={editModals} onUpdate={handleOnUpdateEntry} onDelete={handleOnDeleteEntry} />
    </>
  )
}

export default App
