import { Fields } from '@mnml-tools/ui'

export default function Connection() {
  return (
    <form style={{ width: 380 }} onSubmit={(event) => event.preventDefault()}>
      <Fields>
        <label className="mnml-field-full">
          Name
          <input placeholder="e.g. Production" />
        </label>
        <label>
          Host
          <input defaultValue="localhost" />
        </label>
        <label>
          Port
          <input defaultValue="5432" inputMode="numeric" />
        </label>
        <label>
          User
          <input defaultValue="app" />
        </label>
        <label>
          SSL
          <select defaultValue="prefer">
            <option value="disable">disable</option>
            <option value="prefer">prefer</option>
            <option value="require">require</option>
          </select>
        </label>
      </Fields>
    </form>
  )
}
