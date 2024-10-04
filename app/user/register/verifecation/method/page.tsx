// app/verify-method/page.tsx
import Link from 'next/link'

export default function VerifyMethod() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Choose Verification Method</h2>
      <Link href="/verify-email" className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition duration-200">
        Verify by Email
      </Link>
      <Link href="/verify-phone" className="block w-full bg-green-600 text-white text-center py-2 rounded hover:bg-green-700 transition duration-200">
        Verify by Phone
      </Link>
    </div>
  )
}