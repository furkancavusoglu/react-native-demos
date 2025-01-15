export function getColorClass(color: string) {
  switch (color) {
    case '#f5428d':
      return 'bg-pink-500';
    case '#f54242':
      return 'bg-red-500';
    case '#f5a442':
      return 'bg-orange-500';
    case '#f5d142':
      return 'bg-yellow-500';
    case '#368dff':
      return 'bg-blue-500';
    case '#41d95d':
      return 'bg-green-500';
    case '#9eecff':
      return 'bg-cyan-300';
    case '#b9ffb0':
      return 'bg-lime-300';
    case '#ffc7ff':
      return 'bg-pink-200';
    case '#47fced':
      return 'bg-teal-300';
    default:
      return 'bg-gray-500';
  }
}
