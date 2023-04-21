function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className='flex font-manrope text-lightCyan text-xl px-8 pt-6 pb-5 text-center'>
      {children}
    </p>
  )
}

export default BodyText
