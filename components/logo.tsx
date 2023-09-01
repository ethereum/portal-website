
import { DocsThemeConfig, useTheme } from "nextra-theme-docs";
import React, { FC, useContext } from "react";
import config from '../theme.config'
import Image from 'next/image'

const portalLogo = () => {
  return (
    <>
      <Image src='/static/PortalIcon.png' alt=" " width="40" height="40" />
      &nbsp;&nbsp; <b>Portal Network</b>
    </>
  )
}

export { portalLogo }
