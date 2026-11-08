import { useState } from 'react'
import { Pagination } from '@mnml-tools/ui'

const total = 1204

export default function Rows() {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(100)
  const pageCount = Math.ceil(total / size)

  return (
    <div style={{ width: '100%', border: '1px solid var(--border)', borderTop: 0 }}>
      <Pagination
        page={page}
        pageCount={pageCount}
        summary={
          <>
            {total.toLocaleString('en')} rows ·{' '}
            <select
              aria-label="Rows per page"
              value={size}
              onChange={(event) => {
                setSize(Number(event.target.value))
                setPage(0)
              }}
            >
              {[50, 100, 500].map((option) => (
                <option key={option} value={option}>
                  {option} per page
                </option>
              ))}
            </select>
          </>
        }
        onPrevious={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
      />
    </div>
  )
}
