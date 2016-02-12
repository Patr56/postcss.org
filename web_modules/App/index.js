import React, { Component } from "react"
import { PropTypes } from "react"
import Helmet from "react-helmet"

import Navigation from "Navigation"
import Social from "Social"
import Footer from "Footer"

import styles from "./index.css"

if (typeof window !== "undefined") {
  const FontFaceObserver = require("fontfaceobserver")

  const MerriweatherObserver = new FontFaceObserver("Merriweather", {})
  const FiraSansObserver = new FontFaceObserver("Fira Sans", {})

  MerriweatherObserver.check().then(() => {
    document.body.classList.add("merriweather-loaded")
  }, () => {
    document.body.classList.remove("merriweather-loaded")
  })

  FiraSansObserver.check().then(() => {
    document.body.classList.add("fira-sans-loaded")
  }, () => {
    document.body.classList.remove("fira-sans-loaded")
  })
}

export default class Wrapper extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const {
      pkg,
    } = this.context.metadata

    return (
      <div className={ styles.root }>
          <Helmet
            link={ [
              { "rel": "stylesheet",
                "href":
                "https://fonts.googleapis.com/css?family=Merriweather:400,700",
              },

              { "rel": "stylesheet",
                "href":
                "https://fonts.googleapis.com/css?family=Fira+Sans:500,300,700",
              },
            ] }

            meta={ [
              { property: "og:site_name", content: pkg.name },
              { name: "twitter:site", content: `@${ pkg.twitter }` },
            ] }
          />
          <div className={ styles.children }>
            { this.props.children }
          </div>
          <Navigation />
          <Social />
          <Footer />
      </div>
    )
  }
}