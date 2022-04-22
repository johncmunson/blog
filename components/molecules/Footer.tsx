import { Nav } from './Nav'
import { sleep } from '../../utils'
import { ChangeEvent, useState } from 'react'

const paddingClasses = 'p-3 sm:p-5 md:p-7'
const textClasses = 'text-lg md:text-xl lg:text-2xl'
const inputClasses = `md:text-lg lg:text-xl focus:outline-sky-400`

export const Footer = () => {
  const [subscribed, setSubscribed] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)

  const subscribeToNewsletter = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubscribing(true)

    await sleep(1000)
    console.log(e.target.email.value)

    setIsSubscribing(false)
    setSubscribed(true)
  }

  return (
    <footer className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
      <p className={`${textClasses}`}>
        <span className="font-medium">Ternary Town Newsletter.</span> Subscribe
        for a look behind the scenes, insight on projects, and design philosophy
        from the team. No more than one mail per month.
      </p>
      <div className="mt-10 sm:mt-12 md:mt-14">
        {subscribed ? (
          <p className={`${textClasses} ${paddingClasses} !px-0`}>
            👍 Thank you for subscribing. We&apos;re excited to have you on
            board!
          </p>
        ) : (
          <form
            onSubmit={subscribeToNewsletter}
            method="post"
            className="flex gap-1"
          >
            <input
              type="email"
              name="email"
              placeholder="you@email.com"
              aria-label="email"
              className={`${inputClasses} ${paddingClasses} rounded-l-sm bg-gray-300 grow-[2]`}
            />
            <input
              type="submit"
              name="submit"
              value="Submit"
              disabled={isSubscribing ? true : false}
              aria-label="submit"
              className={`${inputClasses} ${paddingClasses} rounded-r-sm font-medium bg-gray-100 grow-[1] hover:cursor-pointer hover:bg-gray-200 disabled:cursor-wait`}
            />
          </form>
        )}
      </div>
      <div className="h-6 sm:h-8 md:h-10 lg:h-12"></div>
      <Nav />
      <div className="text-sm md:text-base lg:text-lg my-10 sm:my-12 md:my-14 lg:my-16">
        <p className="font-mono tracking-tight">© 2022 by Ternary Town Inc.</p>
        <p className="tracking-widest mt-2">English ｜ Deutsch ｜ 日本語</p>
      </div>
    </footer>
  )
}
