'use client'

import React from 'react'
import { normalizeMediaUrl } from '@/lib/media'

interface MediaImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
}

export function MediaImage({ src, ...props }: MediaImageProps) {
  if (!src) return null

  return (
    <img
      {...props}
      src={normalizeMediaUrl(src)}
      loading={props.loading ?? 'lazy'}
      decoding="async"
    />
  )
}
