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
import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import { connect } from "react-redux"

const PetDetails = ({ fields, setFields, language }) => {
  const text = Object.assign(
    {},
    useStaticQuery(graphql`
      {
        file(
          sourceInstanceName: { eq: "content" }
          name: { eq: "dictionary" }
          extension: { eq: "md" }
        ) {
          childMarkdownRemark {
            frontmatter {
              pet_details {
                en
                es
                de
              }
              pet {
                en
                es
                de
              }
              name_of_pet {
                en
                es
                de
              }
              breed {
                en
                es
                de
              }
              preferred_food {
                en
                es
                de
              }
              dog {
                en
                es
                de
              }
              cat {
                en
                es
                de
              }
              not_important {
                en
                es
                de
              }
              i_will_supply {
                en
                es
                de
              }
              other {
                en
                es
                de
              }
              complimentary_bath {
                en
                es
                de
              }
              yes {
                en
                es
                de
              }
              no {
                en
                es
                de
              }
              add_pet {
                en
                es
                de
              }
            }
          }
        }
      }
    `).file.childMarkdownRemark.frontmatter
  )
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
      {text.add_pet[language]}
    </Button>
  )
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">{text.pet_details[language]}</Typography>
      </Grid>
      {fields.pets.length < 1 ? (
        <Grid item xs={12}>
          <Box textAlign="center">
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
              <React.Fragment key={ind}>
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
                    label={text.name_of_pet[language]}
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
                      {text.preferred_food[language]}
                    </InputLabel>
                    <Select
                      labelId="preferred-food"
                      name="preferredFood"
                      value={i.preferredFood}
                      label={text.preferred_food[language]}
                      onChange={handlePetChange}
                    >
                      <MenuItem value={0}>
                        {text.not_important[language]}
                      </MenuItem>
                      <MenuItem value={1}>
                        {text.i_will_supply[language]}
                      </MenuItem>
                      <MenuItem value={2}>Affinity</MenuItem>
                      <MenuItem value={3}>{text.other[language]}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="complimentary-bath">
                      {text.complimentary_bath[language]}
                    </InputLabel>
                    <Select
                      labelId="complimentary-bath"
                      name="bath"
                      value={i.bath}
                      label={text.complimentary_bath[language]}
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
              </React.Fragment>
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
