// import { useEffect, useState } from "react"
// import { Link, useNavigate, useParams } from "react-router-dom"
// import { toyService } from "../services/toy.service.js"
// import { Button, TextField } from "@mui/material"
// import { Formik, Form, Field } from "formik"
// import * as Yup from "yup"
// import { toyService } from "../services/toy.service-local.js"
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
// import { saveToy } from "../store/actions/toy.actions.js"
// import { useOnlineStatus } from "../hooks/useOnlineStatus.js"
// import { useConfirmTabClose } from "../hooks/useConfirmTabClose.js"
// export function ToyEdit() {
//   const navigate = useNavigate()
//   const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
//   const { toyId } = useParams()
//   const isOnline = useOnlineStatus()
//   const setHasUnsavedChanges = useConfirmTabClose()

//   const SignupSchema = Yup.object().shape({
//     name: Yup.string()
//       .min(2, "Too Short!")
//       .max(50, "Too Long!")
//       .required("Required"),
//     lastName: Yup.string()
//       .min(2, "Too Short!")
//       .max(50, "Too Long!")
//       .required("Required"),
//     price: Yup.number().min(0).required("Price is required"),
//     email: Yup.string().email("Invalid email").required("Required"),
//   })

//   useEffect(() => {
//     if (toyId) loadToy()
//   }, [toyId])

//   function loadToy() {
//     toyService
//       .getById(toyId)
//       .then((toy) => {
//         setToyToEdit(toy)
//       })
//       .catch((err) => {
//         console.log("Had issues in toy edit", err)
//         navigate("/toy")
//       })
//   }

//   function handleChange({ target }) {
//     let { value, type, name: field } = target
//     if (type === "number") value = +value
//     if (type === "checkbox") value = target.checked
//     setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
//     setHasUnsavedChanges(true)
//   }

//   function onSaveToy(ev) {
//     ev.preventDefault()

//     if (!toyToEdit.price) toyToEdit.price = 100

//     saveToy(toyToEdit)
//       .then(() => {
//         showSuccessMsg("Toy saved!")
//         setHasUnsavedChanges(false)
//         navigate("/toy")
//       })
//       .catch((err) => {
//         console.log("Had issues in toy save", err)
//         showErrorMsg("Could not save toy")
//       })
//   }

//   return (
//     <section className="toy-edit">
//       <h2>{toyToEdit._id ? "Edit" : "Add"} Toy</h2>

//       <form onSubmit={onSaveToy} className="flex flex-column">
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           placeholder="Enter name..."
//           value={toyToEdit.name}
//           onChange={handleChange}
//         />

//         <label htmlFor="price">Price:</label>
//         <input
//           type="number"
//           id="price"
//           name="price"
//           placeholder="Enter price"
//           value={toyToEdit.price}
//           onChange={handleChange}
//         />

//         <label htmlFor="inStock">
//           <input
//             type="checkbox"
//             id="inStock"
//             name="inStock"
//             checked={toyToEdit.inStock}
//             onChange={handleChange}
//           />
//           In Stock
//         </label>

//         <div className="actions">
//           <button>{toyToEdit._id ? "Save" : "Add"}</button>
//           <Link to="/toy">Cancel</Link>
//         </div>

//         <section className="online-status">
//           <h4>{isOnline ? "✅ Online" : "❌ Disconnected"}</h4>
//         </section>
//       </form>
//     </section>
//   )
// }

import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"

import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useEffect, useState } from "react"

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!toyId) {
      setToyToEdit(toyService.getEmptyToy())
    } else {
      toyService
        .getById(toyId)
        .then(setToyToEdit)
        .catch(() => {
          showErrorMsg("Couldn't load toy")
          navigate("/toy")
        })
    }
  }, [toyId])

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2).max(50).required("Required"),
    price: Yup.number().min(1).required("Required"),
  })

  if (!toyToEdit) return <div>Loading...</div>

  return (
    <section className="toy-edit">
      <h2>{toyId ? "Edit Toy" : "Add Toy"}</h2>

      <Formik
        initialValues={toyToEdit}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          saveToy(values)
            .then(() => {
              showSuccessMsg("Toy saved!")
              navigate("/toy")
            })
            .catch(() => {
              showErrorMsg("Could not save toy")
            })
            .finally(() => setSubmitting(false))
        }}
      >
        {({ errors, touched, values, handleChange, isSubmitting }) => (
          <Form className="formik">
            <Field
              as={TextField}
              label="Name"
              name="name"
              variant="standard"
              sx={{ marginBottom: 2}}
              fullWidth
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />

            <Field
              as={TextField}
              label="Price"
              name="price"
              type="number"
              sx={{ marginBottom: 2}}
              variant="standard"
              fullWidth
              error={touched.price && Boolean(errors.price)}
              helperText={touched.price && errors.price}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={values.inStock}
                  name="inStock"
                  onChange={handleChange}
                />
              }
              label="In Stock"
            />

            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {toyId ? "Save" : "Add"}
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  )
}
