export const TaskBtn = ({
  style,
  desc,
  Icon,
  iconSize,
  handleClick,
}: WcButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={`${style} rounded-lg w-full
        bg-secondary py-2 px-4 font-semibold btnEffect flex-between`}
    >
      <p className='mr-4'>{desc}</p> <Icon className={`${iconSize}`} />
    </button>
  )
}
