import React from 'react'
import '../styles/index.css'

import BodyText from './BodyText'

const BASE_URL = 'https://api.adviceslip.com'
const ADVICE_URL = `${BASE_URL}/advice`

function AdviceCard() {
  const [advice, setAdvice] = React.useState({
    id: null,
    advice: '',
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)

  const fetchAdvice = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(ADVICE_URL)
      const data = await response.json()
      setAdvice(data.slip)
    } catch (error) {
      setIsError(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchAdvice()
  }, [])

  const shouldDisplayAdvice =
    !isLoading && !isError && advice.id !== null && advice.advice.length > 0

  return (
    <main className='rounded-2xl bg-darkGrayishBlue relative flex flex-col items-center pt-8 pb-12 w-[21.5rem] md:w-[29.375rem]'>
      {isLoading && <BodyText>Loading...</BodyText>}
      {isError && (
        <BodyText>Something's went wrong. Please refresh the page.</BodyText>
      )}
      {shouldDisplayAdvice && (
        <>
          <h1 className='font-manrope text-neonGreen tracking-[.375em] text-[10px]'>
            ADVICE #{advice.id}
          </h1>
          <BodyText>“{advice.advice}”</BodyText>
          <img
            src='/images/pattern-divider-desktop.svg'
            alt='divider'
            className='invisible md:visible'
          />
          <img
            src='/images/pattern-divider-mobile.svg'
            alt='divider'
            className='md:invisible'
          />
        </>
      )}
      <button
        className='transition-all bg-neonGreen shadow-neonGreen w-14 h-14 rounded-full absolute -bottom-[1.75rem] flex items-center justify-center'
        onClick={fetchAdvice}
      >
        <img src='/images/icon-dice.svg' alt='dice' id='dice' />
      </button>
    </main>
  )
}

export default AdviceCard
