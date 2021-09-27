import router from 'next/router'

export const HomeBtn: React.FC<HomepageButtonProps> = ({
  desc,
  link,
  Icon,
}) => {
  return (
    <button
      onClick={() => router.push(link)}
      className='rounded-[36px] bg-gradient-to-tr from-secondary to-[#FFDC54] p-2 w-[300px] px-[50px] font-semibold mt-4 btnEffect flex-between'
    >
      <p className='mr-4'>{desc}</p> <Icon className='text-xl' />
    </button>
  )
}
