'use client'

import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/app/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Field } from "@/app/components/ui/field"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/app/components/ui/input-otp"
import { verifyOTP } from '@/lib/actions/user.actions'

const OTPModal = ({ accountId }: { accountId: string }) => {

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(true)
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const resendOTP = () => {

    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const sessionId = await verifyOTP({ accountId, password })
            if (sessionId) {
                router.push('/')
            }
        } catch (error) {
            console.group('failed to verify OTP')
        }
    }
    const email = 'm4shaikh@outlook.com'
    return (
        <div >
            <AlertDialog open={isOpen}>
                <AlertDialogContent className='p-8 '>
                    <button className='fixed top-4 cursor-pointer right-6' onClick={() => setIsOpen(false)}>&#x2715;</button>
                    <AlertDialogHeader className='flex w-full flex-col gap-4 items-center justify-center'>
                        <AlertDialogTitle className='text-center w-full '>Enter Your OTP</AlertDialogTitle>
                        <AlertDialogDescription className='text-muted-foreground text-xs w-full text-center'>
                            We have sent a code to {email}
                        </AlertDialogDescription>
                        <Field className="w-full items-center">
                            <InputOTP className='text-2xl' id="digits-only" maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={password} onChange={setPassword}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                </InputOTPGroup>
                                <InputOTPGroup>
                                    <InputOTPSlot index={1} />
                                </InputOTPGroup>
                                <InputOTPGroup>
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>
                                <InputOTPGroup>
                                    <InputOTPSlot index={4} />
                                </InputOTPGroup>
                                <InputOTPGroup>
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </Field>
                    </AlertDialogHeader>
                    <div className='text-xs text-center'>

                        Didn't get a code? &nbsp; <button onClick={resendOTP} className='text-destructive cursor-pointer' > Click to resend </button>
                    </div>

                    <AlertDialogAction
                        onClick={handleSubmit}
                        disabled={isLoading || password.length !== 6}
                    >
                        {isLoading ? "Verifying..." : "Submit"}
                    </AlertDialogAction>

                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default OTPModal