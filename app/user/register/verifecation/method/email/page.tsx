// app/verify-email/page.tsx
import Link from 'next/link'

export default function VerifyEmail() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Email Verification</h2>
      <p className="text-gray-600 mb-4">Enter the verification code sent to your email.</p>
      <input
        type="text"
        placeholder="Verification Code"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <Link href="/verification-success" className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition duration-200">
        Verify Email
      </Link>
    </div>
  )
}