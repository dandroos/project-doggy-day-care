import { Button, Grid, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Send } from "mdi-material-ui"
import { connect } from "react-redux"
import { setToast } from "../redux/actions"

const ContactForm = ({ dispatch, language }) => {
  const { content, dictionary } = useStaticQuery(graphql`
    {
      content: file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "contactpage" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            form_intro {
              en
              es
              de
            }
            message_success {
              en
              es
              de
            }
            message_fail {
              en
              es
              de
            }
          }
        }
      }
      dictionary: file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "dictionary" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            name {
              en
              es
              de
            }
            phone {
              en
              es
              de
            }
            message {
              en
              es
              de
            }
            send {
              en
              es
              de
            }
          }
        }
      }
    }
  `)

  const text = Object.assign(
    {},
    {
      ...content.childMarkdownRemark.frontmatter,
      ...dictionary.childMarkdownRemark.frontmatter,
    }
  )

  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  })

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const encode = (formData) => {
      return Object.keys(formData)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
        )
        .join("&")
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...fields,
      }),
    })
      .then(() => {
        dispatch(
          setToast({
            open: true,
            msg: text.message_success[language],
            severity: "success",
          })
        )
        setFields({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      })
      .catch(() =>
        dispatch(
          setToast({
            open: true,
            msg: text.message_fail[language],
            severity: "error",
          })
        )
      )
  }
  return (
    <form
      name="contact"
      action="#"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography gutterBottom>{text.form_intro[language]}...</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label={text.name[language]}
            name="name"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Email"
            name="email"
            type="email"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label={text.phone[language]}
            name="phone"
            type="tel"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            label={text.message[language]}
            name="msg"
            minRows={5}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Send />}
            type="submit"
          >
            {text.send[language]}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

const stp = (s) => ({
  language: s.language,
})

export default connect(stp)(ContactForm)
