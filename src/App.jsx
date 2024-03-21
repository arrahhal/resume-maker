import { Input, RangeInput, Button, Textarea, AvatarInput } from './components/Inputs';

function App() {

  return (
    <>
      <div className="w-[60rem] mx-auto max-w-full px-2">
        <Input id="full-name" label="Full Name" placeholder="ex. John Doe" />
        <RangeInput id="full-name" />
        <Button content="Primary" variant="primary" />
        <Button content="danger" variant="danger" />
        <Button content="outline" variant="outline" />
        <Button variant="close" />
        <Textarea label="Summary" />
        <AvatarInput />
      </div>
    </>
  )
}

export default App
