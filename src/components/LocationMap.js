import { MapContainer, Marker, TileLayer } from "react-leaflet"
import { graphql, useStaticQuery } from "gatsby"

import { Icon } from "leaflet"
import { Paper } from "@mui/material"
import React from "react"
import logoPin from "../images/logopin.png"

export default function LocationMap() {
  const { latitude, longitude } = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "content" }
        extension: { eq: "md" }
        name: { eq: "location" }
      ) {
        childMarkdownRemark {
          frontmatter {
            gps {
              latitude
              longitude
            }
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter.gps
  return typeof window !== "undefined" ? (
    <Paper elevation={3}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{
          height: "35rem",
          width: "100%",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[latitude, longitude]}
          icon={
            new Icon({
              iconUrl: logoPin,
              iconAnchor: [20, 80],
            })
          }
        />
      </MapContainer>
    </Paper>
  ) : null
}
