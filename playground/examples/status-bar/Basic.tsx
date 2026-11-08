import { Separator, StatusBar } from '@mnml-tools/ui'

export default function Basic() {
  return (
    <StatusBar
      start={
        <>
          localhost:5432
          <Separator />
          people
          <Separator />
          1,204 rows
        </>
      }
      end={
        <>
          32 ms
          <Separator />
          UTF-8
        </>
      }
    />
  )
}
