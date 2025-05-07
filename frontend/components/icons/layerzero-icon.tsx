export function LayerZeroIcon({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="50" fill="black" />
      <path
        d="M50 15C36.2 15 25 26.2 25 40V60C25 73.8 36.2 85 50 85C63.8 85 75 73.8 75 60V40C75 26.2 63.8 15 50 15ZM65 60C65 68.3 58.3 75 50 75V65C52.8 65 55 62.8 55 60V55H65V60ZM65 45H55V40C55 37.2 52.8 35 50 35V25C58.3 25 65 31.7 65 40V45ZM35 40C35 31.7 41.7 25 50 25V35C47.2 35 45 37.2 45 40V45H35V40ZM35 55H45V60C45 62.8 47.2 65 50 65V75C41.7 75 35 68.3 35 60V55Z"
        fill="white"
      />
    </svg>
  )
}
