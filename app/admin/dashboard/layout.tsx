import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'
import type { ReactNode } from 'react'

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const token = (await cookies()).get('adminToken')?.value
  if (!token || !process.env.JWT_SECRET) {
    redirect('/admin')
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    redirect('/admin')
  }

  return <>{children}</>
}
