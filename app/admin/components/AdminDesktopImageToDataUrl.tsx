'use client'

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import Button from '@mui/material/Button'
import imageCompression from 'browser-image-compression'
import { useCallback, useRef } from 'react'
import { MAX_STORED_IMAGE_VALUE_BYTES, utf8ByteLength } from '@/lib/stored-image-value'

const UI_MAX_FILE_BYTES = 2.5 * 1024 * 1024

type Props = {
  /** Libellé du bouton (déclenche un input file caché). */
  buttonLabel?: string
  disabled?: boolean
  /** Data URL prête à coller dans le champ / envoyer au PATCH. */
  onDataUrl: (dataUrl: string) => void
  onError?: (message: string) => void
  onBusy?: (busy: boolean) => void
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => {
      if (typeof r.result === 'string') resolve(r.result)
      else reject(new Error('read'))
    }
    r.onerror = () => reject(new Error('read'))
    r.readAsDataURL(file)
  })
}

export default function AdminDesktopImageToDataUrl({
  buttonLabel = 'Depuis le bureau (sans fichier sur le serveur)',
  disabled = false,
  onDataUrl,
  onError,
  onBusy,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      e.target.value = ''
      if (!file) return

      if (file.size > UI_MAX_FILE_BYTES) {
        onError?.(`Fichier trop volumineux pour cette étape (max ${Math.round((UI_MAX_FILE_BYTES / (1024 * 1024)) * 10) / 10} Mo).`)
        return
      }

      onBusy?.(true)
      try {
        let out: string
        const isSvg = file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')

        if (isSvg) {
          out = await readFileAsDataUrl(file)
        } else {
          const compressed = await imageCompression(file, {
            maxSizeMB: 1.65,
            maxWidthOrHeight: 2200,
            useWebWorker: true,
          })
          out = await imageCompression.getDataUrlFromFile(compressed)
        }

        if (utf8ByteLength(out) > MAX_STORED_IMAGE_VALUE_BYTES) {
          onError?.(
            `Image trop lourde une fois encodée (max ${Math.round(MAX_STORED_IMAGE_VALUE_BYTES / (1024 * 1024))} Mo en base).`
          )
          return
        }

        onDataUrl(out)
      } catch {
        onError?.('Impossible de lire ou de compresser l’image.')
      } finally {
        onBusy?.(false)
      }
    },
    [onDataUrl, onError, onBusy]
  )

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/svg+xml,.svg"
        style={{ display: 'none' }}
        onChange={(e) => void onChange(e)}
      />
      <Button
        type="button"
        variant="outlined"
        size="small"
        startIcon={<CloudUploadOutlinedIcon />}
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        {buttonLabel}
      </Button>
    </>
  )
}
