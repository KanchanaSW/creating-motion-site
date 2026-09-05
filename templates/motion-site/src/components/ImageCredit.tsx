import type { PexelsImage } from '../types/site'

export function ImageCredit({
  image,
  className = '',
}: {
  image: PexelsImage
  className?: string
}) {
  return (
    <p className={className}>
      Photo by{' '}
      <a
        href={image.photographerUrl}
        className="underline underline-offset-2 hover:text-primary"
        target="_blank"
        rel="noreferrer"
      >
        {image.photographer}
      </a>{' '}
      on{' '}
      <a
        href={image.pageUrl}
        className="underline underline-offset-2 hover:text-primary"
        target="_blank"
        rel="noreferrer"
      >
        Pexels
      </a>
    </p>
  )
}
