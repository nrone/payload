'use client'
import type { DescriptionFunction, StaticDescription } from 'payload'

import { getTranslation } from '@payloadcms/translations'
import React from 'react'

import { useTranslation } from '../../providers/Translation/index.js'
import './index.scss'

export type ViewDescriptionComponent = React.ComponentType<any>

type Description = DescriptionFunction | StaticDescription | ViewDescriptionComponent | string

export type ViewDescriptionProps = {
  readonly description?: Description
}

export function isComponent(description: Description): description is ViewDescriptionComponent {
  return React.isValidElement(description)
}

export const ViewDescription: React.FC<ViewDescriptionProps> = (props) => {
  const { i18n } = useTranslation()
  const { description } = props

  if (isComponent(description)) {
    const Description = description
    return <Description />
  }

  if (description) {
    return <div className="view-description">{getTranslation(description, i18n)}</div>
  }

  return null
}
