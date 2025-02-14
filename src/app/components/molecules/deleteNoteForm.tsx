'use client'
import { useDeleteNote } from '@/hooks/useDeleteNote'
import React, { useState } from 'react'

interface DeleteNoteFormProps {
  deleteNote: (id: number) => void
}

export default function DeleteNoteForm({ deleteNote }: DeleteNoteFormProps) {
  const { deleteNote: deleteAPI, isLoading, error } = useDeleteNote()
  const [id, setId] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const noteId = parseInt(id.trim(), 10)
    const isDeleted = await deleteAPI(noteId)
    if (isDeleted) {
      deleteNote(noteId) // Actualizar el estado en HomePage
      setId('')
      alert(`Note with ID ${noteId} has been deleted.`)
    }
  }

  return (
    <div className="fixed left-0 top-12 h-full w-1/3 max-w-96 p-4">
      <h2 className="mb-4 text-lg font-bold">Delete Note</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="id" className="block font-medium">
            Note ID
          </label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full rounded border p-2 text-black"
            placeholder="Enter note ID"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`rounded px-4 py-2 text-white ${
            isLoading ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {isLoading ? 'Deleting...' : 'Delete Note'}
        </button>
        {error && <p className="text-red-500">Error: {error.message}</p>}
      </form>
    </div>
  )
}
