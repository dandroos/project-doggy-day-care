import {
  Box,
  Button,
  Divider,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { Delete, Paw } from "mdi-material-ui"

import React from "react"
import { connect } from "react-redux"

const PetDetails = ({ fields, setFields, language }) => {
  const text = {
    petDetails: {
      en: "Pet details",
      es: "Detalles de la mascota",
      de: "Haustierdetails",
    },
    toContinue: {
      en: "Please add a pet to continue",
      es: "Agrega una mascota para continuar",
      de: "Bitte fügen Sie ein Haustier hinzu, um fortzufahren",
    },
    pet: {
      en: "Pet",
      es: "Mascota",
      de: "Haustier",
    },
    nameOfPet: {
      en: "Name of pet",
      es: "Nombre de la mascota",
      de: "Name des Haustieres",
    },
    breed: {
      en: "Breed",
      es: "Raza",
      de: "Die Zucht",
    },
    preferredFood: {
      en: "Preferred food",
      es: "Comida preferida",
      de: "Bevorzugtes Essen",
    },
    dog: {
      en: "Dog",
      es: "Perro",
      de: "Hund",
    },
    cat: {
      en: "Cat",
      es: "Gato",
      de: "Katze",
    },
    notImportant: {
      en: "Not important",
      es: "No importante",
      de: "Nicht wichtig",
    },
    iWillSupply: {
      en: `"I will supply"`,
      es: `"Voy a suministrar"`,
      de: `"Ich werde liefern"`,
    },
    other: {
      en: "Other (please specify in comments)",
      es: "Otro (especifique en los comentarios)",
      de: "Sonstiges (bitte bei Bemerkungen angeben)",
    },
    complimentaryBath: {
      en: "Complimentary bath",
      es: "Baño de cortesía",
      de: "Kostenloses Bad",
    },
    yes: {
      en: "Yes",
      es: "Sí",
      de: "Ja",
    },
    no: {
      en: "No",
      es: "No",
      de: "Nein",
    },
    addPet: {
      en: "Add pet",
      es: "Añadir mascota",
      de: "Haustier hinzufügen",
    },
  }
  const addPet = () => {
    setFields({
      ...fields,
      pets: fields.pets.concat([
        {
          type: "dog",
          breed: "",
          name: "",
          bath: 1,
          preferredFood: 0,
        },
      ]),
    })
  }

  const AddPetButton = () => (
    <Button variant="contained" startIcon={<Paw />} onClick={addPet}>
      {text.addPet[language]}
    </Button>
  )
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">{text.petDetails[language]}</Typography>
      </Grid>
      {fields.pets.length < 1 ? (
        <Grid item xs={12}>
          <Box textAlign="center">
            <Typography gutterBottom>{text.toContinue[language]}...</Typography>
            <AddPetButton />
          </Box>
        </Grid>
      ) : (
        <>
          {fields.pets.map((i, ind) => {
            const handlePetChange = (e) => {
              setFields({
                ...fields,
                pets: fields.pets.map((p, pInd) => {
                  if (pInd === ind) {
                    return {
                      ...p,
                      [e.target.name]: e.target.value,
                    }
                  }
                  return p
                }),
              })
            }
            return (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2, mt: ind === 0 ? 0 : undefined }} />
                </Grid>
                <Grid item xs={12} sx={{ position: "relative" }}>
                  <Fab
                    size="small"
                    color="error"
                    sx={{ position: "absolute", top: 10, right: 0 }}
                    onClick={() =>
                      setFields({
                        ...fields,
                        pets: fields.pets.filter((p, pInd) => ind !== pInd),
                      })
                    }
                  >
                    <Delete />
                  </Fab>
                  <Typography fontWeight="bold" variant="overline">
                    {text.pet[language]} #{ind + 1}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    name="name"
                    label={text.nameOfPet[language]}
                    value={i.name}
                    onChange={handlePetChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    name="breed"
                    label={text.breed[language]}
                    value={i.breed}
                    onChange={handlePetChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <RadioGroup
                      row
                      name="type"
                      value={i.type}
                      onChange={handlePetChange}
                    >
                      <FormControlLabel
                        value="dog"
                        control={<Radio />}
                        label={text.dog[language]}
                      />
                      <FormControlLabel
                        value="cat"
                        control={<Radio />}
                        label={text.cat[language]}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="preferred-food">
                      {text.preferredFood[language]}
                    </InputLabel>
                    <Select
                      labelId="preferred-food"
                      name="preferredFood"
                      value={i.preferredFood}
                      label={text.preferredFood[language]}
                      onChange={handlePetChange}
                    >
                      <MenuItem value={0}>
                        {text.notImportant[language]}
                      </MenuItem>
                      <MenuItem value={1}>
                        {text.iWillSupply[language]}
                      </MenuItem>
                      <MenuItem value={2}>Affinity</MenuItem>
                      <MenuItem value={3}>{text.other[language]}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="complimentary-bath">
                      {text.complimentaryBath[language]}
                    </InputLabel>
                    <Select
                      labelId="complimentary-bath"
                      name="bath"
                      value={i.bath}
                      label={text.complimentaryBath[language]}
                      onChange={handlePetChange}
                    >
                      <MenuItem value={0}>{text.yes[language]}</MenuItem>
                      <MenuItem value={1}>{text.no[language]}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {ind === fields.pets.length - 1 && (
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                  </Grid>
                )}
              </>
            )
          })}
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <AddPetButton />
          </Grid>
        </>
      )}
    </>
  )
}

const stp = (s) => ({
  language: s.language,
})

export default connect(stp)(PetDetails)
