import { useEffect, useState } from 'react'

const read = () => decodeURIComponent(location.hash.replace(/^#\/?/, ''))

/** The page slug from `#/slug`; hash routes need no server rewrites. */
export function useRoute() {
  const [route, setRoute] = useState(read)

  useEffect(() => {
    const update = () => setRoute(read())
    window.addEventListener('hashchange', update)

    return () => window.removeEventListener('hashchange', update)
  }, [])

  return route
}

export const navigate = (slug: string) => {
  location.hash = `/${slug}`
}
