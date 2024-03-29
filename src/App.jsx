import { useState } from "react";
import { Input, Button, Textarea, AvatarInput } from './components/Inputs';
import Legend from "./components/Styled";
import Resume from './components/Resume';
import Modal from "./components/Modal";

const init = {
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
}

function App() {
  const [data, setData] = useState(init);

  const initModals = {
    "experience": {
      show: false,
      id: 0,
      values: {
        company: "",
        position: "",
        date: "",
        location: "",
        website: "",
        summary: "",
      }
    },
    "education": {
      show: false,
      id: 0,
      values: {
        institution: "",
        score: "",
        areaOfStudy: "",
        typeOfStudy: "",
        date: "",
        website: "",
        summary: "",
      }
    }
  }
  const [modals, setModals] = useState(initModals);

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
    const updated = { ...modals[section], values: { ...modals[section].values, [key]: value } };
    setModals({ ...modals, [section]: updated });
  };

  const handleCloseModalClick = (modal) => {
    const values = { ...modals[modal].values };
    Object.keys(values).forEach(key => {
      values[key] = "";
    })
    const updatedModal = { ...modals[modal], show: false, values };
    setModals({ ...modals, modal: updatedModal });
  }

  const handleFileClick = (e, section, key) => {
    if (e.target.value !== "") {
      e.preventDefault();
      e.target.value = "";
      const updatedSection = { ...data[key], [key]: "" };
      const updatedData = { ...data, [e.target.dataset.section]: updatedSection };
      setData(updatedData);
    }
  }

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
            <fieldset>
              <Legend content="Experience" />
              <Button className="mx-auto" content="+ Add new item" variant="outline" />
            </fieldset>
          </form>
        </div>
        <Resume basics={data.basics} />
      </div>
      <Modal values={modals.experience} show={modals.experience.show} onClose={handleCloseModalClick} section="experience" sectionId={modals.experience.id} onChange={handleModalInputChange} />
      <Modal values={modals.education} show={modals.education.show} onClose={handleCloseModalClick} sectionId={modals.education.id} />
    </>
  )
}

export default App
