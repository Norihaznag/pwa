// app/verification-success/page.tsx
import Link from 'next/link'

export default function VerificationSuccess() {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-green-600">Verification Successful!</h2>
      <p className="text-gray-600 mb-4">Your account has been verified successfully.</p>
      <Link href="/" className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition duration-200">
        Return to Home
      </Link>
    </div>
  )
}