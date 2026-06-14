'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export type BookingFormState = {
  success: boolean
  error?: string
}

export async function submitBooking(
  _prevState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const name = String(formData.get('name') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const service = String(formData.get('service') ?? '').trim()
  const preferredDate = String(formData.get('preferredDate') ?? '').trim()

  if (!name || !phone) {
    return { success: false, error: 'A név és a telefonszám megadása kötelező.' }
  }

  try {
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'submissions',
      data: {
        name,
        phone,
        service,
        preferredDate,
      },
    })

    return { success: true }
  } catch (err) {
    console.error('Booking submission failed', err)
    return { success: false, error: 'Hiba történt a foglalás mentése közben. Próbáld újra!' }
  }
}
