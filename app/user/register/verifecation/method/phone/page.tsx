// app/verify-phone/page.tsx
import Link from 'next/link'

export default function VerifyPhone() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Phone Verification</h2>
      <p className="text-gray-600 mb-4">Enter the verification code sent to your phone.</p>
      <input
        type="text"
        placeholder="Verification Code"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <Link href="/verification-success" className="block w-full bg-green-600 text-white text-center py-2 rounded hover:bg-green-700 transition duration-200">
        Verify Phone
      </Link>
    </div>
  )
}