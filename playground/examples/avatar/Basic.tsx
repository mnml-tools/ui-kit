import { Avatar } from '@mnml-tools/ui'

const connections = [
  { name: 'Production', color: '#db4aa6' },
  { name: 'Staging', color: '#1d8dba' },
  { name: 'Local', color: '#0d8a4b' }
]

export default function Basic() {
  return (
    <>
      {connections.map((connection) => (
        <span key={connection.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Avatar color={connection.color}>{connection.name[0]}</Avatar>
          {connection.name}
        </span>
      ))}
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Avatar color="#f2571d" size="small">
          Z
        </Avatar>
        Small
      </span>
    </>
  )
}
