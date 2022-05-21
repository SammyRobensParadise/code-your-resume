import { UpdateFileDataEvent } from './files'
import { v4 as uuidv4 } from 'uuid'
import { File } from '../../types'

export const store = {
  set: (m: UpdateFileDataEvent): boolean => {
    switch (m.operation) {
      case 'CREATE': {
        const { id, name, path, extension, language, value, isOpen } = m.payload
        const fallbackExtension = extension ? extension : 'html'
        const fallbackName = `default${Date.now()}`
        const newId: string = uuidv4()
        const newFile: File = {
          name: name ? name : `${fallbackName}.${fallbackExtension}`,
          path: path ? path : `${fallbackName}.${fallbackExtension}`,
          id: id ? id : newId,
          language: language ? language : 'html',
          value: value,
          extension: fallbackExtension,
          isOpen: isOpen ? isOpen : true,
          type: 'source'
        }

        // handle local storage
        const doesExistInLocalSorage = !!(id
          ? window.localStorage.getItem(id)
          : null)

        if (!doesExistInLocalSorage) {
          localStorage.setItem(id ? id : newId, JSON.stringify(newFile))
        }
        return true
      }
      case 'VALUE': {
        const { id, value } = m.payload
        if (id) {
          const file = window.localStorage.getItem(id)
          if (file) {
            const c: File = JSON.parse(file)
            c.value = value
            window.localStorage.setItem(id, JSON.stringify(c))
            return true
          }
        }
        return false
      }

      case 'NAME': {
        const { id, name, path } = m.payload
        if (id) {
          const file = window.localStorage.getItem(id)
          if (file) {
            const c: File = JSON.parse(file)
            c.name = name ? name : 'unknown.html'
            c.path = path ? path : 'unknown.html'
            window.localStorage.setItem(id, JSON.stringify(c))
            return true
          }
        }
        return false
      }
      case 'LANGUAGE': {
        const { id, language } = m.payload
        if (id) {
          const file = window.localStorage.getItem(id)
          if (file) {
            const c: File = JSON.parse(file)
            c.language = language ? language : 'html'
            window.localStorage.setItem(id, JSON.stringify(c))
            return true
          }
        }
        return false
      }
      case 'CLOSE': {
        const { id } = m.payload
        if (id) {
          const file = window.localStorage.getItem(id)
          if (file) {
            const c: File = JSON.parse(file)
            c.isOpen = false
            window.localStorage.setItem(id, JSON.stringify(c))
            return true
          }
        }
        return false
      }
      case 'OPEN': {
        const { id } = m.payload
        if (id) {
          const file = window.localStorage.getItem(id)
          if (file) {
            const c: File = JSON.parse(file)
            c.isOpen = true
            window.localStorage.setItem(id, JSON.stringify(c))
            return true
          }
        }
        return false
      }
      default: {
        return true
      }
    }
  },
  get: (id: string): File | null => {
    if (id) {
      const file = window.localStorage.getItem(id)
      return file ? JSON.parse(file) : null
    }
    return null
  },
  getAll: (): null | File[] => {
    const values: Storage = window.localStorage
    const size = window.localStorage.length
    if (size) {
      const v = Object.entries(values).map((value) => {
        return JSON.parse(value[1])
      })
      return v.filter((item: File) => item.type === 'source')
    }
    return null
  }
}
