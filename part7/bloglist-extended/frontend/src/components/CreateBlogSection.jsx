import { useRef } from 'react'
import Toggleable from './Toggleable'
import CreateNewBlogForm from './CreateNewBlogForm'
const CreateBlogSection = () => {
  const createNoteRef = useRef()

  return (
    <>
      <Toggleable buttonLabel="Create New Blog" ref={createNoteRef}>
        <CreateNewBlogForm
          onBlogCreated={() => createNoteRef.current.toggleVisibility()}
        />
      </Toggleable>
    </>
  )
}
export default CreateBlogSection
