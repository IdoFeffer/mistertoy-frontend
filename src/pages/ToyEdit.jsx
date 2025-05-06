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
    async function loadToy() {
      try {
        const toy = await toyService.getById(toyId)
        setToyToEdit(toy)
      } catch (err) {
        showErrorMsg("Couldn't load toy")
        navigate("/toy")
      }
    }

    if (toyId) loadToy()
    else setToyToEdit(toyService.getEmptyToy())
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
          try {
            showSuccessMsg("Toy saved!")
            navigate("/toy")
          } catch (err) {
            showErrorMsg("Could not save toy", err)
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ errors, touched, values, handleChange, isSubmitting }) => (
          <Form className="formik">
            <Field
              as={TextField}
              label="Name"
              name="name"
              variant="standard"
              sx={{ marginBottom: 2 }}
              fullWidth
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />

            <Field
              as={TextField}
              label="Price"
              name="price"
              type="number"
              sx={{ marginBottom: 2 }}
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
